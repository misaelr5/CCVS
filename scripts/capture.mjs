import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const phase = process.argv[2] ?? 'final';
const complete = phase === 'final' || phase === 'fase4' || phase === 'fase1-seo';
const directory = `qa-artifacts/${phase}`;
const baseURL = process.env.CCVS_BASE_URL ?? 'http://127.0.0.1:4321';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const measurements = [];
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    const routes = complete ? [['inicio', '/'], ['nosotros', '/nosotros/'], ['creencias', '/lo-que-creemos/'], ['ministerios', '/ministerios/'], ['visitanos', '/visitanos/'], ['links', '/links/'], ['terminos','/terminos-y-condiciones/'], ['privacidad','/politica-de-privacidad/']] : [['inicio', '/'], ['nosotros', '/nosotros/']];
    for (const [name, route] of routes) {
      const response = await page.goto(`${baseURL}${route}`);
      if (response?.status() !== 200) throw new Error(`${route}: ${response?.status()}`);
      await page.evaluate(() => document.fonts.ready);
      // Una captura completa no dispara por sí sola la carga lazy bajo el viewport.
      // Esperar los recursos en QA; la política lazy del HTML de producción no cambia.
      await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode())));
      await page.screenshot({ path: `${directory}/${name}-${viewport.width}.png` });
      if (complete) await page.screenshot({ path: `${directory}/${name}-${viewport.width}-completa.png`, fullPage: true });
      if (phase === 'fase4' && name === 'inicio') {
        for (const selector of ['.home-welcome','.home-principal','.home-banner','.home-schedule','.site-footer']) await page.locator(selector).screenshot({path:`${directory}/${selector.slice(1)}-${viewport.width}.png`});
        await page.evaluate(()=>window.scrollTo(0,0));
      }
      measurements.push(await page.evaluate(({name, width}) => {
        const heading = document.querySelector('h1');
        const style = getComputedStyle(heading);
        const geometry = selector => { const box = document.querySelector(selector)?.getBoundingClientRect(); return box ? { x:box.x, y:box.y, width:box.width, height:box.height } : null; };
        return { name, width, overflow:document.documentElement.scrollWidth > innerWidth, font:style.fontFamily, fontSize:style.fontSize, lineHeight:style.lineHeight, tracking:style.letterSpacing, hero:geometry('.editorial-hero'), aboutImage:geometry('.about-media'), heading:geometry('h1') };
      }, { name, width: viewport.width }));
    }
    if (complete) {
      await page.goto(`${baseURL}/lo-que-creemos/`);
      await page.locator('.belief-trigger').first().click();
      await page.locator('.beliefs').screenshot({ path: `${directory}/creencias-${viewport.width}.png` });
      await page.goto(`${baseURL}/`);
      await page.getByRole('button', { name:'Abrir menú' }).click();
      await page.screenshot({ path: `${directory}/menu-${viewport.width}.png` });
    }
    await page.close();
  }
  await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2));
  console.log(JSON.stringify(measurements));
} finally { await browser.close(); }
