# Auditoría SEO + GEO de Comunidad Cristiana Villa Sarmiento

**Fecha:** 16 de octubre de 2026 · America/Montevideo.
**Código de referencia:** `9c0c616495bd88297d94bb791c20d30df1c326df`.
**Sitio público consultado:** [CCVS en Vercel](https://ccvs-sigma.vercel.app/).
**Alcance:** diagnóstico y plan. No se implementaron recomendaciones ni se modificaron archivos de producción; no se ejecutaron commit, push o deploy.

## A. Diagnóstico ejecutivo

CCVS tiene una base adecuada para una iglesia local: HTML estático, identidad reconocible, fotografías propias, creencias legibles sin JavaScript y horarios centralizados. El sitio público ya muestra **domingo 20:30**, la política de privacidad y el nuevo mapa. La ficha de Google Maps consultada identifica el nombre de la iglesia y la dirección de Villa Sarmiento, Córdoba.

**La web todavía funciona como una versión de revisión, no como un sitio preparado para descubrimiento orgánico general.** Las ocho páginas responden 200, pero todas publican `noindex, nofollow`; `robots.txt` contiene `Disallow: /`; no hay canonical y `/sitemap.xml` devuelve 404. El bloqueo es deliberado según el código y la documentación. Esta auditoría no autoriza levantarlo sin la aprobación institucional prevista.

Después de resolver la publicación, las prioridades son mejorar el peso y la estabilidad del arranque móvil, corregir un enlace legal que depende solo del color, precisar la identificación del canal juvenil y completar información práctica de primera visita. No hace falta reconstruir el sitio, incorporar un CMS ni añadir herramientas especiales para IA.

### Puntuaciones y cálculo

Son **puntuaciones de preparación definidas para esta auditoría**, no puntuaciones de Google, probabilidades de ranking, certificaciones WCAG ni resultados Lighthouse. Cada dimensión tiene cinco controles de 20 puntos: **20 = cubierto**, **10 = parcial**, **0 = ausente o bloqueado**. Los puntos y los controles se explicitan para que otra revisión pueda discutirlos o recalcularlos. Las mediciones de campo y accesos a cuentas que no se obtuvieron se señalan aparte; no se presentan como fallas observadas.

| Dimensión | Puntuación | Cinco controles y puntos otorgados |
| --- | ---: | --- |
| SEO técnico | **50/100** | Rastreo/indexación 0; canonical/duplicados 0; HTTP, SSG y enlaces 20; metadata y presentación al compartir 10; estructura HTML y schema básico válido 20. |
| SEO local | **70/100** | Nombre/dirección 20; horarios/mapa 20; primera visita/contacto contextual 10; entidad local estructurada 10; correspondencia y gestión verificable de ficha/perfiles 10. |
| GEO/AEO | **50/100** | Acceso a rastreadores de búsqueda 0; respuestas prácticas completas 10; extracción desde HTML/semántica 20; atribución y entidad persistente 10; profundidad/procedencia y mantenimiento editorial 10. |
| Rendimiento | **70/100** | LCP móvil consistente con objetivo 10; estabilidad visual de laboratorio 20; JS, compresión y caché de bundles 20; presupuesto de medios e imágenes 10; arranque audiovisual y variabilidad de tareas 10. |
| Accesibilidad | **80/100** | Landmarks, encabezados y alternativas de imágenes 20; teclado y controles probados 20; responsive y contenido sin JS 20; diferenciación de enlaces/contraste 10; movimiento y alternativas audiovisuales 10. |
| Contenido y semántica | **70/100** | Identidad y orientación cristocéntrica 20; horarios/dirección explícitos 20; historia y aprobación editorial 10; explicación de creencias 10; detalle de actividades y coherencia de CTA 10. |

Las notas no se promedian en una cifra global: una buena nota de accesibilidad no compensa el bloqueo de indexación. La confianza es alta para HTTP, HTML, archivos y resultados automatizados; menor para experiencia física, pronunciación con lectores de pantalla, propiedad de perfiles y rendimiento de usuarios reales.

### Decisiones prioritarias

1. **Acordar el lanzamiento indexable:** dominio canónico, aprobación institucional y comportamiento por entorno.
2. Preparar juntos canonical, sitemap, robots, metadata y verificaciones de publicación. Cambiar solo `publicationApproved` hoy haría fallar el chequeo usado por Vercel.
3. Revisar el video móvil de 8,44 MB y el LCP móvil variable, preservando fotografía, calidad visual y controles.
4. Corregir diferenciación del enlace de privacidad y recuperar etiquetas precisas para el Instagram juvenil.
5. Confirmar información de primera visita, actividades e historia; verificar y completar la ficha local desde la cuenta responsable.

**P0:** no se confirmó una caída general, exposición de secretos o incidente equivalente. Los bloqueos de lanzamiento se clasifican P1; no se los interpreta como una orden de publicar durante esta auditoría.

## Alcance, método y evidencias

Se inspeccionaron las ocho páginas, el layout compartido, los 18 componentes, los siete archivos de datos, los tres scripts de navegador, CSS global, configuración Astro/TypeScript/Vercel, scripts de preparación/verificación, seis archivos de pruebas y documentación de fases anteriores. El inventario de hashes cubre 116 archivos versionados de código, recursos y configuración. Se revisaron los medios importados y sus derivados; no se presume revisión visual ni aprobación de cada original que está almacenado pero no se utiliza.

La aplicación es **Astro SSG + TypeScript estricto + Tailwind 4**, sin backend, base de datos, autenticación o formularios propios. Los endpoints de robots/sitemap forman parte del build estático. El `index.php` de la raíz está vacío y no determina la arquitectura desplegada. No se imprimieron valores de credenciales o archivos de entorno privados.

| Evidencia | Resultado / ubicación |
| --- | --- |
| Typecheck | `npm run check`: 72 archivos, 0 errores, 0 advertencias y 0 hints. |
| Build | `npm run build`: 8 páginas, 91 derivados de imagen procesados o reutilizados. |
| Enlaces y recursos locales | `npm run verify:static`: 8 rutas, **212 enlaces internos/anclas y 87 recursos** válidos. No valida la disponibilidad de toda plataforma externa. |
| Matriz responsive | **56 combinaciones**: 8 rutas × 360/375/390/430/768/1024/1440 px. Sin overflow horizontal, textos fuera de ancho ni eventos `pageerror`. |
| Sin JavaScript | 8 rutas comprobadas; navegación alternativa disponible en páginas con header; cinco paneles doctrinales abiertos en HTML. Links conserva sus enlaces nativos. |
| Axe | 16 análisis a 390/1440, tags WCAG 2 A/AA, 2.1 A/AA y 2.2 AA: una regla con infracción en Privacidad, repetida en los dos anchos. Hay resultados `incomplete`. |
| Suite existente | **84 aprobadas, 6 fallidas, 0 omitidas y 0 flaky**, de 90 pruebas; duración 136,95 s. Las fallas se explican en B-18. |
| Publicación | GET públicos de las 8 páginas, robots, sitemap, variantes y 404; DOM público para metadata, Church, horario, foto de creencias y mapa. |
| Rendimiento | 6 ejecuciones reales de Lighthouse CLI 13.5.0 contra el alias público: tres de Inicio móvil, una de Inicio desktop y una por perfil de Horarios. |
| Dependencias | `npm audit`: 0 vulnerabilidades conocidas informadas en ese momento; no equivale a una auditoría completa de seguridad. |

Se reutilizó el preview que respondía en `127.0.0.1:4323`; el puerto 4322 no respondió a la prueba de conexión. La suite se ejecutó con una configuración de auditoría que cambia solo el servidor base, sin detener el preview ni editar las pruebas de producción.

Los tamaños de archivos y la matriz DOM corresponden al **build local**. Lighthouse y los headers corresponden al **alias público**. Coinciden los datos y elementos funcionales comprobados, pero eso no acredita identidad binaria de todo el deployment con HEAD. Los hashes de CSS de dos builds pueden diferir: nunca se clasificó como enlace roto una URL de bundle local que el HTML público no utilizaba.

### Archivos de evidencia

- [Inventario y hashes](auditoria-seo-geo-evidencia/manifest.json).
- [Rutas, DOM, imágenes, axe y contenido sin JS](auditoria-seo-geo-evidencia/rutas.json).
- [HTTP, redirecciones, robots, sitemap, enlaces externos y headers](auditoria-seo-geo-evidencia/publico.json).
- [Tamaños de recursos](auditoria-seo-geo-evidencia/assets.json).
- [Resumen Lighthouse con configuración, métricas y hashes de los reportes completos](auditoria-seo-geo-evidencia/lighthouse-resumen.json).
- [Suite completa](auditoria-seo-geo-evidencia/e2e.json) y [resumen de fallas](auditoria-seo-geo-evidencia/e2e-resumen.json).
- [Benchmark y ficha pública](auditoria-seo-geo-evidencia/benchmark.json), [comprobación de mapa y enlace legal](auditoria-seo-geo-evidencia/runtime.json), [dependencias](auditoria-seo-geo-evidencia/dependencias.json) y [comprobación final de integridad](auditoria-seo-geo-evidencia/validacion-final.json).

Capturas y JSON Lighthouse completos quedan localmente en `qa-artifacts/seo-geo-20261016/`, ignorados por Git. No se incorporan capturas de otras iglesias como activos del sitio. Scripts de reproducción: `auditar.mjs`, `benchmark.mjs`, `resumir.mjs` y `playwright.config.mjs` dentro de la carpeta de evidencia. La lista permitida de `.vercelignore` excluye `docs/` del envío directo por CLI; no se modificó esa configuración.

## SEO técnico: estado de las ocho rutas

Todas tienen título y descripción individuales, un H1, `lang="es-AR"`, viewport, Church + PostalAddress y contenido renderizado en servidor. No se encontraron títulos o descripciones duplicados entre ellas. **Ninguna tiene canonical, `og:url`, `og:image`, Twitter Card o favicon declarado.** Las longitudes se registran como diagnóstico editorial, no como límites obligatorios de Google.

| Ruta | Título completo recibido | Caracteres título / descripción | Evaluación |
| --- | --- | ---: | --- |
| `/` | Jesucristo, el camino al Padre \| Comunidad Cristiana Villa Sarmiento | 68 / 140 | Fiel al mensaje; le falta Córdoba en la identificación de búsqueda. No requiere sustituir el H1 cristocéntrico. |
| `/nosotros/` | Nuestra historia \| Comunidad Cristiana Villa Sarmiento | 54 / 99 | Específico; descripción puede anticipar el origen local sin inventar hitos. |
| `/lo-que-creemos/` | Lo que creemos \| Comunidad Cristiana Villa Sarmiento | 52 / 139 | Buena correspondencia con intención y contenido. |
| `/ministerios/` | Reuniones \| Comunidad Cristiana Villa Sarmiento | 47 / 143 | Ruta semántica válida aunque la etiqueta haya cambiado. No migrarla solo para igualar el menú. |
| `/visitanos/` | Vení a una reunión \| Comunidad Cristiana Villa Sarmiento | 56 / 114 | Puede expresar mejor “Horarios y cómo llegar”, conservando la URL y la portada. |
| `/links/` | Enlaces de la congregación \| Comunidad Cristiana Villa Sarmiento | 64 / 96 | Hub útil; su brevedad no es por sí sola contenido de baja calidad. |
| `/terminos-y-condiciones/` | Términos y condiciones — borrador \| Comunidad Cristiana Villa Sarmiento | 71 / 125 | El estado de borrador debe resolverse institucionalmente, no esconderse para mejorar una nota. |
| `/politica-de-privacidad/` | Política de privacidad \| Comunidad Cristiana Villa Sarmiento | 60 / 131 | Contenido incorporado y enlazado en footer; incidencia de enlace descrita abajo. |

### HTTP, duplicados y rastreo

- Ocho rutas válidas: 200. URL de prueba inexistente: **404 real**, sin soft-404 observado.
- `http://ccvs-sigma.vercel.app/` → **308** → HTTPS 200. `/visitanos` → **308** → `/visitanos/` 200. `trailingSlash: true` funciona en la muestra.
- `/index.html` devuelve 200 con el **mismo SHA-256 del HTML que `/`**. Una URL con UTM también devuelve el mismo contenido. Son variantes a consolidar mediante canonical; `/index.html` puede redirigirse al inicio.
- `/horarios/` y `/historia/` devuelven 404. Los enlaces internos actuales usan `/visitanos/` y `/nosotros/#historia`; no se hallaron enlaces internos rotos a aquellas variantes. No corresponde crear redirecciones masivas sin comprobar URLs antiguas, backlinks o registros.
- `/robots.txt`: 200 con `User-agent: *` y `Disallow: /`, sin referencia a sitemap. `/sitemap.xml` y `/sitemap-index.xml`: 404.
- HTTPS fue accesible sin errores de certificado; HSTS, `nosniff`, política de referrer y SAMEORIGIN se observaron en respuestas públicas. Solo se auditó el alias facilitado: no se verificó propiedad de un dominio personalizado ni configuración privada de DNS/Vercel.
- Instagram, Facebook y YouTube suministrados respondieron 200 en las peticiones. Esto no prueba administración de las cuentas, disponibilidad para todas las regiones o acceso al contenido sin restricciones de las plataformas.

**Rastrear e indexar son distintos:** `robots.txt` impide la descarga y puede impedir que Google lea un `noindex`. Una URL bloqueada podría aparecer referenciada por terceros. Para exclusión efectiva de un contenido ya conocido, Google debe poder leer el `noindex`, o debe existir un control de acceso cuando el material sea privado. [Documentación de Google sobre noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## B. Problemas detectados y recomendaciones

**Severidad:** P1 = bloqueo de lanzamiento o prioridad alta; P2 = corrección relevante; P3 = mejora menor. **Complejidad estimada:** XS = hasta una hora; S = 1–3 horas; M = medio día a un día; E = depende de datos/aprobaciones o acceso externo. Son órdenes de magnitud, no presupuestos ni plazos garantizados.

| ID / prioridad | Archivo y línea | Evidencia verificable | Impacto esperado | Solución recomendada | Complejidad |
| --- | --- | --- | --- | --- | --- |
| **B-01 · P1** Indexación cerrada | `src/data/site.ts:154`; `src/layouts/BaseLayout.astro:20`; `src/pages/robots.txt.ts:3` | Bandera false; ocho noindex/nofollow y robots público Disallow. | Impide el descubrimiento orgánico normal y limita elegibilidad en búsquedas con IA. | Mantener revisión cerrada hasta aprobación; después coordinar flags por entorno y permitir las rutas públicas aprobadas. No cambiar ahora. | S + E |
| **B-02 · P1** Identidad URL y duplicados sin consolidar | `astro.config.mjs:4–6`; `src/layouts/BaseLayout.astro:11,20` | No canonical/og:url en ocho rutas. `/index.html` y `/` tienen HTML idéntico; UTM sin canonical limpio. | Señales repartidas entre variantes; atribución de fuente oficial menos precisa. No es una penalización automática. | Aprobar origen canónico, configurar `SITE_URL`, canonical autorreferente sin parámetros y redirección de `/index.html`. Verificar variantes reales del dominio elegido. [Guía](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). | S + E |
| **B-03 · P1** Sitemap ausente y generación frágil | `src/pages/[sitemap].xml.ts:3–8`; `src/data/links.ts:2`; `src/pages/robots.txt.ts:3` | Sitemap 404; generación depende de `import.meta.env.SITE_URL`, mientras Astro.site depende de `process.env.SITE_URL`. La lista futura incluye seis rutas y no consulta aprobación/indexabilidad por página. | Menor facilidad de descubrimiento y riesgo de discrepancias entre entornos/listas. No es el único requisito de indexación. | Unificar origen validado y lista de rutas canónicas indexables; decidir explícitamente tratamiento de legales y Links; anunciar el sitemap en robots solo para publicación aprobada. Probar XML real. [Guía](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). | S |
| **B-04 · P1** Verificación bloquea un lanzamiento indexable | `scripts/verify-build.mjs:21,88`; `tests/site.spec.ts:51`; `vercel.json:4` | El build de Vercel ejecuta un script que exige noindex y Disallow incondicionalmente. Cambiar la bandera a true hace incompatible la salida con esas aserciones. | Un lanzamiento correctamente indexable no superaría el control actual. | Probar dos modos explícitos: revisión y producción aprobada. En producción exigir canonical/origen y sitemap coherentes; en revisión exigir exclusión. Mantener protección contra publicación accidental. | S |
| **B-05 · P2** Metadata local mejorable | `src/pages/index.astro:23`; `src/pages/visitanos.astro:14`; `src/layouts/BaseLayout.astro:20` | Marca individual clara, pero Córdoba ausente en títulos; visita no nombra horarios en el title. Hay homónimos de Villa Sarmiento en resultados exploratorios. | Menor precisión para búsquedas locales y expectativas del snippet. | Proponer title final de Inicio “Comunidad Cristiana Villa Sarmiento, Córdoba” y de visita “Horarios y cómo llegar” con marca; evitar duplicar la marca al usar el layout. Añadir provincia naturalmente en descripción/introducción, conservando H1. | XS + aprobación editorial |
| **B-06 · P2** Compartir sin imagen ni tarjeta explícita | `src/layouts/BaseLayout.astro:20` | Hay og:title/description/type/locale/site_name; faltan og:image, sus dimensiones/alt y Twitter Card. | Vistas previas incompletas o elegidas arbitrariamente. No demuestra pérdida de ranking. | Imagen institucional autorizada con URL absoluta del origen aprobado y tarjeta social coherente; no reemplazar ni recolorear el logo madre. | S + activo aprobado |
| **B-07 · P3** Favicon ausente y logo sin variante de alta densidad | `src/layouts/BaseLayout.astro:20`; `src/components/SiteHeader.astro:8` | `/favicon.ico` 404 en HTTP y Lighthouse. Logo de 58×58 para ancho móvil 46 px; Lighthouse advierte resolución en DPR alto. | Identificación visual incompleta y nitidez menor en ciertos dispositivos. | Derivar favicon e iconos autorizados del logo madre; declarar sus enlaces. Generar 1×/2× para header sin cambiar aspecto. | S |
| **B-08 · P2** Church correcto pero entidad incompleta | `src/layouts/BaseLayout.astro:12`; `src/data/links.ts:8–15`; `src/data/site.ts:50–54` | Church/PostalAddress parsean correctamente en las ocho páginas; no tienen @id, URL estable, geo, hasMap, imagen o vínculos institucionales. Pin verificado ya disponible. | Menor desambiguación de la fuente y del lugar; no invalida el schema actual. | Con origen aprobado, identificar un Church persistente, añadir geo/hasMap del pin y referencias autorizadas. Diferenciar lugar y organización cuando sea útil; no sumar tipos redundantes por cantidad. | S + E |
| **B-09 · P2** `sizes` genérico para geometrías distintas | `src/components/PhotoSection.astro:11`; `src/pages/nosotros.astro:17`; `src/components/FaithIllustration.astro:11` | `100vw/60vw` se usa para collage, galería y banner. Lighthouse estima ~329 KiB de ahorro de imágenes en una muestra móvil de Inicio. | Descargas sobredimensionadas o selección de recursos poco ajustada al DPR/recorte. | Permitir `sizes` por uso, revisar con rendered/currentSrc y DPR 1/2/3; conservar WebP, dimensiones y lazy. Evaluar AVIF solo si mejora bytes/calidad en comparación visual. Las estimaciones de Lighthouse no son ahorros realizados. | M |
| **B-10 · P1** Presupuesto del video de portada | `src/components/HeroVideo.astro:7–8`; `src/scripts/hero-video.ts:25–36,73`; `scripts/prepare-hero-video.ps1:12–18` | MP4 móvil 8.441.049 B y desktop 14.839.646 B. Inicio móvil transfirió 4,47–4,64 MB en Lighthouse; el video dominó el payload. `preload=none` no impide descarga cuando JS llama play. | Consumo de datos y competencia por red/decodificación, especialmente en móviles. No se atribuye toda la demora LCP al video. | Pilotear poster inicial con reproducción voluntaria o diferida en móvil, o loop real más corto/optimizado. Comparar nitidez, recorte y bytes; conservar pausa, sonido y fallback. No añadir streaming ni librerías. | M + aprobación visual |
| **B-11 · P2** LCP y trabajo de arranque variables | `src/scripts/ui.ts:135–153`; `src/layouts/BaseLayout.astro:8,20`; `src/pages/visitanos.astro:18` | Inicio móvil LCP 2,13–2,90 s; mediana 2,75 s. TBT 0/0/854 ms; una tarea de ~1,52 s no atribuible en la tercera muestra. Horarios móvil LCP 2,88 s. | El buen resultado de una ejecución no es estable ni acredita experiencia real de interacción. | Perfilar navegación/entradas, CSS/fuentes y tareas largas. A/B técnico local de arranque manteniendo el diseño; repetir en dispositivo físico y misma configuración. No eliminar ClientRouter por una única traza. | M |
| **B-12 · P3** Medios con nombres estables y revalidación | `src/components/HeroVideo.astro:8`; `src/pages/nosotros.astro:18`; `vercel.json:8–17` | Bundles con hash: immutable 1 año. MP4 estable: `max-age=0, must-revalidate`, aunque responde edge HIT y admite rangos. | Revalidaciones repetidas; cambiar el archivo bajo igual URL complicaría una caché larga. | Versionar medios antes de fijar caché prolongada; conservar range requests y validar actualización efectiva. No aplicar immutable anual a un MP4 que se reemplaza con igual nombre. | S |
| **B-13 · P2** Enlace de privacidad depende solo del color | `src/pages/politica-de-privacidad.astro:40`; `src/styles/global.css:333` | Axe `link-in-text-block` en 390/1440. Estilo computado: decoration none, enlace #631918 y texto #111; contraste entre ambos 1,51:1. | Dificulta reconocer el contacto como enlace. Es una infracción automática concreta, no una preferencia visual. | Subrayado persistente u otra diferenciación suficiente sin depender solo del color; mantener foco visible. Repetir axe sobre política. | XS |
| **B-14 · P2** Nombres accesibles: señal pendiente de revisión | `src/components/Schedule.astro:6`; `src/components/SiteHeader.astro:8` | Lighthouse señala `label-content-name-mismatch`, incluido horario cuyo aria-label omite “Conocé la actividad”. No apareció como infracción en la matriz axe con los tags usados. | Posible discrepancia para control por voz/tecnologías asistivas. No se declara incumplimiento definitivo solo por esta discrepancia entre herramientas. | Revisar nombre computado y WCAG 2.5.3 manualmente; preferir texto nativo o aria-label que contenga la etiqueta visible. Mantener día/hora. | S |
| **B-15 · P2** Canal juvenil presentado como Instagram general | `src/data/links.ts:13`; `src/components/SocialLinks.astro:8`; `src/pages/links.astro:12` | URL `jovenesccvs` rotulada “Instagram” en menú, footer y hub. No hay enlace contextual al canal en el bloque de Jóvenes. | Confusión de entidad/canal y pérdida de contexto para visitantes. | Rotular como Instagram de Jóvenes y enlazarlo en Jóvenes si lo ratifica la iglesia. No usarlo automáticamente como sameAs de la institución completa. | XS + confirmación |
| **B-16 · P2** Primera visita todavía incompleta | `src/pages/visitanos.astro:46`; `src/data/links.ts:11–15` | Dirección, horas, Maps y canales existen; el párrafo de primera visita es genérico. No informa logística confirmada. | Respuestas parciales a dudas que pueden decidir una visita y consultas con IA. | Reunir cuatro o cinco preguntas frecuentes reales, con respuestas aprobadas. Publicar solo datos confirmados; no suponer inscripción, duración, accesibilidad física, estacionamiento o edades. | S + E |
| **B-17 · P2** Actividades declaradas no renderizadas | `src/data/ministries.ts:22–23`; `src/components/ProgrammedMeetings.astro:14–21` | `activities` contiene ropero, merendero/ayuda social y evangelismo, pero el componente nunca renderiza el array. Ropero/Merendero no aparecen en ningún HTML generado. | Personas y crawlers no pueden conocer esas acciones concretas desde la web. | Confirmar vigencia y mostrar una lista breve o explicación en Servicio. No crear páginas ni un calendario con fechas inventadas. | XS–S + E |
| **B-18 · P2** Suite desalineada y privacidad sin cobertura habitual | `tests/phase4-2.spec.ts:25,62`; `tests/phase4.spec.ts:71`; `tests/site.spec.ts:4,15` | Cinco fallas esperan etiquetas anteriores; una busca `.schedule h3` aunque las nuevas tarjetas usan strong. Las listas habituales de E2E omiten Privacidad: por eso no captan B-13. | Falsa sensación de cierre y menos protección de nuevas rutas. | Resolver primero intención de etiquetas; actualizar pruebas hacia comportamiento/roles pertinentes, incluir privacidad y contrastar inventario de rutas. No cambiar expectativas solo para ocultar una regresión real. | S |
| **B-19 · P2** Profundidad doctrinal y procedencia histórica pendientes | `src/data/beliefs.ts:3–9`; `src/data/history.ts:4–7`; `src/data/site.ts:156–164` | Cinco resúmenes breves; varios repiten su título. Historia expone fecha desconocida y vínculo entre reconocimiento pastoral/autonomía en 2015 sin documentación adicional en el repo. | Menor claridad y atribución institucional; posibilidad de que terceros interpreten una formulación provisional como definitiva. | Revisión pastoral/histórica. Agregar explicaciones breves y referencias bíblicas aprobadas donde aporten; documentar origen y responsable interno de datos. No inventar doctrina, fechas o autoridades. | M + E |
| **B-20 · P2** Legal y tecnologías reales desincronizados | `src/data/legal.ts:13`; `src/pages/politica-de-privacidad.astro:25–28`; `src/pages/visitanos.astro:55` | Términos aún propone preparar una política futura, que ya existe. Privacidad menciona enlaces a terceros; ahora hay un iframe Google que carga al acercarse, sin exigir click externo. | Información institucional incompleta sobre el funcionamiento real. No se concluye aquí una infracción legal ni que sea obligatorio un banner. | Alinear texto técnico con mapa embebido y política existente; revisión institucional/jurídica. Evaluar carga voluntaria si se desea reducir comunicación con terceros. No añadir seguimiento ni banners por defecto. | S + E |
| **B-21 · P2 / externa** Vinculación y gestión del perfil local no acreditadas | `src/data/links.ts:8–10`; `src/layouts/BaseLayout.astro:12` | Maps muestra nombre/dirección. No se observó website en la vista consultada y no hay acceso a administración/estadísticas; no se pudo verificar horario completo. | No puede asegurarse consistencia del perfil, asociación al dominio o control de actualizaciones. | Responsable de la iglesia debe revisar propiedad/verificación, web, categoría, pin y datos. Agregar web aprobada si falta; auditar cambios de horario en perfil y redes. No confundir inicio de culto con apertura general del edificio. | E |
| **B-22 · P3** Llegada móvil poco inmediata desde Inicio | `src/styles/global.css:166`; `src/components/EditorialHero.astro:6` | Visitarnos se oculta en header móvil; CTA principal lleva a creencias. Horario/dirección están más abajo y en menú. No es un enlace roto. | Más pasos para quien busca cuándo y dónde asistir. | Evaluar enlace secundario discreto “Horarios y cómo llegar” en la primera pantalla o dentro de la intro, manteniendo CTA cristocéntrico y composición. Validación visual antes de adoptar. | S |
| **B-23 · P3** Jerarquía interna de reuniones mejorable | `src/pages/ministerios.astro:11`; `src/components/MinistryFeature.astro:19` | “Reuniones semanales” y cada reunión se marcan H2 pese a la anidación temática. Un solo H1 correcto. | Menor claridad del esquema para navegación asistiva; no es un bloqueo SEO ni justifica rediseño. | Considerar H3 para las reuniones dentro de esa sección y mantener estilos por clase. | XS |
| **B-24 · P3 / revisión** Alternativas audiovisuales no acreditadas | `src/components/HeroVideo.astro:8–18`; `src/pages/nosotros.astro:18–23` | Hay sonido, pausa, estados y fallback; no hay track/transcripción. Axe deja video-caption como incomplete. No se revisó íntegramente el audio. | Si hay discurso significativo, puede faltar acceso equivalente. | Escuchar y clasificar el material; definir subtítulos/transcripción u otra alternativa según su función real. No certificar ni reprobar accesibilidad solo por ausencia de track en un fondo decorativo. | S–M + E |
| **B-25 · P3** Documentación operativa desactualizada | `README.md:60,113`; `PENDIENTES_PUBLICACION.md:48`; `DESPLIEGUE_VERCEL.md:36–42` | README dice que no llegaron fotos y habla de cinco rutas; existen fotos y ocho páginas. Documentos conservan hashes/pruebas/despliegues históricos. | Riesgo de repetir tareas o tomar decisiones con estados pasados. No afecta por sí mismo al crawler. | Mantener historial fechado y una ficha operativa actual de rutas/aprobaciones; no reescribir evidencias históricas como si fueran actuales. | XS–S |

### Schema: qué conservar y qué ampliar

Ya existe JSON-LD en el HTML y se verificó también en DOM: no corresponde recomendar “agregar schema porque no hay”. El objeto actual es pequeño, sintácticamente válido y consistente con la dirección visible. No se ejecutó un nuevo Rich Results Test o Schema.org Validator interactivo; la validación externa de una propuesta en la auditoría anterior no certifica automáticamente el código actual ni elegibilidad de un resultado enriquecido.

`Church` es el tipo específico del lugar: hereda de `PlaceOfWorship`, `CivicStructure` y `Place`; **no es un subtipo de `Organization`**. No hace falta declarar todos los ancestros. Si se representa además la congregación como organización, usar un nodo separado, con identidad y relación reales, sin inventar personería ni afiliación jurídica. [Schema.org Church](https://schema.org/Church).

Propuesta futura, condicionada al origen aprobado:

- Un identificador estable del lugar, por ejemplo `ORIGEN/#church`, y URL canónica.
- `name`, `description` aprobada y `PostalAddress` derivados de datos compartidos.
- `geo`: latitud **−31.9309445**, longitud **−65.1925254**, obtenidas del destino del pin facilitado. `hasMap` al enlace confirmado.
- Imagen y logo autorizados con URL pública absoluta. Enlaces `sameAs` solo si identifican a la misma entidad; Facebook y YouTube requieren confirmar titularidad institucional. El Instagram juvenil puede ser un canal de un grupo, no la institución completa.
- No inventar teléfono/email/código postal. La ficha mostró un código postal, pero no se lo incorpora como dato autorizado sin ratificación de la iglesia.
- No convertir horarios semanales de reunión en rangos de apertura. No emitir eventos fechados a partir de una recurrencia sin fechas reales.
- `WebSite`/`WebPage` pueden ayudar a describir sitio y página cuando el origen esté definido; no generan autoridad ni citas por sí solos.

## SEO local, contenidos y preparación GEO/AEO

### Fuente de verdad institucional

| Dato | Estado actual comprobado |
| --- | --- |
| Nombre | Comunidad Cristiana Villa Sarmiento; identidad principal Comunidad Cristiana, CCVS como abreviatura local. |
| Dirección web | Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina. Maps coincide en calle/localidad/provincia, con acento “Sársfield”. Normalizar con la iglesia; no completar un número supuesto. |
| Reunión general | **Domingo 20:30 hs**. Fuente compartida `schedule.ts:3`; público comprobado en Inicio/Horarios. |
| Oración y Palabra | Miércoles 21:00 hs. |
| Jóvenes | Sábado 21:00 hs. |
| Escuela Bíblica Infantil | Sábado 16:30 hs. |
| Encuentros programados | Sin fecha inventada; se anuncian por canales oficiales. |
| Contacto | `/links/` reúne canales facilitados. No hay correo institucional ni teléfono publicados; no se considera necesario inventarlos para completar un schema. |
| Ficha local | Pin y nombre/dirección comprobados públicamente. Propiedad, verificación administrativa, categoría y correspondencia de todos sus horarios: pendientes de responsable con acceso. |
| Dominio | Alias de revisión accesible. Elección/aprobación de dominio oficial permanente no acreditadas en esta sesión. |

Las consultas exploratorias de marca y localidad mostraron directorios de terceros, incluso [uno que presenta a CCVS bajo “horarios de misa”](https://sanfransolanobv.com.ar/misas/comunidad-cristiana-villa-sarmiento/). Son señales de **posible confusión pública**, no fuentes autorizadas de doctrina, horarios, reseñas o puntuaciones. No se trasladaron sus afirmaciones al sitio. La [búsqueda metodista oficial](https://iglesiametodista.org.ar/iglesias/) también evidencia el homónimo Villa Sarmiento de Buenos Aires. No se midieron volúmenes, posiciones locales, backlinks ni tráfico orgánico, y una búsqueda `site:` no sustituye Search Console.

El criterio local recomendado es relevancia + ubicación + consistencia real. La distancia depende de dónde busca la persona; ninguna modificación garantiza aparecer primero en “cerca de mí”. [Explicación oficial de ranking local](https://support.google.com/business/answer/7091).

### Preguntas que la web puede responder hoy

| Pregunta del visitante | Respuesta recuperable | Mejora útil |
| --- | --- | --- |
| ¿Qué es CCVS? | Sí: congregación local, nombre, fe en Jesucristo y pertenencia en Nosotros. | Una definición breve de institución y localidad en la introducción de Inicio; conservar el titular aprobado. |
| ¿Dónde queda? | Sí: dirección en HTML, Maps y pin. | Mantener mapa + dirección textual + enlace directo. No depender solo del iframe. |
| ¿Cuáles son los horarios? | Sí: cuatro horarios compartidos y principal visible. | Fecha/responsable de revisión interna y sincronización con perfiles externos. |
| ¿Qué cree? | Sí: cinco creencias, texto presente sin JS y acordeón accesible. | Explicar brevemente cada afirmación con aprobación pastoral; no agregar doctrinas para aumentar palabras. |
| ¿Cómo voy por primera vez? | Parcial: puede asistir, dirección, horario y canales. | Logística confirmada en una FAQ corta; no suponer estacionamiento, inscripción o accesibilidad. |
| ¿Qué actividades realiza? | Parcial: reuniones y encuentros visibles; el detalle de Servicio queda en un array no renderizado. | Confirmar vigencia y publicar las actividades concretas. |
| ¿Cómo me comunico? | Sí, mediante `/links/`; las redes no son un correo institucional. | Aclarar cuál es canal juvenil y cuál institucional; elegir un canal principal si la iglesia lo confirma. |

Una FAQ natural en Horarios puede reutilizar datos existentes: reunión del domingo, dirección, reuniones de niños/jóvenes y cómo consultar. Las dudas sobre duración, recepción de menores, accesos y estacionamiento deben esperar información real. No hace falta una página separada por cada pregunta ni reformular todos los títulos como consultas.

### Editorial y fidelidad institucional

- **Conservar:** titular cristocéntrico, invitación cercana en español rioplatense, historia local, fotografías propias, nombre completo y jerarquía de logos. No convertir cada bloque en una repetición de “iglesia evangélica cerca de mí”.
- **Claridad:** “Crecer”, “compartir la fe” y “caminar juntos” aparecen reiteradamente. Mantenerlos donde cumplen una función pastoral; en Servicio y primera visita añadir hechos concretos, no más eslóganes.
- **Creencias:** las cinco declaraciones constituyen un resumen informado, no un tratado. Una explicación de una o dos frases por punto puede ayudar si la iglesia la aprueba; no se impone una longitud mínima SEO.
- **Referencias bíblicas:** Juan 14:6, Hechos 2:42, Colosenses 1:18 y el contexto de hacer discípulos permiten revisar la coherencia de las formulaciones que ya aparecen. Se proponen como referencias para revisión pastoral, sin atribuir nuevas interpretaciones oficiales ni reproducir una traducción completa.
- **Historia:** confirmar el orden donación/construcción/alquiler y la descripción de 2015. La honestidad de señalar una fecha desconocida es preferible a inventarla, pero el lenguaje editorial puede revisarse para distinguir memoria testimonial y registro institucional.
- **Trazabilidad:** mantener internamente fuente, fecha de validación y responsable de horarios/textos. No publicar una falsa “última actualización” automática para aparentar frescura.

### Preparación por motor de respuesta

Se auditó **preparación técnica y editorial**, no se ejecutó una prueba de tasa de citas dentro de las cinco plataformas ni se accedió a sus paneles privados.

| Motor | Control documentado aplicable | Diagnóstico CCVS y validación futura |
| --- | --- | --- |
| ChatGPT Search | `OAI-SearchBot` gestiona descubrimiento para Search; `GPTBot` corresponde a entrenamiento. `ChatGPT-User` es un acceso solicitado por usuario, no el permiso de Search. | `User-agent: * / Disallow: /` cierra el rastreo automático. Tras aprobación, separar política de búsqueda de entrenamiento; verificar acceso real en logs/IP oficiales y registrar consultas/citas. [OpenAI](https://developers.openai.com/api/docs/bots). |
| Google AI Overviews / AI Mode | Necesita elegibilidad para Search y fragmentos; la documentación actual incluye preferencias de funciones generativas en Search Console. No requiere un schema especial para IA. | Indexación cerrada; no se inspeccionaron las preferencias de una propiedad CCVS. Revisar URL Inspection, elegibilidad y reportes cuando exista acceso. [Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). |
| Gemini | Distinguir Gemini Apps/Grounding y funciones de IA de Google Search. `Google-Extended` controla usos descritos para Gemini y grounding; no es un factor de ranking ni el control de inclusión en Google Search. | Definir esa política conscientemente; no desbloquear entrenamiento suponiendo que sea obligatorio para SEO. [Rastreadores de Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers). |
| Microsoft Copilot | Acceso de Bing y señales coherentes; Bing Webmaster Tools documenta AI Performance para citas en sus experiencias compatibles. | Robots bloquea Bingbot. Verificar propiedad, indexación y citas con acceso autorizado; no afirmar que una notificación IndexNow garantice aparición. [Microsoft](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/). |
| Perplexity | `PerplexityBot` busca y enlaza fuentes; `Perplexity-User` responde a una solicitud humana y puede tratar robots de forma diferente. | El bloqueo general limita el rastreo automático. Comprobar WAF/logs si luego hay fallas, sin relajar toda la seguridad por un user-agent declarado. [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers). |

**Documentado:** SEO sostenible, acceso permitido, texto útil, enlaces internos y datos estructurados coherentes. **Inferencia razonable:** una identidad explícita y respuestas completas reducen ambigüedad para personas y sistemas. **No demostrado para CCVS:** porcentajes de mejora de citas por schema/FAQ, longitud fija de párrafos, cambios artificiales de fecha, prompts ocultos o metadatos especiales.

`llms.txt` no se recomienda como prioridad: no resuelve robots/noindex y crearía una segunda copia de horarios para mantener. Google aclara que estos archivos no mejoran ni perjudican su visibilidad o ranking. Un experimento para otro consumidor solo tendría sentido con un objetivo y mantenimiento definidos. [Aclaración oficial, junio de 2026](https://developers.google.com/search/updates).

Las FAQ siguen siendo útiles para visitantes, pero no se promete su resultado enriquecido: Google retiró ese formato de resultados en mayo de 2026 y su documentación en junio. `FAQPage` semántico no equivale a elegibilidad visual ni a un aumento garantizado de citas. [Registro oficial](https://developers.google.com/search/updates).

## Rendimiento y Core Web Vitals

### Método Lighthouse

CLI **13.5.0**, Chromium instalado para Playwright, Windows y Node 24.15.0; alias público, contextos nuevos por proceso, ejecución secuencial sin otra auditoría de navegador lanzada en paralelo. Se utilizó Lighthouse temporalmente mediante `npm exec --package=lighthouse@13.5.0`; no se añadió a package.json/package-lock ni al JavaScript de producción.

- Móvil: configuración predeterminada, viewport 412×823, DPR 1,75, CPU simulada 4× y red simulada de aproximadamente 1,6 Mbps/150 ms RTT.
- Escritorio: preset desktop, viewport 1350×940, DPR 1, CPU 1× y red simulada de aproximadamente 10,24 Mbps/40 ms RTT.
- **Tres repeticiones de Inicio móvil**, una de cada otro caso. Las otras tres páginas/perfiles no tienen muestras suficientes para describir variación estadística.
- La máquina no estuvo aislada de todos los procesos de Windows. No se descarta ninguna ejecución lenta ni se presenta la mejor como resultado general.
- Lighthouse aplica simulación y calibración; estas métricas no son percentiles de visitantes reales. Las configuraciones completas y tiempos UTC se conservan en la evidencia. [Método de puntuación](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

| Página / perfil | Performance LH | LCP | CLS | TBT | Transferencia observada por LH |
| --- | ---: | ---: | ---: | ---: | ---: |
| Inicio móvil, mediana de 3 | **92**; rango 73–94 | **2,752 s**; rango 2,133–2,902 | 0,00050 | 0 ms; rango 0–854 | 4,618 MB; rango 4,471–4,639 |
| Inicio escritorio, 1 muestra | 98 | 0,496 s | 0,00071 | 54 ms | 5,439 MB |
| Horarios móvil, 1 muestra | 90 | **2,881 s** | 0,00215 | 142 ms | 0,743 MB |
| Horarios escritorio, 1 muestra | 98 | 1,060 s | 0,00264 | 0 ms | 1,297 MB |

MB decimales. La transferencia es lo observado durante cada auditoría, no el tamaño completo de la página después de una sesión prolongada o de todos los videos descargados.

La mediana LCP móvil de Inicio y la muestra de Horarios quedan por encima de la referencia de 2,5 s, aunque una ejecución de Inicio sí la cumple. En Inicio móvil el candidato LCP fue el **poster del hero**, no el video, en las tres trazas; en Horarios fue el **H1**. Por eso el plan separa carga de fuentes/estilos/renderizado y presupuesto de video. La tarea larga no atribuible de la tercera muestra impide adjudicar todo el TBT al código de animación.

Lighthouse mostró SEO **66** en las cuatro combinaciones, afectado por bloqueo de indexación. Accessibility **100** se refiere solo a Inicio/Horarios y a las reglas de esa herramienta; **no contradice ni anula** la infracción encontrada en otra ruta. Best Practices fue 92 móvil / 96 desktop, con señales como favicon 404 y logo de baja densidad. Ninguna de esas notas es un ranking de Google.

**INP real no medido.** TBT no es INP. No se obtuvieron datos de campo CrUX/RUM ni acceso a Search Console. Objetivos de campo: LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1 al percentil 75, segmentando móvil/escritorio. [Web Vitals](https://web.dev/articles/vitals).

### Presupuesto de recursos y estrategia

| Recurso local | Tamaño real | Lectura técnica |
| --- | ---: | --- |
| Video portada móvil | 8.441.049 B | Principal presupuesto de descarga; autoplay normal aunque preload sea none. |
| Video portada desktop | 14.839.646 B | Reproducción larga puede consumir más que lo observado por LH. |
| Video historia móvil / desktop | 2.022.411 / 7.343.454 B | Se carga al entrar en viewport; no se evaluó su sesión completa con Lighthouse. |
| UI/video/scroll JS | 10.222 B; gzip 3.594 B | Pequeño; no justifica migrar framework. |
| Astro ClientRouter JS | 16.365 B; gzip 5.575 B | Conserva transiciones aprobadas; perfilar antes de modificar. |
| JS conjunto de esos bundles | **26.587 B; gzip 9.169 B** | El problema de bytes está mucho más en medios que en JS. |
| CSS compartido del build auditado | 61.481 B; gzip 13.590 B | Revisar ruta crítica y cascada al tocar componentes; no purgar estilos a ciegas. El hash público difiere de este build. |
| Archivo Latin / Bodoni Latin | 90.104 / 25.884 B | Fuentes locales con swap, observadas en red; no sustituir familias aprobadas. |

Las fotos se generan en WebP, con dimensiones y srcset. Las de contenido secundario usan lazy; poster y portada de Nosotros usan prioridad/carga inicial. No se observaron imágenes informativas sin alt o sin dimensiones entre las ocho rutas. Imágenes decorativas se ocultan semánticamente. El `sizes` compartido y algunas calidades tienen margen; convertir todo a AVIF no es una obligación SEO ni un ahorro probado.

El video pausa al salir de viewport/ocultarse la pestaña, libera recursos al navegar y respeta reduced motion con poster y reproducción manual. Son decisiones a conservar. El mapa usa `loading=lazy`, tiene título y enlace externo; cargó al desplazarse hasta el módulo. Las capturas largas tomadas sin scroll pueden mostrar su reserva vacía antes de cargar: **no se contabilizó eso como un mapa roto**. El iframe introduce comunicación con Google al visualizarlo, aunque la persona no pulse el enlace externo.

Bundles `_astro` públicos respondieron 200, Brotli y `immutable` de un año. HTML usa revalidación con edge HIT en la muestra. Los MP4 admiten rangos y el video móvil respondió 200 con edge HIT, pero sin caché larga del navegador. No se midió una tasa global de aciertos de CDN.

## Accesibilidad: límites del diagnóstico

Se observaron main/nav/address, skip link, botones nativos, menú no modal operable, foco visible, Escape, anclas y acordeón por teclado. Las pruebas de video, navegación forward/back, fallback y reduced motion pasaron. Las siete anchuras no mostraron desbordes; en la portada actual de Nosotros el título queda separado de la foto y **no se reprodujo el cruce de texto oscuro sobre imagen** señalado en Fase 5.

Hay una infracción confirmada en Privacidad (B-13), señales de nombre accesible para revisión (B-14) y resultados incompletos de contraste, ARIA y subtítulos. Los textos de 12–13 px encontrados merecen revisión de legibilidad, pero su tamaño por sí solo no prueba incumplimiento. No se realizaron pruebas exhaustivas con lector de pantalla, zoom 200/400 %, espaciado, Safari, iOS ni dispositivos físicos. Cero errores de JavaScript o una nota automática 100 no equivalen a conformidad WCAG.

## Benchmark de prácticas aplicables

Revisión actual de tres sitios oficiales con Chromium a 390×844, reduced motion y una ventana de tres segundos desde DOMContentLoaded. Se consultaron además páginas oficiales de visita/ubicación disponibles. Los conteos de requests/scripts son muestras de complejidad, no pesos completos, Core Web Vitals o evidencia de mejores rankings. No se ejecutó un Lighthouse comparable de terceros.

| Referente | Práctica verificada | Rendimiento/estructura observables | Aplicación a CCVS |
| --- | --- | --- | --- |
| [Iglesia La Misión, Córdoba](https://www.iglesialamision.com.ar/) | Presenta región/sedes, horarios, llegada y orientación para primera visita. Canonical explícito. | 16 imágenes, 10 lazy, 20 scripts y 27 requests en la ventana; sin overflow observado. | Responder dudas reales y agrupar horario + lugar + llegada. Las condiciones de su recepción no deben copiarse como hechos de CCVS. |
| [Rey de Reyes, Buenos Aires](https://reydereyes.com.ar/) | CTA “Ver horarios” enlaza una sección concreta. Canonical explícito. | 49 scripts y 67 requests; varios H1 y servicios externos. Sin overflow en la muestra. | Hacer fácil encontrar Horarios, manteniendo la arquitectura más sencilla de CCVS. No copiar su cantidad de integraciones. |
| [Passion City Church](https://passioncitychurch.com/) | Distingue identidad, creencias y ubicaciones; conserva una composición audiovisual/editorial reconocible. Canonical explícito. | 52 scripts, 4 iframes, 2 videos y 90 requests en la ventana; varios servicios externos. | Preservar la jerarquía visual aprobada; tomar la claridad entre identidad y lugar, sin trasladar infraestructura audiovisual o de seguimiento. |

No se usó el prestigio de esos sitios como prueba de rendimiento o superioridad SEO. La comparación respalda decisiones concretas: información práctica cerca de la invitación, una fuente oficial clara y medios medidos. No implica copiar doctrina, testimonios, fotos, líderes ni branding.

## Comparación con auditorías anteriores

Se contrastaron `auditoria-fase-5/RESUMEN_EJECUTIVO.md`, informes 03/04/05/06/07/08, evidencia y `AUDITORIA_TEXTOS.md`. El informe anterior auditó inicialmente `7395d42` el 15/10, con cambios concurrentes registrados. Sus pruebas no certifican la revisión actual.

| Hallazgo anterior | Estado al 16/10/2026 |
| --- | --- |
| Maps deshabilitado / pin no confirmado | **Resuelto en la web:** enlace directo, iframe y ficha con nombre/dirección comprobados. Propiedad/administración del perfil siguen sin auditar. |
| Seis rutas | **Ocho rutas actuales**, incluidas creencias y privacidad. La suite habitual aún enumera siete. |
| General domingo 19:30 | **Actualizado a 20:30** en fuente de datos y páginas públicas comprobadas. Documentos históricos mantienen la hora de su momento. |
| Cruce título/foto en Nosotros desktop | **No reproducido:** nueva composición separada en captura 1440. |
| Hero móvil 8,44 MB | **Persiste** con idéntico tamaño completo del archivo. |
| LCP móvil local mediano 3,06 s | Nueva mediana LH pública 2,75 s; **no comparable directamente** por red, dispositivo simulado, motor de medición y candidato LCP distintos. No se calcula una mejora porcentual. |
| Sin Lighthouse local | Ahora se ejecutaron 6 informes con una herramienta temporal, sin dependencia runtime. |
| Noindex / canonical / sitemap pendientes | **Persiste** el estado público de revisión. |
| Falta de política de privacidad | **Resuelto el documento y footer**; queda accesibilidad del enlace y alineación con el mapa embebido. |
| Falta de favicon y OG image | **Persiste**. |
| Axe sin infracciones en seis rutas | No extrapolable: se detectó una infracción en la nueva política. |
| Aprobaciones históricas/doctrinales/legal y logística | No se encontró documentación nueva que las cierre; **requieren confirmación institucional**. |

La nota global anterior 72/100 y estas seis notas no comparten fórmula. No se presentan como una subida o bajada comparable de salud.

## C. Roadmap de optimización

### 1. Quick wins que pueden prepararse antes del lanzamiento

| Orden | Acción | Hallazgos | Criterio de aceptación |
| ---: | --- | --- | --- |
| 1 | Diferenciar enlace de privacidad con subrayado persistente y comprobar foco. | B-13 | Axe sin link-in-text-block en política, con revisión visual 390/1440. |
| 2 | Ratificar nombre del canal juvenil y devolver contexto a etiquetas/enlace junto a Jóvenes. | B-15, B-18 | Visitante entiende a qué canal va; pruebas evalúan etiquetas aprobadas y destino correcto. |
| 3 | Corregir cobertura de rutas y selector de tarjetas en la suite. | B-18 | Ocho rutas cubiertas y suite sin fallas; conservar comprobación de cuatro horarios reales. |
| 4 | Favicon/variantes de logo e imagen social autorizados. | B-06, B-07 | Recursos 200 y nítidos, metadata absoluta al origen aprobado, jerarquía madre/CCVS conservada. |
| 5 | Ajustar title/description de Inicio y Horarios; preparar información concreta de Servicio. | B-05, B-17 | Mensaje claro, Córdoba desambiguada y solo actividades vigentes en HTML. |

### 2. Correcciones críticas de publicación, sujetas a aprobación

1. Responsable institucional valida textos, creencias, historia, permisos de medios y estado legal. No se considera que pedir una auditoría equivalga a dar esa aprobación.
2. Definir origen oficial y variantes que deben redirigir. Adaptar configuración existente de Astro y Vercel; no inventar un dominio ni comprarlo durante la auditoría.
3. Resolver **B-01 a B-04 como un mismo lote**: flags por entorno, canonical, sitemap y pruebas de ambos modos. Revisiones/preview conservan exclusión; solo el sitio aprobado queda rastreable/indexable.
4. Verificar HTTP real, headers, canonical por ruta, sitemap XML e inclusión de las URLs elegidas. Redirigir `/index.html`; tratar URLs antiguas solo con evidencia de uso.
5. Publicar ese lote únicamente con autorización expresa de publicación, y luego solicitar rastreo desde cuentas verificadas. Esta etapa no se ejecutó.

### 3. Mejoras de arquitectura

- **ADAPTAR** `site.ts`, `schedule.ts` y `links.ts` como fuentes compartidas de entidad, horarios y ubicación. Derivar representación visible y JSON-LD; no duplicar la agenda en archivos para IA.
- **ADAPTAR** el generador de sitemap y pruebas a un inventario único de rutas públicas con estado de indexación. Ocho páginas no justifican un nuevo CMS ni un sistema de routing paralelo.
- **REUTILIZAR** `BaseLayout`, `PhotoSection`, Astro Assets y el ciclo de limpieza de UI. Añadir flexibilidad de metadata/`sizes` donde haga falta, con cambios locales.
- Separar lugar, institución y página en datos estructurados solo cuando se disponga del origen/relaciones aprobados. No crear un grafo extenso para llenar campos.
- Revisar CSS por componente al intervenirlo; las reglas acumuladas son mantenimiento, no razón para rehacer la identidad visual o sustituir las fuentes.

### 4. Optimizaciones avanzadas y comprobables

1. Piloto móvil de video/poster en copia local: bytes iniciales, LCP, Speed Index, nitidez y experiencia de reproducción. Mantener una versión de control con el diseño actual.
2. Revisar `sizes`, compresión y eventualmente AVIF en fotos seleccionadas. Registrar comparación visual y recursos realmente elegidos por el navegador, sin aplicar una reducción indiscriminada de calidad.
3. Perfilar tareas largas y renderizado inicial de H1/fuentes. Medir cambios de entrada/transición sin eliminar la coreografía aprobada por una nota sintética aislada.
4. Versionar MP4 y ajustar caché cuando la estrategia de medios esté definida.
5. Revisar subtítulos/alternativas del material audiovisual y hacer QA con teléfono real, Safari y lector de pantalla.

### 5. Acciones externas

| Responsable / herramienta | Acción | Evidencia que debe quedar |
| --- | --- | --- |
| Iglesia + Google Business Profile | Confirmar administración/verificación, categoría, dirección, pin, sitio, fotos y horarios correctos. No crear una segunda ficha sin comprobar la existente. | Captura o registro autorizado de campos; consistencia con web y redes. |
| Titular del dominio + Google Search Console | Verificar propiedad, enviar sitemap y usar URL Inspection tras lanzamiento aprobado. | Estado de indexación, canonical elegido, HTML recibido y errores reales. |
| Responsable SEO + Search Console | Establecer línea base de consultas de marca/locales y entradas en Inicio/Horarios. Revisar informe generativo cuando haya impresiones suficientes. | Exportes fechados por país/dispositivo/página; no inferir datos inexistentes. |
| Responsable SEO + Bing Webmaster Tools / Bing Places | Verificar sitio, sitemap y ficha local; revisar AI Performance donde haya datos. IndexNow es opcional para avisar cambios, no garantía. | Indexación/citas y cambios documentados. |
| Comunicación institucional | Sincronizar domingo 20:30 y demás datos en canales que controla la iglesia; corregir atribuciones de terceros si es posible. | Lista de fuentes revisadas, fecha y responsable. Sin comprar reseñas ni fabricar menciones. |
| Equipo editorial | Confirmar logística, actividades, cronología y explicación de creencias. | Aprobaciones concretas; uso exclusivo de información real. |

No se accedió a cuentas privadas ni se reclamaron perfiles, enviaron mensajes, instalaron analíticas o modificaron DNS.

## D. Plan de validación

### Antes de aceptar un lote técnico

1. Revisar diff y hashes: conservar código y personalizaciones fuera del lote autorizado.
2. Ejecutar `npm run check`, `npm run build` y `npm run verify:static` con expectativas del modo correcto. No existe un script de lint separado: no se declara “lint aprobado”.
3. Ejecutar suite de navegación, teclado, reduced motion y video; ampliar inventario a las ocho rutas y exigir resolución de las seis fallas conocidas.
4. Repetir matriz 360/375/390/430/768/1024/1440 y axe en 390/1440, incluyendo política y estados de acordeón/menú. Revisar manualmente resultados incomplete.
5. Comprobar HTML sin JS: definición de iglesia, horarios, dirección, creencias, actividades aprobadas y enlaces de llegada/contacto.

### Al habilitar publicación e indexación

- HEAD/GET de URLs canónicas: 200; variantes previstas: una redirección 301/308; inexistentes: 404. Revisar que no haya cadenas o equivalencias accidentales.
- `robots.txt` accesible; permitir rastreo aprobado; comprobar que HTML y headers no conserven noindex involuntario. Revisar también controles de hosting/WAF, sin suponer que un user-agent simulado equivale a Googlebot real.
- Canonical absoluta por ruta, sin UTM y con barra final coherente; `og:url` alineada; sitemap válido con solo URLs canónicas elegidas y referencia en robots.
- Verificar JSON-LD en DOM, Schema.org Validator y, cuando el tipo corresponda, Rich Results Test. No interpretar ausencia de un resultado enriquecido específico de Church como schema inválido.
- Desde Search Console: inspección en vivo, solicitud de indexación de rutas prioritarias y revisión posterior de canonical elegido/cobertura. Una solicitud no garantiza ni fija un plazo de indexación.

### Medición de rendimiento

- Repetir al menos tres veces por perfil/ruta prioritaria con igual versión, configuración y equipo; comparar medianas/rangos, no solo el mejor resultado.
- Vigilar LCP y su elemento, CLS de sesión, bytes de medios, fuentes, tareas largas y consumo de datos con video. Separar primer viewport de recorrido completo hasta mapa/footer.
- Medir INP con interacciones representativas y posteriormente campo p75 si existe volumen suficiente. TBT puede orientar investigación, pero no sustituye esa medición.
- Consultar CrUX/PSI y Search Console cuando haya datos; su ausencia no demuestra una experiencia buena o mala. No añadir seguimiento personal solo para llenar un dashboard.
- Conservar capturas y recortes aprobados del hero antes/después; rechazar ahorros que degraden la calidad solicitada.

### Medición de SEO local y GEO

Usar las siete preguntas de esta auditoría más “iglesia cristiana en Villa Sarmiento, Córdoba” como conjunto estable. Tras indexación, registrar mensualmente fecha, país/localidad de prueba, plataforma/modelo, acceso web, respuesta, enlaces citados y URL oficial recuperada en ChatGPT Search, Google AI Overviews/AI Mode, Gemini, Copilot y Perplexity. Una respuesta particular no mide una posición estable ni una tasa general de citas.

Para Google, la documentación vigente describe un [informe de rendimiento generativo en Search Console](https://support.google.com/webmasters/answer/16984139), distribuido mundialmente desde agosto de 2026; puede no mostrarse sin impresiones suficientes. No se presume que CCVS tenga datos. Para Microsoft, contrastar citas e intención con AI Performance. No atribuir todos los accesos directos a IA ni confundir una visita remitida por un asistente con una impresión.

Indicadores útiles: rutas indexadas/canónicas elegidas; consultas de marca y localidad; acceso a Horarios y llegada; consistencia de perfiles; preguntas que pueden responderse con la fuente oficial; referencias/citas observables. No se fija un aumento de tráfico o ranking sin línea base y periodo de observación.

### Reproducción del diagnóstico

Los siguientes comandos solo generan build/evidencia; no publican. Requieren dependencias existentes, preview correspondiente en 4323 y acceso de red para las comprobaciones públicas:

```powershell
npm run check
npm run build
npm run verify:static
node docs/auditoria-seo-geo-evidencia/auditar.mjs --http
node docs/auditoria-seo-geo-evidencia/auditar.mjs --browser
npm exec -- playwright test --config=docs/auditoria-seo-geo-evidencia/playwright.config.mjs
node docs/auditoria-seo-geo-evidencia/benchmark.mjs
npm audit --json
```

Los scripts sobrescriben sus archivos de evidencia: preservar una copia si se quiere comparar fechas. Lighthouse se ejecutó con Chrome de Playwright mediante `CHROME_PATH`, `--output=json`, `--only-categories=performance,accessibility,best-practices,seo` y `--chrome-flags='--headless --no-sandbox'`; el preset desktop añade `--preset=desktop`. Guardar los JSON completos en la carpeta local de capturas y ejecutar `resumir.mjs` para actualizar el resumen. No instalar herramientas en las dependencias runtime.

## Cierre y siguiente decisión

**Diagnóstico completo; roadmap pendiente de autorización de implementación.** Solo se añadieron este informe y sus evidencias auxiliares. Se conservaron los archivos de producción y el estado institucional de revisión.

El siguiente lote de mayor valor es **accesibilidad del enlace + precisión del canal juvenil + cobertura de pruebas**, mientras la iglesia confirma origen oficial y aprobaciones. El lanzamiento SEO debe tratar juntos indexación, canonical, sitemap y pruebas por entorno; las mejoras de medios se validan en paralelo con una comparación visual y mediciones repetibles.

Tres conceptos transferibles: **rastreo no equivale a indexación**; **un resultado de laboratorio no equivale al rendimiento de usuarios reales**; **una entidad consistente y una respuesta útil son más importantes que archivos especiales para IA**.
