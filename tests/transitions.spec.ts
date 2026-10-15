import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
 test(`transición lateral ${width}: continuidad, header estable e historial`, async ({ page }) => {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  // Freeze the real browser transition at known frames, rather than asserting
  // source declarations that could still render as a blank flash.
  await page.addInitScript(() => {
   const start = document.startViewTransition.bind(document);
   document.startViewTransition = callback => {
    const transition = start(callback);
    void transition.ready.then(() => {
     document.getAnimations().filter(animation =>
      animation instanceof CSSAnimation && animation.animationName.startsWith('page-slide-')
     ).forEach(animation => animation.pause());
    }).catch(() => {});
    return transition;
   };
  });
  await page.goto('/nosotros/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1100);
  const header = await page.locator('.site-header').boundingBox();
  await page.locator('.header-visit').evaluate(element => (element as HTMLAnchorElement).click());
  await expect(page).toHaveURL(/visitanos\/$/);

  const inspect = async (back = false) => {
   await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation =>
    animation instanceof CSSAnimation && animation.animationName.startsWith('page-slide-') && animation.playState === 'paused'
   ).length)).toBe(2);
   for (const progress of [0, .25, .5, .75, .99]) {
    const frame = await page.evaluate(progress => {
     document.getAnimations().filter(animation => animation instanceof CSSAnimation && animation.animationName.startsWith('page-slide-'))
      .forEach(animation => { animation.currentTime = 380 * progress; });
     const style = (name: string) => getComputedStyle(document.documentElement, `::view-transition-${name}`);
     const old = style('old(root)'), next = style('new(root)');
     return {
      oldX: new DOMMatrixReadOnly(old.transform).m41,
      newX: new DOMMatrixReadOnly(next.transform).m41,
      oldOpacity: old.opacity, newOpacity: next.opacity,
      oldClip: old.clipPath, newClip: next.clipPath,
      width: parseFloat(style('group(root)').width),
      headerAnimation: style('group(institution-header)').animationName,
      background: getComputedStyle(document.documentElement, '::view-transition').backgroundColor,
     };
    }, progress);
    expect(frame.oldOpacity).toBe('1'); expect(frame.newOpacity).toBe('1');
    expect(frame.oldClip).toBe('none'); expect(frame.newClip).toBe('none');
    expect(frame.background).toBe('rgb(247, 246, 243)');
    expect(frame.headerAnimation).toBe('none');
    expect(Math.abs(Math.abs(frame.oldX - frame.newX) - frame.width)).toBeLessThan(1);
    if (progress === .5) {
     expect(back ? frame.newX > 0 : frame.newX < 0).toBe(true);
     await page.screenshot({ path:`qa-artifacts/transicion-lateral/${back ? 'back' : 'forward'}-${width}-mitad.png` });
    }
   }
   await expect(page.locator('h1')).toHaveAttribute('data-entry-motion', 'settled');
   expect(await page.locator('h1').evaluate(element => element.getAnimations().length)).toBe(0);
   await page.evaluate(() => document.getAnimations().filter(animation => animation instanceof CSSAnimation && animation.animationName.startsWith('page-slide-')).forEach(animation => animation.finish()));
   await expect(page.locator('.site-header')).toHaveCount(1);
   expect(await page.locator('.site-header').boundingBox()).toEqual(header);
   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  };
  await inspect();
  await page.goBack(); await expect(page).toHaveURL(/nosotros\/$/); await inspect(true);
  await page.goForward(); await expect(page).toHaveURL(/visitanos\/$/); await inspect();
  expect(errors).toEqual([]);
 });
}
