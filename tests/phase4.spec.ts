import { test, expect } from '@playwright/test';

test('ClientRouter: forward, back, forward y scripts sin duplicados', async ({ page }) => {
  const failures:string[]=[];
  page.on('pageerror', error=>failures.push(error.message));
  await page.goto('/');
  await page.evaluate(()=> {
    (window as Window & { phase4Marker?:boolean }).phase4Marker=true;
    document.addEventListener('astro:before-preparation', event=> {
      const direction=(event as Event & { direction:string }).direction;
      sessionStorage.setItem('phase4-direction',direction);
    });
  });
  await page.locator('.hero-copy a').click();
  await expect(page).toHaveURL(/nosotros\/$/);
  expect(await page.evaluate(()=>(window as Window & {phase4Marker?:boolean}).phase4Marker)).toBe(true);
  expect(await page.evaluate(()=>sessionStorage.getItem('phase4-direction'))).toBe('forward');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(()=>sessionStorage.getItem('phase4-direction'))).toBe('back');
  await page.goForward();
  await expect(page).toHaveURL(/nosotros\/$/);
  expect(await page.evaluate(()=>sessionStorage.getItem('phase4-direction'))).toBe('forward');
  for(let index=0;index<3;index++) {
    await page.getByRole('button',{name:'Abrir menú'}).click();
    await page.getByRole('dialog').getByRole('link',{name:'Inicio',exact:true}).click();
    await expect(page.locator('body')).not.toHaveCSS('position','fixed');
    await page.locator('.hero-copy a').click();
    const belief=page.locator('.belief-trigger').first();
    await belief.click();
    await expect(belief).toHaveAttribute('aria-expanded','true');
    await belief.click();
    await expect(belief).toHaveAttribute('aria-expanded','false');
  }
  await page.locator('.site-footer').getByRole('link',{name:'Términos y condiciones · borrador'}).click();
  await expect(page).toHaveURL(/terminos-y-condiciones\/$/);
  await expect(page.locator('.legal-notice')).toContainText('Borrador');
  await page.locator('.legal-page').getByRole('link',{name:'Canales de la comunidad'}).click();
  await expect(page).toHaveURL(/links\/$/);
  await page.getByRole('link',{name:'Conocé nuestra historia',exact:true}).click();
  await expect(page).toHaveURL(/nosotros\/#historia$/);
  expect(failures).toEqual([]);
});

test('Inicio: orden mobile, horarios y redes oficiales', async ({ page })=> {
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 const selectors=['.home-welcome','.home-principal','.home-banner','.home-schedule'];
 const boxes=[];
 for(const selector of selectors)boxes.push(await page.locator(selector).boundingBox());
 for(let i=1;i<boxes.length;i++)expect(boxes[i]!.y).toBeGreaterThan(boxes[i-1]!.y);
 const photo=await page.locator('.welcome-collage').boundingBox();
 const copy=await page.locator('.welcome-copy').boundingBox();
 expect(photo!.y+photo!.height).toBeLessThan(copy!.y);
 const principal=await page.locator('.principal-copy').boundingBox();
 const gathering=await page.locator('.principal-photo').boundingBox();
 expect(principal!.y+principal!.height).toBeLessThan(gathering!.y);
 await expect(page.locator('.home-schedule .schedule li')).toHaveCount(4);
 await expect(page.locator('.footer-wordmark')).toHaveText('CCVS');
 await page.goto('/links/');
 await expect(page.locator('a[href="https://www.instagram.com/jovenesccvs/"]')).toContainText('Jóvenes CCVS');
 await expect(page.locator('a[href^="https://www.facebook.com/"]')).toHaveAttribute('rel','noopener noreferrer');
 await expect(page.locator('a[href^="https://www.youtube.com/"]')).toHaveAttribute('target','_blank');
 await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
});

test('sin View Transition API: navegación completa y menú funcional',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(document,'startViewTransition',{value:undefined,configurable:true}));
 await page.goto('/');
 await page.locator('.hero-copy a').click();
 await expect(page).toHaveURL(/nosotros\/$/);
 await page.getByRole('button',{name:'Abrir menú'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('motion: reveal una vez, contenido visible y reduced motion',async({page})=>{
 await page.goto('/');
 await page.locator('.home-welcome').scrollIntoViewIfNeeded();
 await expect(page.locator('.home-welcome')).toHaveAttribute('data-revealed','true');
 await page.waitForTimeout(1300);
 await page.evaluate(()=>scrollTo(0,0));
 await page.locator('.home-welcome').scrollIntoViewIfNeeded();
 expect(await page.locator('.home-welcome').evaluate(element=>element.getAnimations({subtree:true}).filter(animation=>animation.playState==='running').length)).toBe(0);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.locator('.home-welcome').scrollIntoViewIfNeeded();
 expect(await page.locator('.home-welcome').evaluate(element=>element.getAnimations({subtree:true}).filter(animation=>animation.playState==='running').length)).toBe(0);
 await expect(page.locator('.welcome-copy h2')).toBeVisible();
});

test('CCVS gigante se muestra completo en mobile',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [360,375,390,430]) {
  await page.setViewportSize({width,height:844});
  await page.goto('/'); await page.evaluate(()=>document.fonts.ready);
  expect(await page.locator('.footer-wordmark').evaluate(element=>element.scrollWidth<=element.clientWidth)).toBe(true);
 }
});
