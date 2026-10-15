# Estado general — CCVS, Fase 5

Fecha de auditoría: **15/10/2026**. Base local: `main`, commit `7395d42`. Git comenzó limpio. Alcance: diagnóstico, pruebas, capturas y propuestas; **sin correcciones, instalaciones, commit, push ni deploy**.

**Estado al cierre:** aparecieron ediciones concurrentes ajenas a esta auditoría en README, navegación e Inicio/Reuniones. Se preservaron; `/ministerios/` sigue vigente con etiqueta **Reuniones**. Las 78 pruebas y capturas principales corresponden al estado inicial; la ruta actual se revisó aparte en siete anchos sin overflow. [Trazabilidad](evidencia/LEEME.md).

## Dictamen

La base aprobada sirve y debe conservarse. El sitio tiene una identidad editorial consistente y una arquitectura proporcionada a una iglesia local. El siguiente salto de calidad depende principalmente de completar ubicación, aprobaciones y descubrimiento, resolver dos fricciones de lectura/navegación y controlar el video inicial. No requiere CMS, backend, React ni reconstrucción.

**Objetivo mínimo útil:** que una persona identifique la congregación, encuentre un horario y llegue a su salón desde el celular. Horarios e identidad están resueltos; llegar todavía depende de una dirección sin pin habilitado.

## Estado comprobado

| Elemento | Estado real |
|---|---|
| Runtime | Node 24.15.0, npm 11.12.1; `engines.node >=22.12.0` |
| Framework | Astro **7.3.8**, salida estática; Vite mediante Astro |
| Estilos | Tailwind **4.3.3**, integración `@tailwindcss/vite`; CSS global editorial de 617 líneas |
| Tipos | TypeScript **5.9.3**, configuración estricta, `@astrojs/check 0.9.10` |
| Fuentes | Archivo y Bodoni Moda Variable **5.3.0**, alojadas localmente |
| Pruebas | Playwright **1.64.0**, axe Playwright **4.13.0**, un worker |
| Backend / DB / autenticación | No existen; no son necesarios para el alcance actual |
| Paquetes | Cinco dependencias directas de producción; todas tienen uso identificable |
| Dependencia extraneous | `@img/sharp-wasm32 0.35.5` en instalación local; no declarada directamente. No se eliminó |
| Entorno | `.env.example` documenta `SITE_URL`; archivos privados ignorados. No se copiaron sus valores |
| Publicación observable | `https://ccvs-sigma.vercel.app/`, seis rutas HTTP 200, con `noindex, nofollow` |
| Dominio definitivo | No confirmado; no se inventó canonical |

Fuentes: `package.json:1–28`, `astro.config.mjs:1–10`, `tsconfig.json:1–5`, `npm ls --depth=0`, `evidencia/publico.json`.

## Arquitectura y mantenibilidad

`src/data/` centraliza identidad, horarios, historia, doctrina y enlaces. `BaseLayout.astro` comparte metadata, JSON-LD, header/footer y ClientRouter. Los componentes presentan datos; `ui.ts`, `scroll-motion.ts` y `hero-video.ts` concentran interacciones sin framework cliente. Imágenes importadas se transforman con `astro:assets`.

Decisiones acertadas: SSG, semántica disponible sin JS, video con poster/fallback, enlaces externos HTTPS y `noopener noreferrer`, listeners cancelables, IntersectionObserver y requestAnimationFrame. No observé API insegura, formulario, carga de archivos, SQL ni sesiones que requieran añadir controles propios de un backend.

Deuda concreta:

- CSS creció mediante reglas sucesivas y sobrescrituras: `.home-schedule h2` en `global.css:282` y `:386`; estilos de `.sunday`/`.gatherings` en `:90–94`/`:89` sin uso en las páginas/componentes actuales. Verificar antes de retirarlos; no se midió cobertura CSS completa.
- Mucho markup y lógica compactados en una línea (`BaseLayout:20`, `nosotros:12`, `ui.ts:106–113`). Tipos correctos no equivalen a facilidad de revisión.
- Identidad/localización parcialmente repetida en schema (`BaseLayout:12`), visita (`visitanos:9`) y datos. Horarios se centralizan, pero domingo se repite literalmente en Visitarnos; riesgo futuro de divergencia.
- `README.md` y `DESPLIEGUE_VERCEL.md` describen pendientes anteriores: faltan fotos, Git sin commit y 72 pruebas. Hoy existen fotos/video, HEAD posterior y 78 pruebas. No usar esos documentos como inventario actual.
- El parche global a `document.startViewTransition` (`ui.ts:10–18`) consume AbortError y reporta otros errores. Funciona en Chromium probado; conviene aislar/documentar su motivo al mantenerlo, sin reemplazar el router.

## Rutas

