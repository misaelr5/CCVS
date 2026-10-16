// Derivados técnicos del emblema madre, sin recortes ni cambios de color.
// Sharp ya forma parte de la cadena de imágenes de Astro (package-lock.json).
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const source = 'identidad/01_comunidad_cristiana_logo_madre_original.png';
await mkdir('public/brand', { recursive: true });
for (const size of [32, 48, 180, 192, 512]) {
  await sharp(source).resize(size, size).png().toFile(`public/brand/emblema-${size}.png`);
}
await sharp(source).resize(1200, 630, { fit: 'contain', background: '#F7F6F3' })
  .png().toFile('public/brand/comunidad-cristiana-og.png');
// ICO con dos resoluciones PNG; no requiere otra biblioteca ni código cliente.
const icons = await Promise.all([32, 48].map(size => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * icons.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icons.length, 4);
let offset = header.length;
icons.forEach((icon, index) => {
  const entry = 6 + index * 16;
  header[entry] = header[entry + 1] = [32, 48][index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(icon.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += icon.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...icons]));
console.log('Emblema oficial: favicon, iconos y Open Graph preparados.');
