import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch();const rows=[];
try{
 for(const width of [360,375,390,430,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:width===1440?900:844},reducedMotion:'reduce'});
  const response=await page.goto('http://127.0.0.1:4322/ministerios/');
  await page.evaluate(()=>document.fonts.ready);
  rows.push({width,status:response.status(),...await page.evaluate(()=>({title:document.title,heading:document.querySelector('.ministries-showcase > h2').textContent,overflow:document.documentElement.scrollWidth>innerWidth,outside:[...document.querySelectorAll('main h1,main h2,main p,main a')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.left < -1||b.right>innerWidth+1)}).map(e=>e.textContent.trim()),navLabels:[...document.querySelectorAll('.menu-groups a')].map(a=>a.textContent)}))});
  if([390,1440].includes(width))await page.screenshot({path:`auditoria-fase-5/evidencia/capturas/reuniones-cierre-${width}.png`});
  await page.close();
 }
 await writeFile('auditoria-fase-5/evidencia/cierre.json',JSON.stringify({date:'2026-10-15',reason:'Concurrent workspace label changes; no production files changed by this audit',rows},null,2));
 console.log(JSON.stringify(rows));
}finally{await browser.close()}