| Ruta | Local y público | Observación |
|---|---|---|
| `/` | 200 | Hero audiovisual; información práctica debajo |
| `/nosotros/` | 200 | Historia, creencias y pertenencia institucional |
| `/ministerios/` | 200 | Cinco grupos con anclas; sin páginas individuales |
| `/visitanos/` | 200 | Horarios/dirección; Maps pendiente |
| `/links/` | 200 | Hub compacto, sin header/footer generales por diseño |
| `/terminos-y-condiciones/` | 200 | Borrador explícito, sin aprobación final |
| `/robots.txt` público | 200 | `Disallow: /` |
| `/sitemap.xml` público | 404 | No generado sin SITE_URL |
| Ruta inexistente pública | 404 | Página genérica del hosting |

`/visitanos` termina en `/visitanos/`; el registro inicial no conserva el código intermedio de esa redirección. No se detectó duplicación servida en ambas variantes durante la prueba.

## Puntuación diagnóstica

**72/100 provisional; banda de incertidumbre 68–78.** Es una escala interna de preparación institucional, no Lighthouse ni certificación. Los puntos descontados por indexabilidad reflejan preparación para lanzamiento; mantener el prototipo bloqueado sigue siendo correcto mientras no se apruebe.

| Área | Nota / peso | Fundamento | Potencial tras prioridades |
|---|---:|---|---:|
| UX/UI y mobile | 16/20 | Identidad, responsive y navegación funcionales; falta acceso práctico inmediato en móvil, mapa y CTA juvenil contextual | 18–19 |
| SEO técnico y local | 8/20 | HTML/títulos sólidos; bloqueo intencional, sin canonical/sitemap/dominio ni ficha local verificada | 16–18 |
| Rendimiento | 11/15 | JS pequeño e imágenes WebP; video pesado y laboratorio móvil por mejorar; sin campo | 13–14 |
| Accesibilidad | 13/15 | Teclado, axe y reduced motion pasan; solapamiento visual y lector de pantalla pendiente | 14 |
| GEO y claridad semántica | 8/10 | Respuestas reales en HTML y Church; primera visita y relación de entidades mejorables | 9 |
| Contenido institucional | 7/10 | Horarios y fe claros; precisión histórica, legal y aprobaciones pendientes | 9 |
| Arquitectura y mantenibilidad | 9/10 | Stack mínimo, datos/tipos/ciclo de vida sólidos; cascada CSS/documentos obsoletos | 9–10 |
| **Total** | **72/100** | Confianza mayor en código/Chromium que en campo/Maps/Safari | **88–93 orientativo** |

Rúbrica: cada área parte de sus requisitos aplicables, y descuenta carencias observadas o aprobación/verificación esencial pendiente. UX pierde cuatro puntos por recorridos y lectura; SEO doce por lanzamiento/identidad local; rendimiento cuatro por medios y falta de evidencia real; accesibilidad dos por lectura y cobertura manual; GEO dos por respuestas prácticas/entidades; contenido tres por exactitud/aprobación; arquitectura uno por mantenimiento. No se penalizan donaciones, streaming, blog, login o funciones innecesarias. El potencial es una reevaluación posible de esta rúbrica, no una promesa de tráfico o de métricas.

## Validación y límites

- `npm run check`: **48 archivos, cero errores, warnings o hints**.
- `npm run build`: **seis páginas**, 62 derivados optimizados de imágenes.
- `npm run verify:static`: **177 enlaces internos/anclas y 58 recursos** válidos.
- `npm run test:e2e`: **78 aprobadas**, cero fallos, omitidas o flaky; 105 s.
- Auditoría nueva: **42 combinaciones ruta/ancho**, sin overflow ni errores JS; doce análisis axe, cero infracciones reportadas. Esto no acredita conformidad WCAG completa.
- `npm audit`: cero vulnerabilidades conocidas en ese momento; no constituye una auditoría de seguridad exhaustiva.
- No existe script lint. No se instaló uno para esta auditoría.
- Lighthouse no estaba instalado en el proyecto ni disponible en PATH/cachés inspeccionadas. Se midió con Chromium/CDP; detalle y límites en `06_PERFORMANCE_ACCESIBILIDAD.md`.

Evidencias: [rutas](evidencia/rutas.json), [pruebas](evidencia/playwright.json), [dependencias](evidencia/npm-audit.json), [público](evidencia/publico.json), [capturas](evidencia/capturas/).

## Reutilizar frente a construir

**REUSE:** Astro ClientRouter, `astro:assets`, Fontsource, Playwright/axe y APIs nativas existentes. **ADAPT:** metadata, CSS y textos actuales mediante cambios puntuales posteriores. **INTEGRATE, después de aprobación:** Maps validado y Search Console; analítica opcional. **BUILD:** solo el contenido local original y una FAQ breve aprobada. Para cinco URLs indexables el sitemap manual existente es suficiente; no hace falta incorporar `@astrojs/sitemap` por obligación.

No se recomienda nueva librería ni repositorio externo. Se evita introducir coste, mantenimiento y dependencia de proveedor sin necesidad.
