# CCVS — Implementación Fase 1: SEO, GEO y QA

Fecha: 16 de octubre de 2026. Base auditada: `9c0c616495bd88297d94bb791c20d30df1c326df`.

Fuente de verdad: [auditoría original](auditoria-seo-geo.md) y sus evidencias, conservadas sin sobrescribir. Trabajo local, sin commit, push, publicación, deploy ni cambios DNS.

## Resultado

Primera fase implementada y validada. Continúan `publicationApproved: false`, `noindex, nofollow` en las ocho páginas y `Disallow: /` en robots. No se configuró un dominio canónico, no se activó sitemap ni se alteró el modo de revisión.

Se conservaron los ocho H1 de sus componentes/páginas, el contenido institucional, los horarios aprobados, fotos, recortes, videos, coreografía de navegación, paleta y fuentes. El schema Church existente se conservó sin añadir afirmaciones institucionales. La [verificación de integridad](fase-1-seo-geo-evidencia/verificacion.json) compara hashes contra el manifiesto de auditoría y H1, schema y transiciones contra el commit de base.

## Implementación y comparación con la auditoría

| Hallazgo | Antes | Resultado local |
| --- | --- | --- |
| B-13: privacidad | Contacto diferenciable solo por color; axe `link-in-text-block`. | Subrayado permanente. Prueba desde footer hasta contacto, foco visible mediante Tab/Shift+Tab y llegada a `/links/`. Sin cambiar el texto legal. |
| B-15: identidad de Instagram | “Instagram” podía entenderse como cuenta general. | “Instagram — Jóvenes CCVS” en Links y nombres accesibles de menú/footer. Facebook/YouTube recuperan el contexto Comunidad Cristiana. URLs originales intactas; no se añadió `sameAs` juvenil al schema. |
| B-18: E2E | 84 aprobadas, 6 fallidas de 90; privacidad fuera de los inventarios habituales. | 103 aprobadas, 0 fallidas, omitidas o flaky. Inventario compartido de ocho rutas; 56 combinaciones ruta/ancho y pruebas de entrada, scroll e historial incluyen privacidad. |
| B-06: Open Graph | Sin imagen social ni Twitter Card. | Emblema oficial completo en PNG 1200×630; imagen absoluta, tipo, dimensiones, alt y tarjeta social en las ocho páginas. Preparación local, sin afirmar que el recurso nuevo esté publicado. |
| B-07: favicon/emblema | Favicon 404, logo servido a resolución única. | ICO 32/48, PNG 32/48/180/192/512; iconos declarados y recursos locales 200. Emblema con densidades 1×/2×/3× en header, footer y Links. Tamaños visuales conservados. |
| B-05: metadata local | Córdoba ausente en títulos; visita no anticipaba horarios. | Inicio: “Comunidad Cristiana Villa Sarmiento, Córdoba”; visita: “Horarios y ubicación” con marca/localidad. Ocho títulos con contexto provincial; seis descripciones editoriales afinadas, con domingo 20:30 y dirección donde corresponde. H1 intactos. |
| B-14: nombres accesibles | Señal Lighthouse pendiente de investigar. | Reproducción específica con axe confirmó discrepancias en `.institution` y cuatro enlaces de horarios. Se retiraron `aria-label` que reemplazaban texto visible; nombres nativos completos y regla específica añadida a QA. |
| Jerarquía de ministerios | H2 de reuniones semanales y H2 de cada ministerio, aunque los contiene. | Ministerios como H3 bajo el H2 de reuniones semanales; estilos conservados mediante `.ministry-title`. |
| B-09 y rendimiento de medios | `sizes` genérico y videos pesados. | Análisis con archivos reales y nueve muestras móviles DPR 1/2/3. Sin cambios audiovisuales del hero ni promesas de ahorro. |

B-15 queda resuelto en identificación. El posible enlace contextual dentro del módulo de Jóvenes sigue como mejora editorial opcional; no se añadió un CTA nuevo ni se rediseñó el módulo.

### Investigación de las seis fallas

Se ejecutaron las seis pruebas originales contra el build previo antes de corregir: las seis fallaron nuevamente.

