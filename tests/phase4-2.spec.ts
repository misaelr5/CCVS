import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [360, 390, 1440]) {
 test(`menú 4.2 · ${width}: iconos al final, animación, teclado y scroll`, async ({page})=> {
  await page.setViewportSize({width,height:width===360?640:844});
  await page.goto('/');
  const trigger=page.locator('.menu-open');
  await trigger.click();
  const dialog=page.getByRole('dialog');
  const close=page.getByRole('button',{name:'Cerrar menú',exact:true});
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded','true');
  await expect(close).toHaveClass(/is-active/);
  expect(await dialog.evaluate(element=>element.getAnimations({subtree:true}).length)).toBeGreaterThan(0);
  // Dejar finalizar panel + stagger antes de medir geometría y contraste.
  await page.waitForTimeout(1050);
  const social=dialog.getByRole('navigation',{name:'Redes sociales del menú'});
  await expect(social.getByRole('link')).toHaveCount(3);
  const primaryLast=await dialog.locator('.menu-groups a').last().boundingBox();
  const socialBounds=await social.boundingBox();
  expect(socialBounds!.y).toBeGreaterThan(primaryLast!.y+primaryLast!.height);
  const iconBoxes=[];
  for (const link of await social.getByRole('link').all()) {
   await expect(link).toHaveAttribute('aria-label',/CCVS|Comunidad Cristiana/);
   await expect(link).toHaveAttribute('rel','noopener noreferrer');
   await expect(link).toHaveAttribute('target','_blank');
   iconBoxes.push(await link.boundingBox());
  }
  expect(iconBoxes[0]!.y).toBe(iconBoxes[1]!.y);
  expect(iconBoxes[1]!.y).toBe(iconBoxes[2]!.y);
  expect(iconBoxes.every(box=>box!.width>=44&&box!.height>=44)).toBe(true);
  await social.getByRole('link').last().scrollIntoViewIfNeeded();
  expect(await dialog.evaluate(element=>element.scrollWidth<=element.clientWidth)).toBe(true);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations.map(item=>item.id)).toEqual([]);
  await close.focus();await page.keyboard.press('Shift+Tab');
  // Chromium permite enfocar el contenedor cuando necesita scroll interno.
  if (await dialog.evaluate(element=>document.activeElement===element)) await page.keyboard.press('Shift+Tab');
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Tab');
  if (await dialog.evaluate(element=>document.activeElement===element)) await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveClass(/is-closing/);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded','false');
  expect(await page.evaluate(()=>document.body.style.position)).toBe('');
  await expect.poll(()=>trigger.locator('.hamburger-lines > span').evaluateAll(elements=>elements.map(element=>getComputedStyle(element).transform))).toEqual(['none','none','none']);
 });
}

test('redes compactas y consistentes en footer; Links mantiene etiquetas',async({page})=>{
 await page.goto('/');
 const menu=page.locator('.menu-social .social-links a');
 const footer=page.locator('.footer-contact .social-links a');
 expect(await menu.evaluateAll(items=>items.map(item=>item.getAttribute('href')))).toEqual(await footer.evaluateAll(items=>items.map(item=>item.getAttribute('href'))));
 await expect(footer).toHaveCount(3);
 await expect(page.locator('.footer-social')).toHaveCount(0);
 await page.goto('/links/');
 await expect(page.getByRole('link',{name:/Instagram — Jóvenes CCVS/})).toBeVisible();
});

for(const route of ['/', '/nosotros/', '/lo-que-creemos/', '/ministerios/', '/visitanos/', '/links/', '/terminos-y-condiciones/']) {
 test(`entrada propia ${route} y reduced motion`,async({page})=>{
  await page.goto(route);
  const heading=page.locator('h1');
  await expect(heading).toHaveAttribute('data-entry-motion','up');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(route);
  await expect(heading).toBeVisible();
  expect(await page.evaluate(()=>document.getAnimations().filter(animation=>animation.playState==='running').length)).toBe(0);
 });
}

test('menú sin animación con reduced motion y cierre al navegar',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 for(let index=0;index<3;index++) {
  await page.getByRole('button',{name:'Abrir menú'}).click();
  expect(await page.getByRole('dialog').evaluate(element=>element.getAnimations({subtree:true}).length)).toBe(0);
  await page.getByRole('dialog').getByRole('link',{name:'Nuestra historia',exact:true}).click();
  await expect(page).toHaveURL(/nosotros\/$/);
  expect(await page.evaluate(()=>document.body.style.position)).toBe('');
  await page.getByRole('button',{name:'Abrir menú'}).click();
  await page.getByRole('dialog').getByRole('link',{name:'Inicio',exact:true}).click();
  await expect(page).toHaveURL(/\/$/);
 }
});
