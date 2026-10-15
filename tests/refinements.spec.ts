import { test, expect } from '@playwright/test';

const routes = ['/', '/nosotros/', '/ministerios/', '/visitanos/', '/links/', '/terminos-y-condiciones/'];

test('tarjeta: sin fades, scroll usable, cierre exterior y sin trampa de foco', async ({ page }) => {
 await page.goto('/');
 const trigger = page.locator('.menu-open');
 const dialog = page.getByRole('dialog');
 await trigger.click();
 const keyframes = await dialog.evaluate(element => element.getAnimations({ subtree:true }).flatMap(animation => (animation.effect as KeyframeEffect).getKeyframes()));
 expect(keyframes.length).toBeGreaterThan(0);
 expect(keyframes.some(frame => 'opacity' in frame)).toBe(false);
 const bounds = await dialog.boundingBox();
 expect(bounds!.width).toBeLessThan(1000);
 expect(bounds!.y).toBeGreaterThan(70);
 await page.mouse.wheel(0,180);
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(0);
 await page.keyboard.press('Escape');
 await expect(dialog).not.toBeVisible();
 expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(0);
 await page.evaluate(()=>scrollTo(0,0));
 await trigger.click();
 await dialog.locator('.social-links a').last().focus();await page.keyboard.press('Tab');
 expect(await page.evaluate(() => document.activeElement !== document.body && !document.activeElement?.closest('#navigation-dialog'))).toBe(true);
 await expect(dialog).not.toBeVisible();
 await trigger.click();
 await page.locator('.hero-copy h1').click({position:{x:12,y:12}});
 await expect(dialog).not.toBeVisible();
 await trigger.click(); await trigger.click(); await trigger.click();
 await expect(dialog).toBeVisible();await expect(trigger).toHaveAttribute('aria-expanded','true');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
});

test('navegación y retroceso empiezan arriba sin sumar una segunda entrada al título', async ({ page }) => {
 await page.goto('/');
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 for (const route of routes.slice(1)) {
  await page.evaluate(route=> {
   scrollTo(0,document.documentElement.scrollHeight);
   const link=document.createElement('a');link.href=route;document.body.append(link);link.click();
  },route);
  await expect(page).toHaveURL(new RegExp(`${route}$`));
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
  await expect(page.locator('h1')).toHaveAttribute('data-entry-motion','settled');
  expect(await page.locator('h1').evaluate(element=>element.getAnimations().length)).toBe(0);
 }
 for (let index=0;index<routes.length-1;index++) {
  await page.evaluate(()=>scrollTo(0,400));await page.goBack();
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
 }
 await page.goForward();await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
 expect(errors).toEqual([]);
});

for (const route of routes) {
 test(`objetos al scroll ${route}: responden y respetan reduced motion`, async ({ page }) => {
  await page.goto(route);
  const object = page.locator('[data-scroll-object]').first();
  await expect(object).toBeVisible();
  await expect.poll(()=>object.evaluate(element=>element.style.transform)).not.toBe('');
  const before = await object.evaluate(element=>element.style.transform);
  await page.evaluate(()=>scrollTo(0,160));
  await expect.poll(()=>object.evaluate(element=>element.style.transform)).not.toBe(before);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect.poll(()=>object.evaluate(element=>element.style.transform)).toBe('');
  await expect.poll(()=>page.evaluate(()=>document.getAnimations().filter(animation=>animation.playState==='running').length)).toBe(0);
 });
}

test('footer: CCVS de fondo, contenido encima y altura compacta', async ({ page }) => {
 await page.emulateMedia({reducedMotion:'reduce'});
 for (const width of [360,390,768,1440]) {
  await page.setViewportSize({width,height:844});await page.goto('/');
  const footer=page.locator('.site-footer');const watermark=footer.locator('.footer-wordmark');
  await expect(watermark).toHaveAttribute('aria-hidden','true');
  await expect(watermark).toHaveCSS('position','absolute');
  await expect(watermark).toHaveCSS('pointer-events','none');
  expect((await footer.boundingBox())!.height).toBeLessThan(width>1100?500:850);
  await expect(footer.getByRole('link',{name:'Vení a una reunión'})).toHaveAttribute('href','/visitanos/');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});