- Cinco fallas reflejaban una pérdida real del contexto de las redes: tres nombres accesibles del menú y dos expectativas de Instagram juvenil en Links. Se corrigió la fuente compartida `externalLinks`; se conservaron las expectativas originales de esas pruebas.
- La sexta buscaba `.schedule h3`, aunque el componente aprobado ya usa tarjetas enlazadas con `strong`. Se sustituyó ese selector obsoleto por cuatro comprobaciones de nombre accesible, texto visible, día, hora y destino exacto. Se conserva el número de reuniones y se exige domingo 20:30, miércoles 21:00, sábado 21:00 y sábado 16:30.
- La primera ejecución ampliada obtuvo 102/103: una prueba nueva esperaba outline tras `focus()` programático después de usar mouse. Se corrigió la simulación para recorrer realmente con teclado; no se relajó la expectativa de foco visible ni se cambió CSS para forzarla. La ejecución completa posterior aprobó 103/103.

## Arquitectura y recursos reutilizados

Se adaptaron `BaseLayout`, `Image` de Astro, datos de enlaces y componentes existentes. Se usaron HTML nativo y Sharp, que ya integra la cadena de imágenes instalada de Astro. No se instalaron dependencias ni servicios, analíticas, cookies o banners.

Fuente exclusiva de las variantes: `identidad/01_comunidad_cristiana_logo_madre_original.png`. Se conservan emblema, proporciones y colores, sin recortes ni reconstrucción generativa. La tarjeta social contiene el emblema completo centrado; no incluye personas, fotografías ajenas o datos inventados. Reproducción: `node scripts/prepare-brand-assets.mjs`.

La URL absoluta de la imagen social usa `Astro.site` si ya está configurado; en el modo actual utiliza la dirección de revisión existente `https://ccvs-sigma.vercel.app`. Ese fallback solo resuelve el recurso social: no introduce canonical ni `og:url`, ni habilita publicación. Los nuevos recursos no están aún en Vercel. Su disponibilidad remota y su origen definitivo se verificarán al autorizar un lanzamiento.

