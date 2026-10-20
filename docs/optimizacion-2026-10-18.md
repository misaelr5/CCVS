# Optimización de CCVS — 18 de octubre de 2026

Base: `7075347`. Cambios locales, sin commit, push ni despliegue. Vista compilada: http://127.0.0.1:4324/ mientras el preview siga activo.

## Implementado

- Historia: el período de «Un terreno para la comunidad» ahora dice **2007**, según la confirmación del usuario. Se conserva el relato y la nota sobre la fecha exacta y terminación del salón.
- Portada: CTA **Planificá tu visita**, conservando el enlace **Conocé nuestra fe**. Debajo, accesos a la reunión general (domingo 20:30), ubicación y videos del canal oficial. No se presenta el canal de videos como una transmisión en vivo confirmada.
- Imágenes: variantes WebP de 240 px para espacios pequeños y `sizes="auto, …"` en imágenes lazy. El navegador puede elegir según el espacio real del collage; el fallback conserva compatibilidad. Imágenes principales con carga prioritaria, dimensiones y texto alternativo.
- Multimedia: la imagen responsive existente funciona como portada del video; se elimina una segunda descarga fija mediante `video.poster`. Se conservan los archivos completos, sonido, reproducción manual, pausa al salir de pantalla y limpieza al navegar.
- Autoplay: espera la decodificación de la imagen, las fuentes y una oportunidad de pintado. En ahorro de datos o 2G informado por el navegador, la reproducción es manual, como ya sucedía con reduced motion. En navegadores sin Network Information API se conserva el comportamiento habitual.
- Tipografía: precarga de los dos archivos latinos de las fuentes ya instaladas. No se cambiaron las familias, los colores ni el logo.
- SEO: se conserva metadata por página, tarjetas Open Graph/Twitter y marcado `Church`; se añaden nombre abreviado, descripción, mapa y los perfiles generales confirmados de Facebook/YouTube. Instagram juvenil no se identifica como la entidad completa. No se inventan horarios de cierre, teléfono, correo, coordenadas nuevas ni eventos.
- Mapa: `IntersectionObserver` carga el iframe a 200 px de su sección. `loading="lazy"` por sí solo adelantaba la carga de Google Maps durante la primera pantalla. Se conservan enlace directo, título accesible, política de referrer y fallback sin JavaScript.

## Conservación y arquitectura

**ADAPTAR** los componentes y datos existentes; **REUTILIZAR** Astro Assets, ClientRouter, HTML nativo, IntersectionObserver, Fontsource y las herramientas de QA instaladas. Sin nuevas dependencias de producción o desarrollo, backend, analítica ni servicios de contacto ficticios.

El nuevo componente `VisitQuickLinks` lee horarios y enlaces de las fuentes actuales. Los estilos de los accesos y CTA están encapsulados en sus componentes Astro; `global.css` queda intacto. Astro continúa generando HTML estático y minificando CSS/JS.

Se comparó el texto de `main` y todos sus enlaces en las ocho rutas contra una captura del build después de corregir 2007 y antes de optimizar. Descontando únicamente las adiciones nuevas y el fallback técnico de Maps, se conserva el texto exacto normalizado y la lista original de enlaces. No se modificaron archivos multimedia, horarios, doctrina, ministerios, contactos, privacidad ni términos.

No existen formulario de contacto/oración, backend de envío, módulo de donaciones ni agenda con fechas concretas confirmadas. Se conservan los encuentros programados y sus canales de anuncios. Por tanto, no se declara probado ningún envío de formulario, cobro o transmisión en vivo.

## Rendimiento medido

Lighthouse **13.5.0**, Chromium de Playwright, build local en 4324, perfiles móvil simulado y escritorio, procesos independientes y auditorías secuenciales. Se reutilizó una instalación de Lighthouse en la caché de npm; no cambió `package.json` ni el lockfile. Cada fila representa una corrida, no una media ni datos de campo.

| Página / perfil | Rendimiento | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: |
| Inicio móvil, antes | 85 | 3,7 s | 0,001 | 170 ms |
| Inicio móvil, optimizado | 95 | 2,8 s | 0 | 50 ms |
| Inicio escritorio, optimizado | 86 | 0,6 s | 0,001 | 320 ms |
| Visitarnos móvil, con lazy nativo | 72 | 5,4 s | 0 | 0 ms |
| Visitarnos móvil, mapa diferido | 88 | 2,6 s | 0 | 390 ms |

