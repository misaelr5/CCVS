import { chromium } from '@playwright/test';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const base = process.env.CCVS_TEST_BASE_URL ?? 'http://127.0.0.1:4323';
const out = new URL('./verificacion.json', import.meta.url);
const baseline = JSON.parse(await readFile(new URL('../auditoria-seo-geo-evidencia/manifest.json', import.meta.url), 'utf8'));
const modified = [];
for (const file of baseline.files) {
  const hash = createHash('sha256').update(await readFile(file.path)).digest('hex');
  if (hash !== file.sha256) modified.push(file.path);
}
const protectedPaths = ['astro.config.mjs', 'vercel.json', 'package.json', 'package-lock.json', 'src/data/site.ts', 'src/scripts/ui.ts', 'src/scripts/scroll-motion.ts', 'src/scripts/hero-video.ts', 'src/components/HeroVideo.astro', 'src/components/EditorialHero.astro', 'src/pages/robots.txt.ts', 'src/pages/[sitemap].xml.ts'];
assert.ok(!modified.some(path => protectedPaths.includes(path) || /^(src\/assets\/|public\/media\/|identidad\/)/.test(path)), 'Conservar hero, medios, identidad, dependencias e indexación');
const h1Unchanged = [];
for (const { path } of baseline.files.filter(file => file.path.endsWith('.astro'))) {
  const before = execFileSync('git', ['show', `${baseline.commit}:${path}`], { encoding: 'utf8' });
  const after = await readFile(path, 'utf8');
  const headings = source => source.match(/<h1\b[\s\S]*?<\/h1>/g) ?? [];
  assert.deepEqual(headings(after), headings(before), `${path}: H1 aprobado intacto`);
  if (headings(before).length) h1Unchanged.push(path);
}
const layoutBefore = execFileSync('git', ['show', `${baseline.commit}:src/layouts/BaseLayout.astro`], { encoding: 'utf8' });
const layoutAfter = (await readFile('src/layouts/BaseLayout.astro', 'utf8')).replace(/\r\n/g, '\n');
for (const pattern of [/const schema = [^\n]+/, /const pageMotion = \{[\s\S]*?\n\};/]) {
  assert.equal(layoutAfter.match(pattern)?.[0], layoutBefore.match(pattern)?.[0], 'Schema y transiciones intactos');
}
const browser = await chromium.launch();
const samples = [];
try {
  for (const dpr of [1, 2, 3]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: dpr, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of ['/', '/ministerios/', '/visitanos/']) {
      await page.goto(base + route);
      await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode())));
      const images = await page.locator('img').evaluateAll(images => images.map(image => ({
        alt: image.alt, src: image.currentSrc, sizes: image.sizes,
        renderedWidth: Math.round(image.getBoundingClientRect().width),
        renderedHeight: Math.round(image.getBoundingClientRect().height),
      })));
      for (const image of images) {
        const path = `dist${decodeURIComponent(new URL(image.src).pathname)}`;
        const metadata = await sharp(path).metadata();
        Object.assign(image, { bytes: (await stat(path)).size, resourceWidth: metadata.width, resourceHeight: metadata.height });
      }
      samples.push({ route, viewport: 390, dpr, images });
    }
    await context.close();
  }
} finally { await browser.close(); }
const media = [];
for (const file of ['public/media/portada-ccvs-mobile.mp4', 'public/media/portada-ccvs.mp4', 'public/media/nuestra-historia-mobile.mp4', 'public/media/nuestra-historia.mp4']) {
  media.push({ file, bytes: (await stat(file)).size, sha256: createHash('sha256').update(await readFile(file)).digest('hex') });
}
const result = { date: new Date().toISOString(), base, protectedFilesUnchanged: true, h1Unchanged, schemaAndTransitionsUnchanged: true, modifiedAgainstAudit: modified, media, samples };
await writeFile(out, JSON.stringify(result, null, 2) + '\n');
console.log(`Registradas ${samples.length} muestras de imágenes, DPR 1/2/3 y diferencias contra auditoría. Hero sin modificaciones.`);
