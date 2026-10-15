import { chromium } from '@playwright/test';
import { mkdir,writeFile } from 'node:fs/promises';
const out='auditoria-fase-5/evidencia';
await mkdir(`${out}/benchmark`,{recursive:true});
const browser=await chromium.launch();
const sites=[['passion','https://passioncitychurch.com/'],['passion-us','https://passioncitychurch.com/us/'],['vous','https://www.vouschurch.com/'],['belonging','https://thebelonging.co/'],['elevation','https://www.elevationchurch.org/'],['ttl','https://tomatulugar.com/'],['rey','https://reydereyes.com.ar/'],['catedral','https://catedraldelafe.org/'],['cita','https://citaconlavida.com.ar/'],['ccf','https://www.iglesiaccf.org/']];
const rows=[];
try {
 for(const [name,url] of sites) {
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  try {
   const r=await page.goto(url,{waitUntil:'domcontentloaded',timeout:25000});
   await page.waitForTimeout(2500);
   await page.screenshot({path:`${out}/benchmark/${name}-1440.png`,timeout:10000});
   const data=await page.evaluate(()=>({url:location.href,title:document.title,robots:document.querySelector('meta[name=robots]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,linkUrls:[...new Set([...document.querySelectorAll('a')].map(a=>a.href))],overflow:document.documentElement.scrollWidth>innerWidth}));
   await page.setViewportSize({width:390,height:844});
   await page.waitForTimeout(700);
   await page.screenshot({path:`${out}/benchmark/${name}-390.png`,timeout:10000});
   const mobile=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,width:document.documentElement.scrollWidth}));
   rows.push({name,input:url,status:r.status(),...data,mobile});
  }catch(e){rows.push({name,input:url,error:e.message})}
  await writeFile(`${out}/externos.json`,JSON.stringify({date:'2026-10-15',rows},null,2));
  await context.close();
 }
 const context=await browser.newContext();const page=await context.newPage();
 const publicRows=[];
 for(const route of ['/','/nosotros/','/ministerios/','/visitanos/','/links/','/terminos-y-condiciones/','/robots.txt','/sitemap.xml','/ruta-inexistente-fase5/','/visitanos']) {
  try {
   const r=await page.goto('https://ccvs-sigma.vercel.app'+route,{waitUntil:'domcontentloaded',timeout:20000});
   publicRows.push({route,status:r.status(),url:page.url(),headers:await r.allHeaders(),...(route.includes('.')?{body:(await r.text()).slice(0,300)}:await page.evaluate(()=>({title:document.title,robots:document.querySelector('meta[name=robots]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href??null,ogImage:document.querySelector('meta[property="og:image"]')?.content??null,video:document.querySelector('video')?.dataset.videoSrc??null,schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent)})))});
  }catch(e){publicRows.push({route,error:e.message})}
 }
 try {await page.goto('https://share.google/72tcJRTtkSLqOezwT',{waitUntil:'domcontentloaded',timeout:20000});const blocked=page.url().includes('/sorry/');publicRows.push({map:blocked?'Google anti-bot challenge; destination not visually verified':page.url(),title:blocked?'Google unusual traffic challenge':await page.title()});}catch(e){publicRows.push({mapError:e.message})}
 await writeFile(`${out}/publico.json`,JSON.stringify({date:'2026-10-15',publicRows},null,2));
 console.log(JSON.stringify(rows.map(r=>({name:r.name,status:r.status,error:r.error,mobile:r.mobile}))));
}finally{await browser.close()}
