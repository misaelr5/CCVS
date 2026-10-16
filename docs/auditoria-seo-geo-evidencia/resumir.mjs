import { readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const rawDir='qa-artifacts/seo-geo-20261016';
const out='docs/auditoria-seo-geo-evidencia';
const runs=[];
for(const file of (await readdir(rawDir)).filter(f=>/^lighthouse-.*\.json$/.test(f))) {
 const raw=await readFile(`${rawDir}/${file}`);
 const d=JSON.parse(raw);
 const keep=['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','total-byte-weight'];
 runs.push({file:`${rawDir}/${file}`,sha256:createHash('sha256').update(raw).digest('hex'),version:d.lighthouseVersion,fetchTime:d.fetchTime,requestedUrl:d.requestedUrl,finalDisplayedUrl:d.finalDisplayedUrl,environment:d.environment,config:d.configSettings,warnings:d.runWarnings,
  scores:Object.fromEntries(Object.entries(d.categories).map(([k,v])=>[k,v.score*100])),
  metrics:Object.fromEntries(keep.map(k=>[k,{value:d.audits[k]?.numericValue,unit:d.audits[k]?.numericUnit,display:d.audits[k]?.displayValue}])),
  failedAudits:Object.entries(d.audits).filter(([,v])=>v.score!==null&&v.score<1).map(([id,v])=>({id,title:v.title,score:v.score,display:v.displayValue})),
  lcp:d.audits['lcp-breakdown-insight']?.details,
  longTasks:d.audits['long-tasks']?.details?.items,
  imageDelivery:d.audits['image-delivery-insight']?.details?.items?.map(i=>({url:i.url,totalBytes:i.totalBytes,wastedBytes:i.wastedBytes})),
 });
}
await writeFile(`${out}/lighthouse-resumen.json`,JSON.stringify({date:new Date().toISOString(),method:'CLI 13.5.0, public alias, default simulated mobile / desktop preset. Independent processes, no parallel browser audits. Raw JSON remains locally in ignored qa-artifacts.',runs},null,2)+'\n');
const e2e=JSON.parse(await readFile(`${out}/e2e.json`));
const specs=[];
function collect(s){specs.push(...(s.specs??[]));(s.suites??[]).forEach(collect);}
e2e.suites.forEach(collect);
const summary={stats:e2e.stats,failed:specs.filter(s=>!s.ok).map(s=>({file:s.file,line:s.line,title:s.title,error:s.tests[0]?.results[0]?.error?.message?.replace(/\u001b\[[0-9;]*m/g,'')}))};
await writeFile(`${out}/e2e-resumen.json`,JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({lighthouseRuns:runs.length,tests:summary.stats,rawJson:runs.map(r=>r.file)}));
