import { test, expect } from '@playwright/test';
import { routes } from './helpers/routes';

test('privacidad: enlace distinguible sin color, foco y llegada desde el footer', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('footer').getByRole('link', { name: 'Política de privacidad', exact: true }).click();
  await expect(page).toHaveURL(/\/politica-de-privacidad\/$/);
  const contact = page.locator('.legal-page').getByRole('link', { name: 'canales oficiales', exact: true });
  await expect(contact).toHaveCSS('text-decoration-line', 'underline');
  await contact.focus();
  // :focus-visible depende de la modalidad; recorrer con teclado, no solo focus() tras un clic.
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(contact).toBeFocused();
  expect(await contact.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/links\/$/);
});

test('ocho rutas: identidad local, tarjetas sociales, recursos e indexación bloqueada', async ({ page, request }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const title = await page.title();
    expect(title).toContain('Comunidad Cristiana Villa Sarmiento, Córdoba');
    titles.add(title);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    descriptions.add(description!);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description!);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    const image = await page.locator('meta[property="og:image"]').getAttribute('content');
    const url = new URL(image!);
    expect(url.protocol).toBe('https:');
    // Validar el archivo del build local, sin confundirlo con una publicación remota.
    const response = await request.get(url.pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    for (const icon of await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').all()) {
      expect((await request.get((await icon.getAttribute('href'))!)).status()).toBe(200);
    }
  }
  expect(titles.size).toBe(routes.length);
  expect(descriptions.size).toBe(routes.length);
  expect(await (await request.get('/robots.txt')).text()).toMatch(/Disallow: \//);
});

test('redes: cuenta juvenil explícita y destinos originales en menú, footer y Links', async ({ page }) => {
  const instagram = 'https://www.instagram.com/jovenesccvs/';
  await page.goto('/');
  await expect(page.locator('footer').getByRole('link', { name: 'Instagram — Jóvenes CCVS', exact: true })).toHaveAttribute('href', instagram);
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Instagram — Jóvenes CCVS', exact: true })).toHaveAttribute('href', instagram);
  await page.goto('/links/');
  await expect(page.getByRole('link', { name: /Instagram — Jóvenes CCVS/ })).toHaveAttribute('href', instagram);
  await expect(page.getByRole('link', { name: /Facebook — Comunidad Cristiana/ })).toHaveAttribute('href', 'https://www.facebook.com/comunidadcristiana.villasarmiento/');
  await expect(page.getByRole('link', { name: /YouTube — Comunidad Cristiana/ })).toHaveAttribute('href', 'https://www.youtube.com/@comunidadcristianavillasar9819/videos');
});

test('reuniones: los tres ministerios dependen del encabezado de reuniones semanales', async ({ page }) => {
  await page.goto('/ministerios/');
  const weekly = page.locator('.ministries-showcase');
  await expect(weekly.getByRole('heading', { level: 2 })).toHaveText('Reuniones semanales');
  await expect(weekly.getByRole('heading', { level: 3 })).toHaveText(['Escuela Bíblica Infantil', 'Jóvenes y Adolescentes', 'Oración y Palabra']);
});
