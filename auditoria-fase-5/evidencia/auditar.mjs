import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const out = 'auditoria-fase-5/evidencia';
await mkdir(`${out}/capturas`, { recursive: true });
const base = 'http://127.0.0.1:4322';
const routes = ['/', '/nosotros/', '/ministerios/', '/visitanos/', '/links/', '/terminos-y-condiciones/'];
const viewports = [{width:360,height:800},{width:375,height:844},{width:390,height:844},{width:430,height:932},{width:768,height:1024},{width:1024,height:900},{width:1440,height:900}];
const browser = await chromium.launch();
const rows = [];
const failures = [];
try {
 for (const viewport of process.argv.includes('--lab') ? [] : viewports) {
  const context = await browser.newContext({viewport, reducedMotion:'reduce'});
  const page = await context.newPage();
  page.on('pageerror', e => failures.push({viewport, error:e.message}));
  for (const route of routes) {
   const response = await page.goto(base+route);
   await page.evaluate(() => document.fonts.ready);
   const data = await page.evaluate(() => ({
    title: document.title, lang:document.documentElement.lang,
    description:document.querySelector('meta[name=description]')?.content,
    robots:document.querySelector('meta[name=robots]')?.content,
    canonical:document.querySelector('link[rel=canonical]')?.href ?? null,
    ogImage:document.querySelector('meta[property="og:image"]')?.content ?? null,
    favicon:document.querySelector('link[rel~=icon]')?.href ?? null,
    schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),
    headings:[...document.querySelectorAll('main h1,main h2,main h3')].map(h=>({tag:h.tagName,text:h.textContent.trim()})),
    height:document.documentElement.scrollHeight, overflow:document.documentElement.scrollWidth>innerWidth,
    outside:[...document.querySelectorAll('main h1,main h2,main h3,main p,main a')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.left < -1||b.right>innerWidth+1)}).map(e=>e.textContent.trim()),
    text:document.querySelector('main').innerText,
    links:[...document.querySelectorAll('a')].map(a=>({text:a.textContent.trim()||a.getAttribute('aria-label'),href:a.getAttribute('href')})),
    fonts:performance.getEntriesByType('resource').filter(e=>e.name.includes('.woff')).map(e=>({name:e.name.split('/').pop(),bytes:e.encodedBodySize})),
   }));
   let axe;
   if ([390,1440].includes(viewport.width)) {
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    axe={violations:result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>({id:v.id,nodes:v.nodes.length})),passes:result.passes.length};
   }
   if ([360,390,430,768,1440].includes(viewport.width)) {
    // Only the capture page is changed to load below-fold images; production files stay unchanged.
    await page.locator('img[loading=lazy]').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
    await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
    const name=route==='/'?'inicio':route.split('/')[1];
    await page.screenshot({path:`${out}/capturas/${name}-${viewport.width}.png`,fullPage:true});
    if ([390,1440].includes(viewport.width)) await page.screenshot({path:`${out}/capturas/${name}-${viewport.width}-viewport.png`});
   }
   rows.push({route,viewport,status:response.status(),...data,axe});
  }
  await page.goto(base);
  await page.locator('.menu-open').click();
  await page.screenshot({path:`${out}/capturas/menu-${viewport.width}.png`});
  await context.close();
 }
 // Lab observations, cold browser contexts, 10 seconds at the top; no claims about field INP.
 const lab=[];
 for(const mobile of [true,false]) for(const route of ['/','/visitanos/']) for(let repetition=1;repetition<=3;repetition++) {
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const cdp=await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  const networkBytes={};
  const networkUrls={};
  cdp.on('Network.requestWillBeSent',e=>networkUrls[e.requestId]=e.request.url);
  cdp.on('Network.dataReceived',e=>networkBytes[e.requestId]=(networkBytes[e.requestId]??0)+e.encodedDataLength);
  if(mobile) {
   await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1_600_000/8,uploadThroughput:750_000/8});
   await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  }
  await page.addInitScript(()=>{
   window.__lab={lcp:[],shifts:[],longtasks:[]};
   new PerformanceObserver(l=>window.__lab.lcp.push(...l.getEntries().map(e=>({time:e.startTime,size:e.size,element:e.element?.className,url:e.url})))).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(l=>window.__lab.shifts.push(...l.getEntries().filter(e=>!e.hadRecentInput).map(e=>({time:e.startTime,value:e.value})))).observe({type:'layout-shift',buffered:true});
   new PerformanceObserver(l=>window.__lab.longtasks.push(...l.getEntries().map(e=>({time:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});
  });
  await page.goto(base+route,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(10000);
  const result=await page.evaluate(()=>({observed:window.__lab,navigation:performance.getEntriesByType('navigation')[0].toJSON(),paint:performance.getEntriesByType('paint').map(e=>e.toJSON()),resources:performance.getEntriesByType('resource').map(e=>({name:e.name,type:e.initiatorType,transfer:e.transferSize,encoded:e.encodedBodySize,duration:e.duration})),video:[...document.querySelectorAll('video')].map(v=>({src:v.currentSrc,paused:v.paused,readyState:v.readyState}))}));
  const shifts=result.observed.shifts;let cls=0,sum=0,start=0,last=0;
  for(const s of shifts){if(s.time-last>1000||s.time-start>5000){sum=0;start=s.time}sum+=s.value;last=s.time;cls=Math.max(cls,sum)}
  lab.push({route,mobile,repetition,networkPayload:Object.entries(networkBytes).map(([id,bytes])=>({url:networkUrls[id],bytes})),windowSeconds:10,network:mobile?'1.6 Mbps down, 750 kbps up, 150 ms latency':'unthrottled localhost',cpu:mobile?'4x':'1x',lcpMs:result.observed.lcp.at(-1)?.time,cls,ttfbMs:result.navigation.responseStart-result.navigation.requestStart,...result});
  await context.close();
 }
 await writeFile(`${out}/laboratorio.json`,JSON.stringify({date:'2026-10-15',browser:browser.version(),lab},null,2));
 if(rows.length) await writeFile(`${out}/rutas.json`,JSON.stringify({date:'2026-10-15',browser:browser.version(),rows,failures},null,2));
 console.log(JSON.stringify({pages:rows.length,overflow:rows.filter(x=>x.overflow||x.outside.length).map(x=>({route:x.route,width:x.viewport.width,outside:x.outside})),axe:rows.filter(x=>x.axe?.violations.length).map(x=>({route:x.route,width:x.viewport.width,violations:x.axe.violations})),failures,lab:lab.map(x=>({route:x.route,mobile:x.mobile,lcpMs:x.lcpMs,cls:x.cls,ttfbMs:x.ttfbMs,bytes:x.resources.reduce((n,r)=>n+r.transfer,0)}))}));
} finally { await browser.close(); }
