import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
 test(`portada ${width}: reproducción silenciosa, sonido y pausa por teclado`, async ({ page }) => {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
  await page.goto('/');
  const video = page.locator('[data-hero-video] video');
  await expect.poll(() => video.evaluate(element => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  expect(await video.evaluate(element => (element as HTMLVideoElement).muted)).toBe(true);
  await expect(video).toHaveAttribute('src', width === 390 ? '/media/portada-ccvs-mobile.mp4' : '/media/portada-ccvs.mp4');
  const sound = page.locator('[data-video-sound]');
  await sound.focus(); await page.keyboard.press('Enter');
  await expect(sound).toHaveText('Silenciar');
  expect(await video.evaluate(element => (element as HTMLVideoElement).muted)).toBe(false);
  await page.keyboard.press('Space');
  await expect(sound).toHaveText('Activar sonido');
  await page.getByRole('button', { name: 'Pausar video', exact: true }).click();
  expect(await video.evaluate(element => (element as HTMLVideoElement).paused)).toBe(true);
  await page.getByRole('button', { name: 'Reproducir video', exact: true }).click();
  await expect.poll(() => video.evaluate(element => (element as HTMLVideoElement).paused)).toBe(false);
  await page.locator('[data-video-sound]').click();
  await page.locator('.home-schedule').scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate(element => [(element as HTMLVideoElement).paused, (element as HTMLVideoElement).muted])).toEqual([true, true]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
 });
}

test('movimiento reducido: poster sin descargar video y reproducción manual', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'reduce' });
 await page.goto('/');
 const video = page.locator('[data-hero-video] video');
 await expect(video).not.toHaveAttribute('src');
 await expect(page.locator('.hero-video-poster')).toBeVisible();
 await page.getByRole('button', { name: 'Reproducir video', exact: true }).click();
 await expect.poll(() => video.evaluate(element => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
 expect(await video.evaluate(element => (element as HTMLVideoElement).muted)).toBe(true);
});

test('navegación: detiene el video anterior y vuelve a Inicio sin sonido', async ({ page }) => {
 await page.goto('/');
 await page.getByRole('button', { name: 'Activar sonido', exact: true }).click();
 await page.evaluate(() => { (window as Window & { oldVideo?: HTMLVideoElement }).oldVideo = document.querySelector('video')!; });
 await page.getByRole('link', { name: 'Conocé nuestra fe', exact: true }).click();
 await expect(page).toHaveURL(/lo-que-creemos\/$/);
 expect(await page.evaluate(() => {
  const oldVideo = (window as Window & { oldVideo?: HTMLVideoElement }).oldVideo;
  return oldVideo ? oldVideo.paused && oldVideo.muted && !oldVideo.hasAttribute('src') : true;
 })).toBe(true);
 await page.goBack();
 await expect(page.locator('[data-video-sound]')).toHaveText('Activar sonido');
 expect(await page.locator('video').evaluate(element => (element as HTMLVideoElement).muted)).toBe(true);
 await page.goForward();
 await expect(page).toHaveURL(/lo-que-creemos\/$/);
 await expect(page.locator('video')).toHaveCount(0);
 await page.goBack();
 await expect(page.locator('video')).toHaveCount(1);
 await expect(page.locator('[data-video-sound]')).toHaveText('Activar sonido');
});

test('archivo no disponible: conserva poster y contenido', async ({ page }) => {
 await page.route('**/media/*.mp4', route => route.abort());
 await page.goto('/');
 await expect(page.locator('[data-video-status]')).toContainText('El video no está disponible');
 await expect(page.locator('[data-video-controls]')).toBeHidden();
 await expect(page.locator('[data-hero-video]')).not.toHaveClass(/is-ready/);
 await expect(page.locator('.hero-video-poster')).toBeVisible();
 await expect(page.locator('.hero-copy h1')).toBeVisible();
});

test('sin JavaScript: poster y contenido de la portada disponibles', async ({ browser }) => {
 const context = await browser.newContext({ javaScriptEnabled: false });
 const page = await context.newPage();
 await page.goto('/');
 await expect(page.locator('.hero-video-poster')).toBeVisible();
 await expect(page.locator('[data-video-controls]')).toBeHidden();
 await expect(page.getByRole('link', { name: 'Conocé nuestra fe', exact: true })).toBeVisible();
 await context.close();
});
