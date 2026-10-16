// Derivados técnicos del emblema madre, sin redibujar ni recolorear.
// Sharp ya forma parte de la cadena de imágenes de Astro (package-lock.json).
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const source = 'identidad/01_comunidad_cristiana_logo_madre_original.png';
await mkdir('public/brand', { recursive: true });
// El original es opaco: conservar sus blancos (cruz/paloma), no aplicar chroma key.
// Quitar solo el margen exterior vacío y añadir un margen transparente uniforme.
const emblem = await sharp(source).trim({ threshold: 30 }).png().toBuffer();
async function iconPng(size) {
  const padding = Math.max(1, Math.round(size * 0.04));
  return sharp(emblem).resize(size - padding * 2, size - padding * 2, {
    fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).extend({ top: padding, bottom: padding, left: padding, right: padding,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).png({ compressionLevel: 9 }).toBuffer();
}
for (const size of [16, 32, 48, 180, 192, 512]) {
  const png = await iconPng(size);
  await writeFile(`public/brand/emblema-${size}.png`, png);
  if (size === 180) await writeFile('public/apple-touch-icon.png', png);
}
await sharp(source).resize(1200, 630, { fit: 'contain', background: '#F7F6F3' })
  .png().toFile('public/brand/comunidad-cristiana-og.png');
// ICO multirresolución; no requiere otra biblioteca ni código cliente.
const sizes = [16, 32, 48];
const icons = await Promise.all(sizes.map(iconPng));
const header = Buffer.alloc(6 + 16 * icons.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icons.length, 4);
let offset = header.length;
icons.forEach((icon, index) => {
  const entry = 6 + index * 16;
  header[entry] = header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(icon.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += icon.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...icons]));
console.log('Emblema oficial: favicon, iconos y Open Graph preparados.');
