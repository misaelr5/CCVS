import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
const routes = ['/', '/nosotros/', '/lo-que-creemos/', '/ministerios/', '/visitanos/', '/links/', '/terminos-y-condiciones/', '/politica-de-privacidad/'];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const pageFile = (pathname) => {
  const decoded = decodeURIComponent(pathname);
  return decoded.endsWith('/') ? resolve(root, `.${decoded}`, 'index.html') : resolve(root, `.${decoded}`);
};
let checkedLinks = 0;
let checkedAssets = 0;
for (const route of routes) {
  const html = await readFile(pageFile(route), 'utf8');
  assert.match(html, /<html[^>]*lang="es-AR"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: un solo h1`);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.doesNotMatch(html, /referencias\/|passioncitychurch|#08B9E5/i);
  assert.doesNotMatch(html, /Ã|Â|â€/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(ogImage, `${route}: imagen social declarada`);
  const socialUrl = new URL(ogImage);
  assert.equal(socialUrl.protocol, 'https:');
  const socialPng = await readFile(pageFile(socialUrl.pathname));
  assert.equal(socialPng.subarray(1, 4).toString(), 'PNG');
  assert.equal(socialPng.readUInt32BE(16), 1200);
  assert.equal(socialPng.readUInt32BE(20), 630);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.equal(JSON.parse(schema)['@type'], 'Church');
  if (route !== '/links/') {
    const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
    assert.ok(header?.includes('logo_madre_original'), `${route}: emblema madre en header`);
    assert.doesNotMatch(header, /ccvs_logo/i);
  }
  for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
    const href = attribute(tag, 'href');
    assert.ok(href && href !== '#', `${route}: enlace vacío`);
    const url = new URL(href, `https://ccvs.invalid${route}`);
    if (url.origin !== 'https://ccvs.invalid') { assert.equal(url.protocol, 'https:'); continue; }
    const target = pageFile(url.pathname);
    assert.ok(target.startsWith(root));
    const body = await readFile(target, 'utf8');
    if (url.hash) assert.ok(body.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: ancla rota ${href}`);
    checkedLinks++;
  }
  for (const tag of html.match(/<(?:img|script|link)\b[^>]*>/g) ?? []) {
    const src = attribute(tag, 'src') ?? (['stylesheet', 'icon', 'apple-touch-icon', 'manifest'].includes(attribute(tag, 'rel')) ? attribute(tag, 'href') : null);
    if (!src) continue;
    const url = new URL(src, `https://ccvs.invalid${route}`);
    if (url.origin !== 'https://ccvs.invalid') continue;
    assert.ok((await stat(pageFile(url.pathname))).size > 0, `${route}: recurso ausente ${src}`);
    if (tag.startsWith('<img')) {
      const alt = attribute(tag, 'alt');
      const decorative = /\baria-hidden="true"/.test(tag) && /\balt(?:=""|(?=\s|>))/.test(tag);
      assert.ok(alt?.trim() || decorative, `${route}: imagen sin descripción`);
      assert.ok(Number(attribute(tag, 'width')) > 0 && Number(attribute(tag, 'height')) > 0);
    }
    checkedAssets++;
  }
  for (const tag of html.match(/<video\b[^>]*>/g) ?? []) {
    for (const name of ['data-video-src', 'data-video-mobile']) {
      const src = attribute(tag, name);
      assert.ok(src, `${route}: video sin ${name}`);
      assert.ok((await stat(pageFile(new URL(src, 'https://ccvs.invalid').pathname))).size > 0, `${route}: recurso de video ausente ${src}`);
      checkedAssets++;
    }
    assert.match(tag, /\bmuted\b/);
    assert.match(tag, /\bplaysinline\b/);
  }
}
const visit = await readFile(pageFile('/visitanos/'), 'utf8');
for (const value of ['20:30', '21:00', '16:30', 'Vélez Sarsfield s/n']) assert.ok(visit.includes(value));
assert.match(visit, /<iframe[^>]+title="Mapa de Comunidad Cristiana Villa Sarmiento"/);
assert.match(visit, /https:\/\/www\.google\.com\/maps\?q=-31\.9309445%2C-65\.1925254/);
assert.match(visit, /href="https:\/\/maps\.app\.goo\.gl\/YemN5zzZ2aumfGYy8"/);
assert.match(await readFile(pageFile('/links/'), 'utf8'), /href="https:\/\/maps\.app\.goo\.gl\/YemN5zzZ2aumfGYy8"[^>]*>[^<]*<svg/);
const privacy = await readFile(pageFile('/politica-de-privacidad/'), 'utf8');
assert.match(privacy, /Última actualización: 16 de octubre de 2026/);
assert.match(privacy, /href="\/links\/">canales oficiales<\/a>/);
assert.match(await readFile(pageFile('/'), 'utf8'), /href="\/politica-de-privacidad\/">Política de privacidad<\/a>/);
const about = await readFile(pageFile('/nosotros/'), 'utf8');
const beliefsPage = await readFile(pageFile('/lo-que-creemos/'), 'utf8');
assert.equal((beliefsPage.match(/class="belief-trigger"/g) ?? []).length, 8, 'ocho fundamentos doctrinales');
assert.doesNotMatch(about, /class="belief-trigger"/, 'creencias en su propia pagina');
assert.ok(beliefsPage.includes('id="creencias"'));
assert.ok(about.indexOf('Un terreno para la comunidad.') < about.indexOf('Crecimos como congregación.'));
async function verifyDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert.doesNotMatch(entry.name, /referencias|desktop_inicio|mobile_referencia/i);
    if (entry.isDirectory()) await verifyDirectory(resolve(directory, entry.name));
  }
}
await verifyDirectory(root);
assert.match(await readFile(resolve(root, 'robots.txt'), 'utf8'), /Disallow: \//);
console.log(`PASS: ${routes.length} rutas, ${checkedLinks} enlaces internos/anclas y ${checkedAssets} recursos. Identidad, metadatos, horarios y ausencia de referencias verificados.`);
