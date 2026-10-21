import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const mobile of [false, true]) {
  test(`tarjetas: entrada individual e interacción ${mobile ? 'táctil' : 'mouse/teclado'}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: mobile ? 390 : 1440, height: 900 }, hasTouch: mobile, isMobile: mobile });
    const page = await context.newPage();
    await page.goto('/');
    const cards = page.locator('.next-step');
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveAttribute('data-entry-motion', 'up');
      await expect.poll(() => card.evaluate(element => element.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
    }
    const first = cards.first();
    await first.scrollIntoViewIfNeeded();
    // Reentering the viewport must not restart the reveal.
    expect(await first.evaluate(element => element.getAnimations().length)).toBe(0);
    if (mobile) {
      const session = await context.newCDPSession(page);
      const box = await first.boundingBox();
      await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box!.x + 30, y: box!.y + 40 }] });
      await expect.poll(() => first.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
      await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await expect.poll(() => first.evaluate(element => getComputedStyle(element).transform)).toBe('none');
      await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box!.x + 30, y: box!.y + 40 }] });
      await expect(first).toHaveAttribute('data-pressed', 'true');
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: box!.x + 30, y: box!.y + 15 }] });
      await expect(first).not.toHaveAttribute('data-pressed', 'true');
      await session.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
      expect(await page.evaluate(() => matchMedia('(hover: none)').matches)).toBe(true);
      await first.getByRole('link').tap();
    } else {
      await first.hover();
      await expect.poll(() => first.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
      await expect.poll(() => first.locator('img').evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
      await page.mouse.move(0, 0);
      await first.getByRole('link').focus();
      await expect.poll(() => first.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
      await page.keyboard.press('Enter');
    }
    await expect(page).toHaveURL(/\/visitanos\/$/);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await cards.first().scrollIntoViewIfNeeded();
    await cards.first().getByRole('link').focus();
    expect(await cards.first().evaluate(element => ({ transform: getComputedStyle(element).transform, animations: element.getAnimations({ subtree: true }).length }))).toEqual({ transform: 'none', animations: 0 });
    expect(await cards.first().locator('img').evaluate(element => getComputedStyle(element).transform)).toBe('none');
    await context.close();
  });
}

for (const width of [320, 360, 375, 390, 430, 768, 1024, 1440]) {
  test(`próximos pasos: lectura, imágenes y layout a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/');
    const section = page.getByRole('region', { name: 'Tu próximo paso en comunidad.' });
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole('heading', { level: 3 })).toHaveText(['Conectate', 'Participá', 'Crecé en la fe']);
    await expect(section.getByRole('listitem')).toHaveCount(3);
    expect(await section.evaluate(element =>
      element.previousElementSibling?.classList.contains('home-welcome') &&
      element.nextElementSibling?.classList.contains('home-principal'))).toBe(true);
    for (const img of await section.locator('img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await expect(img).toHaveAttribute('loading', 'lazy');
      await expect(img).toHaveAttribute('srcset', /480w/);
    }
    for (const link of await section.getByRole('link').all()) {
      const box = await link.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    // At 320px the existing principal section overflows independently of this module.
    expect(await section.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    if (width >= 360) expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const positions = await section.getByRole('link').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().bottom));
    if (width > 700) expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(2);
    if ([390, 768, 1440].includes(width)) {
      await section.screenshot({ path: `qa-artifacts/next-steps/module-${width}.png`, style: '.skip-link { visibility:hidden; }' });
    }
    if ([390, 1440].includes(width)) {
      const audit = await new AxeBuilder({ page }).include('.next-steps').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(audit.violations).toEqual([]);
      await section.evaluate(element => element.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: `qa-artifacts/next-steps/viewport-${width}.png` });
    }
    expect(errors).toEqual([]);
  });
}

test('próximos pasos: teclado, destinos y navegación atrás/adelante', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('.next-steps');
  const links = section.getByRole('link');
  await links.first().focus();
  for (let index = 0; index < 3; index++) {
    await expect(links.nth(index)).toBeFocused();
    expect(await links.nth(index).evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid');
    if (index < 2) await page.keyboard.press('Tab');
  }
  for (const [index, path] of ['/visitanos/', '/ministerios/', '/lo-que-creemos/'].entries()) {
    await links.nth(index).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator('h1')).toBeVisible();
    await page.goBack();
    await expect(section).toBeVisible();
    await page.goForward();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await page.goBack();
  }
});

test('próximos pasos: contenido y enlaces sin JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  const section = page.locator('.next-steps');
  await expect(section).toBeVisible();
  await expect(section.getByRole('link')).toHaveCount(3);
  await section.getByRole('link', { name: 'Planificá tu visita' }).click();
  await expect(page).toHaveURL(/\/visitanos\/$/);
  await context.close();
});

test('próximos pasos: texto ampliado al 200% sin recortes', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.next-steps').evaluate(section => {
    const elements = [...section.querySelectorAll<HTMLElement>('h2,h3,p,a,.next-step-number')];
    const sizes = elements.map(element => parseFloat(getComputedStyle(element).fontSize));
    elements.forEach((element, index) => { element.style.fontSize = `${sizes[index] * 2}px`; });
  });
  for (const element of await page.locator('.next-step-copy').all()) {
    expect(await element.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(768);
});
