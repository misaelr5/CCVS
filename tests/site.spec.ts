import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/nosotros/', '/ministerios/', '/visitanos/', '/links/', '/terminos-y-condiciones/'];
for (const width of [360, 375, 390, 430, 768, 1024, 1440]) {
  for (const route of routes) {
    test(`${route} · ${width}px: carga, layout y recursos`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
      // Auditar el estado legible final, no el fotograma semitransparente de una entrada.
      // El movimiento se prueba por separado en phase4.spec.ts.
      await page.emulateMedia({ reducedMotion:'reduce' });
      const failures: string[] = [];
      page.on('pageerror', error => failures.push(error.message));
      expect((await page.goto(route))?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const outside = await page.locator('main h1, main h2, main h3, main p, main a').evaluateAll(elements => elements.filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1);
      }).map(element => element.textContent));
      expect(outside).toEqual([]);
      const images = await page.locator('img').evaluateAll(elements => elements.filter(image =>
        !image.hasAttribute('alt') ||
        (!image.getAttribute('alt')?.trim() && image.getAttribute('aria-hidden') !== 'true') ||
        !image.getAttribute('width') || !image.getAttribute('height')
      ).length);
      expect(images).toBe(0);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
      if (width === 390 || width === 1440) {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(result.violations.map(item => ({ id:item.id, elements:item.nodes.map(node => node.target) }))).toEqual([]);
      }
      expect(failures).toEqual([]);
    });
  }
}

for (const width of [390, 1440]) {
 test(`menú tarjeta · ${width}px: página estable, Escape y anclas`, async ({ page }) => {
  await page.setViewportSize({ width, height:844 });
  await page.goto('/');
  const trigger = page.locator('.menu-open');
  const heroBefore = await page.locator('.editorial-hero').boundingBox();
  await trigger.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', { name:'Cerrar menú', exact:true })).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded','true');
  expect(await page.evaluate(()=>document.body.style.position)).toBe('');
  expect(await page.evaluate(()=>document.querySelector('dialog')!.matches(':modal'))).toBe(false);
  expect(await page.locator('.editorial-hero').boundingBox()).toEqual(heroBefore);
  await page.keyboard.press('Shift+Tab'); await expect(trigger).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible(); await expect(trigger).toBeFocused();
  await page.evaluate(()=>scrollTo(0,600));
  await trigger.evaluate(element=>(element as HTMLButtonElement).click());
  await page.getByRole('button',{name:'Cerrar menú',exact:true}).evaluate(element=>(element as HTMLButtonElement).click());
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(await page.evaluate(()=>scrollY)).toBe(600);
  await page.evaluate(()=>scrollTo(0,0));await trigger.click();
  await page.getByRole('dialog').getByRole('link',{name:'Qué creemos',exact:true}).click();
  await expect(page).toHaveURL(/nosotros\/#creencias$/);
  await expect(page.getByRole('dialog')).not.toBeVisible();
 });
}

test('acordeón: teclado y estados ARIA', async ({ page }) => {
  await page.goto('/nosotros/#creencias');
  const first = page.locator('.belief-trigger').first();
  const panel = page.locator('#belief-panel-0');
  await expect(panel).toBeHidden();
  await first.focus(); await page.keyboard.press('Enter');
  await expect(panel).toBeVisible();
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Space');
  await expect(panel).toBeHidden();
});

test('sin JS: navegación y doctrina disponibles', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled:false, viewport:{width:390,height:844} });
  const page = await context.newPage();
  await page.goto('/nosotros/');
  await expect(page.getByRole('navigation', {name:'Navegación sin JavaScript'})).toBeVisible();
  await expect(page.locator('.belief-panel')).toHaveCount(5);
  for (const panel of await page.locator('.belief-panel').all()) await expect(panel).toBeVisible();
  await context.close();
});

test('reducción de movimiento y orden mobile de Nosotros', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.setViewportSize({width:390,height:844});
  await page.goto('/nosotros/');
  const photo = await page.locator('.about-media').boundingBox();
  const title = await page.locator('h1').boundingBox();
  expect(photo!.y + photo!.height).toBeLessThan(title!.y);
  expect(await page.locator('.pill').count()).toBe(0);
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior)).toBe('auto');
});
