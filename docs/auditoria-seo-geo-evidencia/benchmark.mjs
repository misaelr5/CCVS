import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch();
const rows=[];
try {
 for(const url of ['https://www.iglesialamision.com.ar/','https://reydereyes.com.ar/','https://passioncitychurch.com/']) {
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await context.newPage();
  const requests=[];
  page.on('request',r=>requests.push({origin:new URL(r.url()).origin,type:r.resourceType()}));
  try {
   const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForTimeout(3000);
   rows.push({url,finalUrl:page.url(),status:response?.status(),...await page.evaluate(()=>({
    title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href??null,
    h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.trim().slice(0,80)).slice(0,3),
    relevantLinks:[...document.querySelectorAll('a')].filter(a=>/visita|horario|reunion|mapa|llegar|location|gathering|new here/i.test(a.textContent)).slice(0,7).map(a=>({text:a.textContent.trim().slice(0,65),href:a.href})),
    images:document.images.length,lazyImages:[...document.images].filter(i=>i.loading==='lazy').length,
    videos:[...document.querySelectorAll('video')].map(v=>({autoplay:v.autoplay,preload:v.preload})),
    iframeCount:document.querySelectorAll('iframe').length,scriptCount:document.scripts.length,
    horizontalOverflow:document.documentElement.scrollWidth>innerWidth,
   })),requestCountInWindow:requests.length,thirdPartyOrigins:[...new Set(requests.filter(r=>r.origin!==new URL(page.url()).origin).map(r=>r.origin))]});
  }catch(error){rows.push({url,error:String(error)});}
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900}});
 const page=await context.newPage();
 let map;
 try {
  await page.goto('https://maps.app.goo.gl/YemN5zzZ2aumfGYy8',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForTimeout(3000);
  map={url:page.url(),title:await page.title(),...await page.evaluate(()=>({
   heading:document.querySelector('h1')?.textContent,
   address:[...document.querySelectorAll('button[data-item-id="address"]')].map(e=>e.getAttribute('aria-label')),
   website:[...document.querySelectorAll('a[data-item-id="authority"]')].map(e=>({href:e.href,label:e.getAttribute('aria-label')})),
   hours:[...document.querySelectorAll('[data-item-id="oh"]')].map(e=>e.getAttribute('aria-label')||e.textContent.trim()),
  }))};
 }catch(error){map={error:String(error)};}
 await context.close();
 await writeFile('docs/auditoria-seo-geo-evidencia/benchmark.json',JSON.stringify({date:new Date().toISOString(),browser:browser.version(),method:'390x844, reduced motion, DOMContentLoaded + 3s, sin clicks ni autenticacion; conteos son una muestra, no Core Web Vitals',rows,map},null,2)+'\n');
 console.log(JSON.stringify({rows,map}));
}finally{await browser.close();}
