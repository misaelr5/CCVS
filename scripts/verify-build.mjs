import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
const routes = ['/', '/nosotros/', '/ministerios/', '/visitanos/', '/links/', '/terminos-y-condiciones/'];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const pageFile = (pathname) => pathname.endsWith('/') ? resolve(root, `.${pathname}`, 'index.html') : resolve(root, `.${pathname}`);
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
    const src = attribute(tag, 'src') ?? (attribute(tag, 'rel') === 'stylesheet' ? attribute(tag, 'href') : null);
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
}
const visit = await readFile(pageFile('/visitanos/'), 'utf8');
for (const value of ['19:30', '21:00', '16:30', 'Vélez Sarsfield s/n']) assert.ok(visit.includes(value));
const about = await readFile(pageFile('/nosotros/'), 'utf8');
assert.equal((about.match(/class="belief-trigger"/g) ?? []).length, 5, 'cinco temas doctrinales');
assert.ok(about.includes('id="creencias"'));
assert.ok(about.indexOf('Un terreno para la comunidad.') < about.indexOf('Una etapa de crecimiento.'));
async function verifyDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert.doesNotMatch(entry.name, /referencias|desktop_inicio|mobile_referencia/i);
    if (entry.isDirectory()) await verifyDirectory(resolve(directory, entry.name));
  }
}
await verifyDirectory(root);
assert.match(await readFile(resolve(root, 'robots.txt'), 'utf8'), /Disallow: \//);
console.log(`PASS: ${routes.length} rutas, ${checkedLinks} enlaces internos/anclas y ${checkedAssets} recursos. Identidad, metadatos, horarios y ausencia de referencias verificados.`);
