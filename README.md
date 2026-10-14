# CCVS — Comunidad Cristiana Villa Sarmiento

Sitio institucional estático en español argentino. Astro + TypeScript estricto + Tailwind CSS 4 (plugin oficial de Vite). Sin backend, formularios, rastreadores ni conexiones con servicios de terceros en el MVP.

## Desarrollo

Requisito: Node.js 22.12 o superior (ver `package.json`).

```powershell
npm ci
npm run dev
```

Abrir http://127.0.0.1:4321. Para verificar y revisar el resultado compilado:

```powershell
npm run check
npm run build
npm run verify:static
npm run preview
```

`check` valida TypeScript y plantillas Astro. No hay un script de lint configurado. La revisión visual y de teclado sigue siendo una verificación independiente: un build exitoso no prueba el diseño responsive.

`verify:static` inspecciona el HTML compilado: rutas, enlaces y anclas, recursos, metadatos, datos estructurados, identidad y ausencia de capturas ajenas. No simula un navegador ni verifica el layout.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio, bienvenida, reuniones, actividades e historia |
| `/nosotros/` | Historia, identidad y creencias en acordeón |
| `/ministerios/` | Actividades y únicamente horarios confirmados |
| `/visitanos/` | Horarios, dirección y primera visita |
| `/links/` | Enlaces táctiles para usar desde Instagram |
| `/404.html` | Página de error para configurar en el alojamiento |

## Actualizar contenido

La fuente de datos institucionales y recursos es `src/data/site.ts`. Usar `BRIEF_IGLESIA.md` como evidencia de los datos facilitados; no inventar contenido faltante. La redacción editorial propuesta requiere revisión de la iglesia.

- **Horarios e historia:** editar `schedules` e `history`.
- **Creencias:** editar `faith` solo con aprobación institucional.
- **Ministerios:** editar `activities`. La propiedad opcional `schedule` se omite cuando no hay horario confirmado.
- **Enlaces:** cargar `externalLinks` como `{ label, url }` y `mapUrl` solo con URLs oficiales HTTPS. Los valores ausentes o inválidos no crean botones. No cargar `#` ni números/contactos no autorizados.
- **Textos principales:** editar `home`, `about`, `ministries`, `visit` e `invitation`.

## Fotos y logos

Los originales de `identidad/` se conservan sin alteraciones. Astro genera derivados WebP con tamaño explícito; el encabezado solo usa el emblema madre, sin recolorearlo. El logo local aparece en nosotros y footer.

Para reemplazarlos, agregar los archivos finales e importar sus rutas en `src/data/site.ts`. Preferir PNG transparente o SVG oficial. Mantener texto alternativo descriptivo y la jerarquía de `IDENTIDAD_VISUAL.md`.

Para agregar fotos, crear `src/assets/`, importar imágenes propias autorizadas en `site.ts` y sustituir `null`:

```ts
import fotoPropia from '../assets/foto-autorizada.jpg';
// Dentro de photos:
hero: { src: fotoPropia, alt: 'Descripción real de la imagen', position: 'center' },
```

`hero` y `community` tienen composiciones tipográficas de reserva. El hero prepara recorte adaptable y contraste con degradado; comprobar que las fotos finales no tapen rostros ni reduzcan legibilidad. No presentar fotos de stock como la congregación.

`referencias/` contiene material ajeno de estudio privado. Está excluido de Git y nunca se importa a `src/` ni se copia a `public/` o `dist/`. `index.php` estaba vacío y se conserva; no forma parte del sitio Astro.

## Publicación (requiere autorización adicional)

El repositorio público es https://github.com/misaelr5/CCVS. Subir código a GitHub no despliega el sitio. No hay GitHub Pages, workflow de despliegue ni proveedor configurado.

1. Completar `PENDIENTES_PUBLICACION.md` y obtener aprobación institucional.
2. Elegir proveedor estático y dominio. Configurar Node compatible, comando `npm run build` y directorio de salida `dist`.
3. Configurar `SITE_URL` con el dominio definitivo HTTPS. Astro genera canonical y `og:url` solo cuando existe esa variable; el sitemap se genera con ese dominio. No se usa un dominio de ejemplo como dato público.
4. Configurar página 404 y encabezados HTTP en el proveedor. `public/_headers` aplica en hosts que soportan ese formato (por ejemplo Netlify o Cloudflare Pages); otros proveedores requieren su configuración equivalente.
5. Comprobar las rutas públicas, recursos, sitemap y enlaces tras el despliegue autorizado.

Las fuentes Manrope e Instrument Serif se alojan localmente con Fontsource (OFL-1.1). Astro y Tailwind usan licencia MIT. El contenido y logos institucionales no se licencian como material de terceros reutilizable.

Para un build local con dominio confirmado, definir `$env:SITE_URL` en PowerShell antes de ejecutar `npm run build` y retirarlo al finalizar. `astro.config.mjs` lee la variable del proceso; no alcanza con copiar `.env.example`.

## Arquitectura y decisiones

Astro genera HTML por página; los componentes comparten datos tipados. Tailwind 4 se integra mediante Vite y el diseño editorial se define en `src/styles/global.css`. Menú y acordeón usan elementos nativos `<details>`: funcionan sin JavaScript. El menú añade Escape, retorno de foco, ciclo de Tab, cierre al navegar y al pasar a escritorio con un script pequeño. No se agregaron React, carruseles ni librerías de animación.

## Fuentes técnicas

- [Instalación oficial de Astro](https://docs.astro.build/en/install-and-setup/)
- [Tailwind CSS 4 con Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)

El MVP evita almacenar datos personales y usar secretos. Si se agregan formularios, donaciones o CMS, habrá que diseñar y validar esos flujos por separado.
