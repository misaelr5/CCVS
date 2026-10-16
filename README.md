# CCVS — reconstrucción V3

Sitio estático de Comunidad Cristiana Villa Sarmiento. La base aprobada es V3/Fase 4. Fase 4.2 incorporó redes y motion. El último ajuste está documentado en `AJUSTES_NAVEGACION_RESULTADO.md`: menú en tarjeta, navegación desde arriba, objetos al scroll y footer compacto con CCVS de fondo. Versión de revisión publicada por autorización del usuario en **https://ccvs-sigma.vercel.app/**. Detalle de publicación en `DESPLIEGUE_VERCEL.md`; los cambios de Git siguen pendientes de commit y push.

## Arranque

Node.js 22.12 o superior. Entorno verificado con Node 24.15.0.

```powershell
npm ci
npm run dev
```

Abrir http://127.0.0.1:4321/. Para ver la salida compilada:

```powershell
npm run check
npm run build
npm run verify:static
npm run preview -- --port 4322
```

La vista compilada queda en http://127.0.0.1:4322/.

## Arquitectura

Astro 7, TypeScript estricto, Tailwind CSS 4 con integración Vite oficial y `astro:assets`. HTML estático y CSS editorial; JavaScript para menú, acordeón, transiciones y motion progresivo. Sin backend, React, trackers, carruseles pesados ni formularios. Menú no modal: permite interactuar con la página. Las rutas sin fragmento empiezan arriba incluso al retroceder; las anclas conservan su destino. Motion se desactiva con `prefers-reduced-motion`.

Fuentes reales: **Archivo Variable** (peso y ancho variables) + **Bodoni Moda Variable**, alojadas localmente mediante Fontsource. Son alternativas libres, no copias exactas de GT America/Saol. No se extrajeron fuentes comerciales ni activos de Passion City.

| Ruta | Contenido |
| --- | --- |
| `/` | Hero, bienvenida, horarios, comunidad, actividades, servicio y visita |
| `/nosotros/` | Portada editorial, historia e identidad |
| `/lo-que-creemos/` | Creencias de la congregación y acordeón accesible |
| `/ministerios/` | Reuniones locales en bloques alternados |
| `/visitanos/` | Horarios, dirección y primera visita |
| `/links/` | Enlaces propios para teléfonos |
| `/terminos-y-condiciones/` | Borrador pendiente de revisión institucional y jurídica |

Anclas: `/nosotros/#historia`, `/lo-que-creemos/#creencias`, `/visitanos/#horarios`, y reuniones en `/ministerios/`.

## Contenido editable

Datos tipados en `src/data/`:

- `site.ts`: identidad, dirección, fotos, copy editorial provisional y estado de aprobación.
- `schedule.ts`: los cuatro horarios confirmados.
- `history.ts`: cronología vigente según V3; donación anterior al período del salón alquilado, sin fecha inventada.
- `beliefs.ts`: cinco creencias y orientación informada.
- `ministries.ts`: grupos de actividades, sin inventar estructuras formales.
- `links.ts`: navegación y URLs oficiales. Las redes y el mapa faltantes no generan botones.

Los mensajes de `editorial` son propuestas del prompt, no misión ni lemas oficiales. Deben aprobarse junto con la historia y doctrina. `legal.ts` contiene el borrador legal. Instagram de jóvenes, Facebook y YouTube están confirmados por el usuario; el enlace de Maps provisto posteriormente abre la ficha de la iglesia y se usa para llegar desde Links y Visitarnos.

## Fotos y logos

Los originales de `identidad/` se conservan sin recolorear ni remover fondos. El header muestra solo el emblema madre. CCVS limpio aparece después en Nosotros y footer. Los archivos siguen siendo provisionales.

No hay fotografías propias recibidas. Las reservas neutras mantienen proporciones de las futuras imágenes y señalan ese pendiente. No se usan fotografías ajenas, generadas ni de stock como si fueran CCVS.