Referencias técnicas reutilizadas: [Astro Assets](https://docs.astro.build/en/guides/images/), [Open Graph](https://ogp.me/) y [WCAG: etiqueta en el nombre](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html). Los nombres nativos evitan que una etiqueta ARIA se desactualice respecto del texto visible que utiliza una persona para reconocer o activar un control.

## Archivos del lote

| Área | Archivos modificados o nuevos |
| --- | --- |
| Accesibilidad e identidad | `src/data/links.ts`, `src/components/SiteHeader.astro`, `SiteFooter.astro`, `Schedule.astro`, `MinistryFeature.astro`, `src/styles/global.css`. |
| Metadata | `src/layouts/BaseLayout.astro`; `src/pages/index.astro`, `nosotros.astro`, `lo-que-creemos.astro`, `ministerios.astro`, `visitanos.astro`, `links.astro`. |
| Recursos oficiales derivados | `scripts/prepare-brand-assets.mjs`, `public/favicon.ico` y seis PNG en `public/brand/`. |
| QA | `playwright.config.ts`, `scripts/verify-build.mjs`, `scripts/capture.mjs`, `tests/site.spec.ts`, `phase4-2.spec.ts`, `refinements.spec.ts`, nuevos `tests/helpers/routes.ts` y `tests/seo-readiness.spec.ts`. |
| Entrega | Este informe y `docs/fase-1-seo-geo-evidencia/`: verificador reproducible, integridad/muestras de medios, resumen E2E y estados de accesibilidad. |

Los documentos de auditoría ya estaban sin seguimiento al iniciar este lote. Se preservaron; no forman una modificación nueva de producción. No se modificaron `site.ts`, `schedule.ts`, `astro.config.mjs`, configuración Vercel, robots, sitemap, dependencias ni fuentes audiovisuales.

## Validación real

| Comando / revisión | Resultado |
| --- | --- |
| `npm run check` | 80 archivos; 0 errores, 0 warnings, 0 hints. |
| `npm run build` | 8 páginas generadas; salida estática correcta. |
| `npm run verify:static` | 8 rutas, 212 enlaces internos/anclas, 119 recursos. Incluye favicon y PNG social real de 1200×630. |
| `npm run test:e2e -- --reporter=list,json` | 103 aprobadas; 0 fallidas, omitidas o flaky; 117,22 s. Sin reintentos. |
| Matriz responsive | 8 rutas × 360/375/390/430/768/1024/1440 px = 56 casos. Sin desbordamiento detectado. |
| Axe | Ocho rutas en 390/1440; WCAG 2 A/AA, 2.1 A/AA y 2.2 AA; reglas específicas de nombres/orden de encabezados. Sin infracciones detectadas. |
| Estados interactivos | Menú abierto y acordeón expandido, 390/1440: sin infracciones automáticas; resultados `incomplete` conservados para revisión humana. |
| Navegación | Adelante/atrás, enlaces y anclas locales, teclado, Escape, menú, acordeón, sin JS, sin View Transition API y reduced motion aprobados. |
| Consola | Las 56 cargas comprueban `pageerror` y mensajes de consola de tipo error: ninguno observado. No se afirma ausencia de todos los mensajes internos de servicios externos. |
| Capturas | Ocho rutas a 390×844 y 1440×900, vistas iniciales/completas y menú/acordeón. Artefactos locales en `qa-artifacts/fase1-seo/`; revisión visual de los bloques afectados. |
| Integridad | Hashes contra auditoría, ocho H1 en sus fuentes, schema y definiciones de transición conservados. `git diff --check` sin errores. |

Suite resumida: [e2e-resumen.json](fase-1-seo-geo-evidencia/e2e-resumen.json). Logs y JSON completo en `qa-artifacts/phase1/`, ignorados por Git. No existe script de lint separado: no se declara lint aprobado.

Se reutilizó explícitamente el preview del build en 4323: el puerto 4322 tiene otro servidor de desarrollo existente. No se cerraron procesos ajenos. Reproducción de la suite sobre este preview:

```powershell
$env:CCVS_TEST_BASE_URL='http://127.0.0.1:4323'
npm run test:e2e
```

La configuración normal conserva el arranque de preview cuando no se define esa variable. La excepción solo permite elegir un servidor de prueba existente.

## Análisis de video e imágenes — sin alterar el hero

Pesos reales conservados, en bytes:

| Recurso | Bytes | Aproximación decimal |
| --- | ---: | ---: |
| Portada móvil | 8.441.049 | 8,44 MB |
| Portada escritorio | 14.839.646 | 14,84 MB |
| Historia móvil | 2.022.411 | 2,02 MB |
| Historia escritorio | 7.343.454 | 7,34 MB |

La portada ya utiliza poster responsive, `preload="none"`, autoplay silencioso cuando corresponde, selección móvil y pausa por visibilidad/navegación. Reduced motion conserva poster y permite reproducción manual sin descargar inicialmente el video; esa conducta volvió a aprobar en E2E. Autoplay con movimiento normal inicia descarga aunque `preload` sea none: no equivale a consumo cero.

Las nueve muestras de navegador a 390 px muestran oportunidades concretas:

- Detalle inferior del collage: unos 133 px renderizados frente a recurso de 800 px y 39.958 bytes en DPR 2. El `sizes` genérico anuncia mucho más ancho que el bloque. Hay margen para candidatos menores y `sizes` por uso; el ahorro exacto exige producir y comparar variantes.
- Otra foto del collage: unos 148 px frente a 557 px y 58.384 bytes en DPR 2. Parte de la selección está limitada por candidatos y dimensiones del original.
- Poster del hero a DPR 1/2/3: 480/800/1280 px y 13.504/23.662/39.812 bytes. La imagen se recorta mediante el diseño actual; no basta comparar ancho para decidir una reducción sin perder nitidez en el alto del hero.
- Fotos de ministerios: por ejemplo, la foto infantil de unos 330 px usa 1086 px y 188.802 bytes en DPR 3. Las fotos grupales pueden llegar a 282.278 bytes. Comparar WebP/AVIF y calidad con teléfonos de alta densidad antes de imponer límites.
- Se corrigieron ahora únicamente las resoluciones del emblema; fotos, `PhotoSection`, posters y archivos MP4 permanecen intactos.

Plan de experimento posterior: conservar control visual; medir tres corridas móviles equivalentes por variante, bytes iniciales y tras reproducción, elemento LCP, CLS, tareas largas y nitidez. Evaluar codificación/bitrate móvil y `faststart` sin alterar encuadre, audio, duración o movimiento. No se ejecutó transcodificación ni se sustituyó el hero.

La auditoría original midió mediana sintética móvil de Inicio 92/100 y LCP 2,752 s; el poster fue LCP. No se repitió Lighthouse ni se obtuvieron métricas de campo en esta fase: no se afirma mejora de rendimiento, ranking, tráfico o citas GEO. Los ~329 KiB de la auditoría son una estimación de herramienta, no ahorro obtenido.

## Pendientes, riesgos y posibles regresiones

- No se detectaron regresiones en la matriz Chromium. Las capturas y tamaños no sustituyen pruebas en Safari/iOS, teléfonos reales o lector de pantalla.
- Axe mantiene resultados `incomplete` en contraste, atributos ARIA y evaluación de subtítulos del video. Se conservan en [estados-accesibilidad.json](fase-1-seo-geo-evidencia/estados-accesibilidad.json); no se convierten en aprobaciones WCAG ni motivan cambios visuales sin confirmar el problema.
- Las etiquetas completas ocupan más espacio en Links; la matriz de siete anchos no detectó desbordamiento y las capturas móviles conservan legibilidad. Los iconos de menú/footer siguen compactos.
- El fallback social usa el alias de revisión; deberá alinearse al origen definitivo y comprobarse por HTTP tras publicación autorizada. Los scrapers pueden conservar caché; preparar metadata no garantiza una vista previa remota ahora.
- Los derivados añaden archivos estáticos y algo de transferencia para emblemas de alta densidad. Open Graph no descarga su PNG dentro del contenido de la página. El generador utiliza Sharp de la cadena Astro existente; al actualizarla, volver a validar los derivados.
- Permanecen B-01 a B-04 deliberadamente: exclusión de indexación, origen canónico, sitemap y validaciones por modo. También quedan la aprobación institucional/legal, documentación histórica/doctrinal y los demás puntos externos/editoriales de la auditoría.
- La disponibilidad externa de las redes no se vuelve a certificar: se verificaron sus destinos originales en DOM. Enlaces/anclas y recursos internos sí se verificaron contra el build.

## Propuesta de Fase 2 — lanzamiento SEO y GEO estructurado

1. **Confirmar publicación y origen oficial.** Aprobación institucional de contenido, medios y legales; definir dominio, variantes y responsable de Search Console/Google Business Profile. No comprar, modificar DNS ni publicar como parte de esta fase.
2. **Adaptar la configuración existente por entorno.** Revisión/preview siempre excluidos. Producción indexable solo con aprobación y origen HTTPS validado. Añadir pruebas de ambos modos antes de cambiar flags: el verificador actual debe seguir bloqueando una apertura accidental mientras se prepara ese lote.
3. **Consolidar identidad URL.** Canonical autorreferente por ruta, sin parámetros; `og:url` e imagen social en el mismo origen aprobado. Decidir redirección de `/index.html`, alias y rutas antiguas a partir de evidencia. Evitar cadenas y no redirigir inexistentes indiscriminadamente.
4. **Unificar sitemap e inventario indexable.** Resolver la discrepancia actual entre `process.env.SITE_URL` e `import.meta.env.SITE_URL`. Inventario común para las ocho rutas con decisión explícita para Links y legales; sitemap solo con páginas canónicas indexables y referencia en robots cuando corresponda.
5. **GEO estructurado verificable.** Adaptar Church/PostalAddress actuales con identificador y URL estables; reutilizar dirección, horarios y pin confirmados para `geo`/`hasMap`, imagen y relaciones pertinentes. Incluir únicamente perfiles institucionales ratificados en `sameAs`; Instagram juvenil no representa automáticamente a toda la institución. No fabricar eventos, líderes, reseñas ni datos para completar campos.
6. **Validar y medir tras autorización.** Checks locales de ambos modos, HTTP/headers/canonical/sitemap real, validación de schema y publicación expresamente autorizada. Luego Search Console/Bing desde cuentas verificadas, coherencia con la ficha local y seguimiento de indexación y citas con línea base. Sin prometer rankings, rich results o plazos.

Próximo paso de mayor valor: aprobar origen y condiciones de lanzamiento para diseñar y probar el lote de configuración por entorno, manteniendo bloqueada la revisión hasta la autorización de publicación.

Conceptos de ingeniería aplicados: probar comportamiento en vez de etiquetas HTML accidentales; obtener nombres accesibles del texto visible; separar preparación técnica de autorización de indexación y de publicación.
