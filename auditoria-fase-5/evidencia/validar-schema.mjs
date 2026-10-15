import {chromium} from '@playwright/test';
import {readFile,writeFile} from 'node:fs/promises';
const out='auditoria-fase-5/evidencia';
const schema=JSON.parse(await readFile(`${out}/schema-propuesto.json`,'utf8'));
const html=`<!doctype html><html lang="es-AR"><head><title>CCVS — propuesta de auditoría</title><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><h1>${schema.name}</h1><p>${schema.description}</p><p>Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina</p></body></html>`;
const browser=await chromium.launch();const results=[];
try {
 for(const kind of process.argv.includes('--google') ? ['google'] : ['schema','google']) {
  const context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();
  try {
   await page.goto(kind==='schema'?'https://validator.schema.org/':'https://search.google.com/test/rich-results',{waitUntil:'domcontentloaded',timeout:20000});
   if(kind==='schema') {
    await page.getByText('Fragmento de código',{exact:true}).click();
    await page.locator('.CodeMirror').last().click();await page.keyboard.insertText(html);
    await page.getByText('Ejecutar prueba',{exact:true}).click();
   } else {
    await page.locator('[role=tab]').nth(1).click();
    const editor=page.locator('textarea:visible').first();
    await editor.fill(html);
    await page.locator('[role=button]:visible').filter({hasText:/^test code$/i}).click();
   }
   await page.waitForTimeout(12000);
   results.push({kind,url:page.url(),text:await page.locator('body').innerText()});
   await page.screenshot({path:`${out}/schema-${kind}.png`,fullPage:true});
  }catch(e){results.push({kind,error:e.message,text:await page.locator('body').innerText().catch(()=>'' )});}
  await context.close();
 }
 const prior=process.argv.includes('--google')?JSON.parse(await readFile(`${out}/schema-validacion.json`,'utf8')).results.filter(r=>r.kind!=='google'):[];
 await writeFile(`${out}/schema-validacion.json`,JSON.stringify({date:'2026-10-15',mode:'code snippet; proposed, not deployed',results:[...prior,...results]},null,2));
 console.log(JSON.stringify(results));
}finally{await browser.close()}