En las auditorías finales, accesibilidad y buenas prácticas: **100**. SEO: **66**, con el bloqueo de indexación existente. La mejora de carga inicial de Visitarnos fue de **733 a 270 KiB** en estas corridas. Los bytes de video descargados durante una auditoría dependen de su duración; no representan el peso completo del archivo.

La medición de Visitarnos de 5,4 s se reprodujo antes de corregir Maps. Una prueba con una entrada más breve del H1 no mejoró ese resultado y se descartó: se conserva la animación original. Se guardan todas las corridas, incluidas las desfavorables, en `qa-artifacts/optimization/`.

**Límites:** los LCP móviles de 2,8/2,6 s todavía superan la referencia de 2,5 s. TBT no es INP; no se midió INP de visitantes reales. El resultado local no garantiza Core Web Vitals en producción ni conformidad WCAG completa. Las auditorías automáticas se complementaron con capturas y uso por teclado; Safari/iOS físico y lectores de pantalla no se probaron.

## Archivos

| Archivos modificados o creados | Finalidad |
| --- | --- |
| `src/data/history.ts` | Año 2007. |
| `src/components/EditorialHero.astro` | CTA y estilos locales. |
| `src/components/VisitQuickLinks.astro` (nuevo) | Accesos y estilos locales. |
| `src/pages/index.astro` | Incorporación de accesos. |
| `src/components/PhotoSection.astro` | Selección responsive y variante pequeña. |
| `src/components/HeroVideo.astro`, `src/pages/nosotros.astro` | Evitar poster duplicado conservando la imagen visible. |
| `src/layouts/BaseLayout.astro` | Precarga de fuentes y ampliación de Church. |
| `src/scripts/hero-video.ts` | Prioridad de carga y preferencias de datos. |
| `src/scripts/ui.ts`, `src/pages/visitanos.astro` | Ciclo de vida del mapa y fallback; entrada del grupo de CTA. |
| `scripts/verify-build.mjs` | Verificación de archivos de video sin exigir poster duplicado. |
| `tests/optimization.spec.ts` (nuevo) | Primera visita, año, schema, carga multimedia y Maps. |
| `tests/hero-video.spec.ts`, `tests/phase4.spec.ts` | Seleccionar el enlace de fe por su nombre al existir dos CTA. |
| Este informe | Entrega y límites verificables. |

## Validación

- Build: ocho páginas estáticas; enlaces internos, anclas, metadata, imágenes y recursos verificados con `verify:static`.
- Matriz responsive: 360, 375, 390, 430, 768, 1024 y 1440 px, ocho rutas. Axe en móvil y escritorio; navegación, forward/back, teclado, Escape, acordeones, sin JavaScript, reduced motion y video.
- Auditoría de dependencias: `npm audit --omit=dev`, cero vulnerabilidades reportadas. No incluye las dependencias exclusivas de desarrollo.
- Capturas iniciales y completas a 390×844 y 1440×900. Para capturas largas, el script fuerza únicamente el pintado de imágenes fuera de pantalla en el navegador de QA; no altera CSS de producción.
- Evidencias completas locales: `qa-artifacts/optimization/` (ignoradas por Git). Incluyen comparación de contenido, capturas, Lighthouse JSON, auditoría npm, logs y resultados E2E.
- No existe script de lint independiente; no se declara ejecutado.

## Pendientes y siguiente paso

El sitio conserva `publicationApproved: false`, `noindex, nofollow` y `Disallow: /`. El dominio definitivo y la aprobación institucional de contenido/términos siguen pendientes según la configuración real. No se cambia ese estado ni se despliega como parte de esta entrega.

El siguiente paso es revisar la vista local, confirmar dominio/aprobación institucional y autorizar la publicación. Al preparar el lanzamiento habrá que coordinar canonical, sitemap, robots, verificaciones que hoy esperan modo de revisión y comprobación pública del deployment. Después, medir rendimiento real en ese origen y dispositivos físicos.

## Conceptos para aprender y referencias

1. **Prioridad de carga:** una imagen principal necesita llegar pronto; el video y los recursos inferiores pueden esperar. Aplicar lazy a todo puede empeorar LCP. [Guía de web.dev](https://web.dev/articles/browser-level-image-lazy-loading).
2. **Mejora progresiva:** los enlaces y el fallback de mapa funcionan sin depender del JavaScript que optimiza la experiencia. `sizes="auto"` tiene un fallback explícito. [Referencia de img en MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img), [preferencia saveData](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData).
3. **Datos estructurados fieles:** Church describe información existente; no justifica inventar servicios, horarios o identidad social. [Schema.org Church](https://schema.org/Church).
