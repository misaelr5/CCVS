// Auditoria de solo lectura. Solo escribe documentos de evidencia y capturas locales.
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { gzipSync, brotliCompressSync } from 'node:zlib';
const out = 'docs/auditoria-seo-geo-evidencia';
const captures = 'qa-artifacts/seo-geo-20261016';
const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:4323';
const live = 'https://ccvs-sigma.vercel.app';
const routes = ['/', '/nosotros/', '/lo-que-creemos/', '/ministerios/', '/visitanos/', '/links/', '/terminos-y-condiciones/', '/politica-de-privacidad/'];
await mkdir(out, { recursive:true });
await mkdir(captures, { recursive:true });
const save = (name, data) => writeFile(`${out}/${name}.json`, JSON.stringify(data,null,2)+'\n');
const hash = data => createHash('sha256').update(data).digest('hex');
const git = (...args) => execFileSync('git',args,{encoding:'utf8'}).trim();
const meta = {date:new Date().toISOString(),timeZone:'America/Montevideo',commit:git('rev-parse','HEAD'),node:process.version,base,live};
async function filesIn(dir) {
 const files=[];
 for(const entry of await readdir(dir,{withFileTypes:true})) {
  const path=`${dir}/${entry.name}`;
  if(entry.isDirectory()) files.push(...await filesIn(path)); else files.push(path);
 }
 return files;
}
if(process.argv.includes('--http')) {
 const tracked=git('ls-files').split('\n').filter(p=>/^(src\/|scripts\/|public\/|astro.config|vercel.json|package|tsconfig)/.test(p));
 await save('manifest', {...meta,files:await Promise.all(tracked.map(async path=>({path,sha256:hash(await readFile(path))})))});
 const assets=await Promise.all((await filesIn('dist')).map(async path=>({path,bytes:(await stat(path)).size})));
 const textAssets=[];
 for(const item of assets.filter(a=>/\.(css|js|woff2|mp4)$/.test(a.path))) {
  const body=await readFile(item.path);
  textAssets.push({...item,...(/\.(css|js)$/.test(item.path)?{gzip:gzipSync(body).length,brotli:brotliCompressSync(body).length}:{})});
 }
 await save('assets',{...meta,totalBytes:assets.reduce((n,a)=>n+a.bytes,0),files:textAssets.sort((a,b)=>b.bytes-a.bytes)});
 async function inspect(url) {
  const chain=[];
  try {
   let current=url;
   for(let i=0;i<8;i++) {
    const r=await fetch(current,{redirect:'manual',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'CCVS-ReadOnly-Audit/1.0'}});
    const headers=Object.fromEntries([...r.headers].filter(([k])=>/^(location|content-type|content-length|content-encoding|cache-control|x-robots-tag|x-vercel-cache|strict-transport-security|referrer-policy|x-frame-options|x-content-type-options|vary|server)$/.test(k)));
    chain.push({url:current,status:r.status,headers});
    if(r.status>=300&&r.status<400&&r.headers.has('location')) {current=new URL(r.headers.get('location'),current).href;await r.body?.cancel();continue;}
    const body=await r.text();
    return {url,chain,bodyBytes:Buffer.byteLength(body),sha256:hash(body),title:body.match(/<title>(.*?)<\/title>/s)?.[1],robots:body.match(/<meta name="robots" content="([^"]*)"/)?.[1],canonical:body.match(/<link rel="canonical" href="([^"]*)"/)?.[1]??null,html:current.includes('robots.txt')||current.includes('sitemap')?body.slice(0,1600):undefined};
   }
  } catch(error) {return {url,chain,error:String(error)};}
 }
 const urls=[...routes.map(r=>live+r),live+'/robots.txt',live+'/sitemap.xml',live+'/sitemap-index.xml',live+'/no-existe-auditoria-ccvs/',live+'/horarios/',live+'/historia/',live+'/visitanos',live+'/?utm_source=auditoria',live+'/index.html',live+'/favicon.ico','http://ccvs-sigma.vercel.app/','https://maps.app.goo.gl/YemN5zzZ2aumfGYy8','https://www.instagram.com/jovenesccvs/','https://www.facebook.com/comunidadcristiana.villasarmiento/','https://www.youtube.com/@comunidadcristianavillasar9819/videos'];
 const responses=await Promise.all(urls.map(inspect));
 const liveHtml=await (await fetch(live)).text();
 const samples=[...liveHtml.matchAll(/(?:src|href)="([^"<>]+\.(?:css|js))"/g)].map(m=>new URL(m[1],live).href).slice(0,4);
 samples.push(live+'/media/portada-ccvs-mobile.mp4');
 const headers=[];
 for(const url of samples) {try {const r=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(15000)});headers.push({url,status:r.status,headers:Object.fromEntries([...r.headers].filter(([k])=>/cache|content-type|content-length|encoding|accept-ranges/.test(k)))});}catch(e){headers.push({url,error:String(e)});}}
 await save('publico',{...meta,responses,assetHeaders:headers});
 console.log(JSON.stringify({responses:responses.map(r=>({url:r.url,status:r.chain.at(-1)?.status,robots:r.robots,canonical:r.canonical,error:r.error})),assets:textAssets.slice(0,6)}));
}
if(process.argv.includes('--browser')) {
 const browser=await chromium.launch();
 const rows=[],nojs=[],errors=[];
 try {
  for(const width of [360,375,390,430,768,1024,1440]) {
   const context=await browser.newContext({viewport:{width,height:width===1440?900:844},reducedMotion:'reduce'});
   const page=await context.newPage();
   page.on('pageerror',e=>errors.push({url:page.url(),width,error:e.message}));
   for(const route of routes) {
    const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>document.fonts.ready);
    const data=await page.evaluate(()=>({
     title:document.title,description:document.querySelector('meta[name="description"]')?.content,
     robots:document.querySelector('meta[name="robots"]')?.content,lang:document.documentElement.lang,
     canonical:document.querySelector('link[rel="canonical"]')?.href??null,
     meta:[...document.querySelectorAll('head meta')].map(e=>({name:e.name||e.getAttribute('property'),content:e.content})),
     schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),
     h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),
     headings:[...document.querySelectorAll('main h1,main h2,main h3,main h4')].map(e=>({tag:e.tagName,text:e.textContent.replace(/\s+/g,' ').trim()})),
     text:document.querySelector('main')?.innerText,allText:document.querySelector('main')?.textContent,
     links:[...document.querySelectorAll('a')].map(a=>({href:a.getAttribute('href'),text:(a.getAttribute('aria-label')||a.textContent).replace(/\s+/g,' ').trim()})),
     images:[...document.images].map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,alt:i.getAttribute('alt'),ariaHidden:i.getAttribute('aria-hidden'),loading:i.loading,width:i.width,height:i.height,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,sizes:i.sizes,srcset:i.srcset,renderedWidth:Math.round(i.getBoundingClientRect().width),renderedHeight:Math.round(i.getBoundingClientRect().height)})),
     overflow:document.documentElement.scrollWidth>innerWidth,
     outside:[...document.querySelectorAll('main h1,main h2,main h3,main p,main a')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left < -1||r.right>innerWidth+1)}).map(e=>e.textContent.trim()),
     smallText:[...document.querySelectorAll('main p,main a')].filter(e=>e.getBoundingClientRect().width>0&&parseFloat(getComputedStyle(e).fontSize)<14).map(e=>({text:e.textContent.trim().slice(0,100),px:getComputedStyle(e).fontSize})),
     fonts:performance.getEntriesByType('resource').filter(e=>e.name.includes('.woff')).map(e=>({url:e.name,bytes:e.encodedBodySize})),
     iframe:[...document.querySelectorAll('iframe')].map(e=>({src:e.src,title:e.title,loading:e.loading})),
    }));
    let axe;
    if([390,1440].includes(width)) {
     const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
     axe={violations:scan.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:scan.incomplete.map(v=>({id:v.id,nodes:v.nodes.length})),passes:scan.passes.length};
     await page.locator('img[loading="lazy"]').evaluateAll(images=>images.forEach(i=>i.loading='eager'));
     await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
     await page.screenshot({path:`${captures}/${route==='/'?'inicio':route.split('/')[1]}-${width}.png`,fullPage:true});
    }
    rows.push({route,width,status:response?.status(),...data,axe});
   }
   await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();
  for(const route of routes) {
   await page.goto(base+route);
   nojs.push({route,...await page.evaluate(()=>({h1:document.querySelector('h1')?.innerText,text:document.querySelector('main')?.innerText,visibleBeliefPanels:[...document.querySelectorAll('.belief-panel')].filter(e=>!e.hidden&&e.getBoundingClientRect().height>0).length,navigation:[...document.querySelectorAll('.nojs-navigation a')].map(e=>e.getAttribute('href')),videoSrc:document.querySelector('video')?.getAttribute('src')}))});
  }
  await context.close();
  const publicRows=[];
  const publicContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const p=await publicContext.newPage();
  for(const route of routes) {
   try {const response=await p.goto(live+route,{waitUntil:'domcontentloaded',timeout:30000});publicRows.push({route,status:response?.status(),...await p.evaluate(()=>({title:document.title,robots:document.querySelector('meta[name="robots"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href??null,schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),h1:document.querySelector('h1')?.textContent,photo:document.querySelector('.beliefs-photo-slot .photo-frame img')?.getAttribute('alt'),map:document.querySelector('.visit-map iframe')?.getAttribute('src'),schedule:document.querySelector('.principal-time,.visit-feature-time')?.textContent}))});}catch(e){publicRows.push({route,error:String(e)});}
  }
  await publicContext.close();
  await save('rutas',{...meta,browser:browser.version(),rows,nojs,errors,publicRows});
  console.log(JSON.stringify({rows:rows.length,overflows:rows.filter(r=>r.overflow||r.outside.length).map(r=>({route:r.route,width:r.width,outside:r.outside})),axe:rows.filter(r=>r.axe?.violations.length).map(r=>({route:r.route,width:r.width,violations:r.axe.violations})),errors,publicRows}));
 }finally {await browser.close();}
}
