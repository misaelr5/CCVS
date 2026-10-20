import { test, expect } from '@playwright/test';

test('mapa integrado: carga al acercarse, conserva enlace directo y fallback sin JS', async ({ page, browser }) => {
 await page.setViewportSize({ width:390, height:844 });
 const maps: string[] = [];
 await page.route('https://www.google.com/maps?*', route => {
  maps.push(route.request().url());
  return route.fulfill({ contentType:'text/html', body:'<!doctype html><html lang="es"><title>Mapa de prueba</title><p>Mapa cargado</p></html>' });
 });
 await page.goto('/visitanos/');
 await expect(page.locator('html')).toHaveAttribute('data-ui-ready', 'true');
 expect(maps).toEqual([]);
 const frame = page.locator('iframe[data-map-src]');
 await expect(frame).not.toHaveAttribute('src');
 await page.locator('.visit-map').scrollIntoViewIfNeeded();
 await expect(frame).toHaveAttribute('src', 'https://www.google.com/maps?q=-31.9309445%2C-65.1925254&z=17&output=embed');
 await expect(page.frameLocator('iframe[data-map-src]').getByText('Mapa cargado')).toBeVisible();
 expect(maps).toHaveLength(1);
 await expect(page.getByRole('link', { name:/Abrir en Google Maps/ })).toHaveAttribute('href', 'https://maps.app.goo.gl/YemN5zzZ2aumfGYy8');
 const context = await browser.newContext({ javaScriptEnabled:false });
 const fallback = await context.newPage();
 await fallback.goto('/visitanos/');
 await expect(fallback.locator('iframe[data-map-src]')).toBeHidden();
 await expect(fallback.locator('noscript iframe')).toBeVisible();
 await expect(fallback.locator('noscript iframe')).toHaveAttribute('src', 'https://www.google.com/maps?q=-31.9309445%2C-65.1925254&z=17&output=embed');
 await context.close();
});

test('primera visita: CTA visible, horarios y destinos oficiales', async ({ page }) => {
 await page.setViewportSize({ width:390, height:844 });
 await page.emulateMedia({ reducedMotion:'reduce' });
 await page.goto('/');
 const visit = page.getByRole('link', { name:'Planificá tu visita', exact:true });
 await expect(visit).toBeInViewport();
 await visit.focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/\/visitanos\/$/);
 await page.goBack();
 const quick = page.getByRole('navigation', { name:'Información para tu visita' });
 await expect(quick.getByRole('link', { name:/Reunión general/ })).toContainText('Domingo · 20:30 hs');
 await expect(quick.getByRole('link', { name:/Cómo llegar/ })).toHaveAttribute('href', 'https://maps.app.goo.gl/YemN5zzZ2aumfGYy8');
 await expect(quick.getByRole('link', { name:/Videos en YouTube/ })).toHaveAttribute('href', 'https://www.youtube.com/@comunidadcristianavillasar9819/videos');
 await quick.getByRole('link', { name:/Todos los horarios/ }).click();
 await expect(page).toHaveURL(/\/visitanos\/#horarios$/);
 await expect(page.locator('#horarios')).toBeInViewport();
});

for (const connection of [{ saveData:true, effectiveType:'4g' }, { saveData:false, effectiveType:'2g' }]) {
 test(`video: respeta la conexión ${JSON.stringify(connection)} y permite reproducción manual`, async ({ page }) => {
  await page.addInitScript(value => Object.defineProperty(navigator, 'connection', { value, configurable:true }), connection);
  const media: string[] = [];
  page.on('request', request => { if (request.url().endsWith('.mp4')) media.push(request.url()); });
  await page.goto('/');
  await page.locator('.hero-video-poster').evaluate(async (element: HTMLImageElement) => {
   await element.decode(); await document.fonts.ready;
   await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  });
  await page.locator('.home-schedule').scrollIntoViewIfNeeded();
  await page.locator('.editorial-hero').scrollIntoViewIfNeeded();
  expect(media).toEqual([]);
  await expect(page.getByRole('button', { name:'Reproducir video', exact:true })).toBeVisible();
  await page.getByRole('button', { name:'Reproducir video', exact:true }).click();
  await expect.poll(() => page.locator('video').evaluate(video => (video as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  expect(media.length).toBeGreaterThan(0);
 });
}

test('video automático espera la imagen inicial antes de descargar', async ({ page }) => {
 let release!: () => void;
 const posterGate = new Promise<void>(resolve => { release = resolve; });
 let posterRequested = false;
 const media: string[] = [];
 await page.route('**/_astro/portada-video*.webp', async route => {
  posterRequested = true;
  await posterGate;
  await route.continue();
 });
 page.on('request', request => { if (request.url().endsWith('.mp4')) media.push(request.url()); });
 try {
  await page.goto('/', { waitUntil:'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-ui-ready', 'true');
  await expect.poll(() => posterRequested).toBe(true);
  expect(media).toEqual([]);
 } finally { release(); }
 await expect.poll(() => page.locator('video').evaluate(video => (video as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
});

test('historia mantiene la cronología con el año confirmado y schema local real', async ({ page }) => {
 await page.goto('/nosotros/');
 const chapter = page.locator('.history-chapter').filter({ hasText:'Un terreno para la comunidad.' });
 await expect(chapter).toContainText('2007');
 await expect(chapter).not.toContainText('Sin fecha confirmada');
 const schema = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
 expect(schema['@type']).toBe('Church');
 expect(schema.hasMap).toBe('https://maps.app.goo.gl/YemN5zzZ2aumfGYy8');
 expect(schema.sameAs).toEqual(['https://www.facebook.com/comunidadcristiana.villasarmiento/', 'https://www.youtube.com/@comunidadcristianavillasar9819/videos']);
 expect(schema).not.toHaveProperty('openingHours');
});