Para incorporar imágenes propias autorizadas, crear `src/assets/`, importar los archivos desde `site.ts` y reemplazar un valor `null`:

```ts
import heroDesktop from '../assets/hero-autorizado.jpg';
import heroMobile from '../assets/hero-mobile-autorizado.jpg';
// Dentro de site.photos:
hero: {
  src: heroDesktop,
  mobile: heroMobile,
  alt: 'Descripción real de la fotografía',
  position: 'center',
  mobilePosition: 'center',
},
```

El componente genera derivados WebP, dimensiones y srcset. El recorte mobile puede usar una foto independiente. Revalidar contraste y rostros después de incorporar fotos reales. Los nuevos recursos de collage, reunión y banner se documentan con sus proporciones en `FASE_4_RESULTADO.md`.

`referencias/`, `videos/` y `qa-artifacts/` son de estudio local, están ignorados por Git y no se importan al sitio. Nunca copiarlos a `public/`. Las comparativas que contienen material ajeno tampoco deben publicarse.

## Verificación

```powershell
npx playwright install chromium
npm run build
npm run test:e2e
npm run capture -- final
```

Playwright y axe son dependencias de desarrollo: no se envían al visitante. Las pruebas usan un worker para limitar RAM y levantan preview en 4322 si hace falta. Para capturar contra ese preview:

```powershell
$env:CCVS_BASE_URL = 'http://127.0.0.1:4322'
npm run capture -- final
Remove-Item Env:CCVS_BASE_URL
```

Las capturas por defecto usan el servidor de desarrollo en 4321. Resultados reales en `VALIDACION.md`; observaciones visuales en `COMPARACION_VISUAL.md`. No hay script de lint configurado. Las pruebas automáticas no sustituyen revisión con dispositivos o lectores de pantalla.

## Respaldo

- Rama local `backup/antes-v3-20261014`: implementación anterior, commit `4b28277`.
- Copia externa completa `D:\CCVS-respaldos\antes-v3-con-pack-completo`: 65 archivos incluyendo el pack, videos, originales y bundle Git.
- `MANIFIESTO_SHA256.csv` documenta hashes; `repositorio.bundle` contiene historial completo y fue verificado.
- Dependencias, salida compilada y cachés no están en el respaldo: son regenerables.

Para recuperar archivos puntuales, copiarlos desde el respaldo a una carpeta separada y revisar antes de reemplazar el trabajo nuevo. No usar un reset destructivo sobre la reconstrucción.

## Publicación futura

El prototipo tiene `noindex, nofollow` y `robots.txt` bloquea rastreo. No se fuerza indexación de contenido sin aprobación.

Después de aprobación institucional, elegir dominio y alojamiento, configurar `SITE_URL` como variable del proceso y cambiar `site.publicationApproved` a `true`. Canonical, og:url y sitemap solo se generan con un dominio configurado; el sitemap contiene únicamente las cinco rutas. No hay dominio ficticio ni imagen Open Graph ajena.

`public/_headers` prepara encabezados para proveedores compatibles; en otros hosts se necesita configuración equivalente. Ningún encabezado de producción fue probado porque no hubo despliegue.

Revisar `PENDIENTES_PUBLICACION.md` antes de pedir despliegue. La rama `backup/antes-fase4-20261014` conserva V3. Fase 4 usa ClientRouter con navegación completa de fallback y un ciclo de inicialización/limpieza de interacciones; no añade dependencias. Ver `FASE_4_RESULTADO.md` para las 52 pruebas, cambios y límites.

## Referencias

La geometría se estudió con capturas locales de [la portada global](https://passioncitychurch.com/) y [US](https://passioncitychurch.com/us/). La investigación DC aportó organización funcional únicamente. [El catálogo tipográfico citado por V3](https://maxibestof.one/websites/28852-passion-city-church) es evidencia de terceros, no una medición de los archivos CSS.
