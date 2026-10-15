# Rendimiento y accesibilidad

Fecha: **15/10/2026**. Evidencia principal: [laboratorio.json](evidencia/laboratorio.json), [rutas.json](evidencia/rutas.json), [playwright.json](evidencia/playwright.json), capturas completas y código actual.

## Método y alcance de performance

Windows, Node 24.15.0, **Chromium 156.0.8078.4** headless, salida compilada servida por Astro preview en `http://127.0.0.1:4322`. Tres contextos nuevos por ruta/perfil, caché deshabilitada, movimiento normal, ventana de observación de diez segundos desde DOMContentLoaded, sin scroll ni interacción. Doce ejecuciones finales, realizadas después de la suite E2E y el primer benchmark.

- Móvil: viewport 390×844, DPR 1, CPU **4×**, descarga **1,6 Mbps**, subida 750 kbps, latencia configurada 150 ms mediante CDP. No es un teléfono físico ni un perfil Lighthouse.
- Desktop: 1440×900, DPR 1, CPU/red sin limitación, servidor local.
- `PerformanceObserver`: LCP, cambios de layout sin entrada reciente y long tasks. CLS calculado por ventanas de sesión; LCP es último candidato observado en esa ventana.
- `Network.dataReceived` captura payload de solicitudes, incluyendo video que sigue abierto. Resource Timing por sí solo **omitía parte del video**, por eso no se presenta su suma como peso total.
- La exploración inicial coexistió con E2E; se reemplazó por estas tres repeticiones por perfil. La configuración no reproduce latencia de usuarios hasta Vercel ni diversidad de dispositivos.

## Resultados de laboratorio

| Ruta / perfil | LCP mediano (rango) | CLS mediano | TTFB mediano local | Payload observado en ventana |
|---|---:|---:|---:|---:|
| Inicio, móvil | **3,060 s** (3,048–3,160) | 0,00045 | 3,8 ms | 1,58–2,17 MB |
| Visitarnos, móvil | **1,028 s** (1,004–1,088) | 0,00161 | 3,1 ms | 0,139 MB |
| Inicio, desktop | **0,280 s** (0,244–0,352) | 0,00076 | 3,6 ms | 6,49–6,95 MB |
| Visitarnos, desktop | **0,164 s** (0,164–0,188) | 0,00188 | 2,8 ms | 0,158 MB |

MB decimales. Payload observado no equivale a descarga completa ni incluye todas las cabeceras/protocolo. **TTFB es de localhost**, no del hosting ni de una conexión regional. Los valores desktop especialmente bajos no son una promesa de producción. CLS bajo solo cubre estas ventanas; falta sesión completa.

Inicio móvil supera la referencia orientativa de LCP ≤2,5 s; el último candidato fue el **video móvil** en las tres ejecuciones. Visitarnos muestra una base textual bastante más liviana. Esto identifica una prioridad de medición/optimización del hero; no cuantifica cuánto mejorará cada propuesta sin volver a medirla.

**INP real: no disponible.** No se midió percentil 75 de usuarios, ni CrUX/RUM ni un INP representativo con interacciones. Las long tasks registradas no son INP ni una puntuación TBT de Lighthouse. Objetivos de campo: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1; verificar p75 con datos adecuados. [Referencia oficial de Web Vitals](https://web.dev/articles/vitals).

## Presupuesto de recursos

| Recurso | Medición | Interpretación |
|---|---:|---|
| Script UI/video/scroll | 9.681 B; gzip 3.418 B | Adecuado, sin framework de hidratación |
| Astro ClientRouter | 16.365 B; gzip 5.575 B | Reutilizar; quitarlo perdería transiciones aprobadas |
| JS total de esos bundles | **26.046 B; gzip 8.993 B** | No es el principal problema de peso |
| CSS compilado compartido | 55.408 B; gzip 12.554 B | CSS global incluye reglas heredadas; no se midió porcentaje inutilizado |
| Fuentes efectivamente descargadas en Inicio frío | Archivo 90.104 B + Bodoni 25.884 B | 115.988 B, locales; no sustituir familias aprobadas |
| Fuentes disponibles en build | 7 archivos; 286.452 B | No todos se descargan por visita; no sumar como carga inicial |
| Video móvil | **8.441.049 B** | Autoplay con movimiento normal; 1,25–1,84 MB de video observados en ventanas móviles |
| Video desktop | **14.839.646 B** | 5,83–6,29 MB de video observados en ventanas desktop |

Los gzip son tamaños calculados sobre archivos, no garantía de transferencia idéntica en todos los hosts. Se observó compresión Brotli en HTML público y cache HIT en la petición guardada; no se midió hit ratio global. `publico.json` registra headers reales.

`HeroVideo.astro:7–8` prioriza poster, `preload="none"`; **`hero-video.ts:73` inicia reproducción y carga automáticamente**, así que preload none no impide la descarga al ejecutar JS. Pausa fuera del viewport/ocultación y limpieza al navegar son buenas decisiones (`:55–70`). Reduced motion no carga video hasta reproducción manual, probado por E2E.

Imágenes: WebP con dimensiones, srcset y carga diferida en `PhotoSection.astro:11`. El `sizes` compartido de 60vw en desktop es conservador para galerías pequeñas: oportunidad de ajustar por componente, **no prueba de un ahorro medido**. La galería juvenil y fotos repetidas requieren una selección editorial; no eliminar imágenes a ciegas.

## Recomendaciones de rendimiento

1. Evaluar poster inicial + reproducción voluntaria en móvil, o cargar después de estabilizar el contenido; preservar controles y autorización editorial. Considerar `saveData` cuando exista, con fallback, sin depender de su soporte universal.
2. Comparar duración/resolución/bitrate de los dos videos y repetir el mismo laboratorio. No hace falta un servicio de streaming ni librería nueva para este caso.
3. Auditar `sizes` por hero, media página y galería. Mantener formatos/dimensiones y lazy loading actuales.
4. Consolidar CSS por componente solo al modificarlo; medir antes de purgar. No tratar 12,6 kB gzip como una crisis.
5. Tras dominio/publicación aprobados, medir hosting con Lighthouse/PSI y campo. **Lighthouse no disponible localmente en las ubicaciones comprobadas; no se ejecutó ni se inventan puntuaciones.**

## Accesibilidad: comprobado y pendiente

| Área | Evidencia / resultado | Límite o acción |
|---|---|---|
| Semántica y títulos | Un H1 por página; main/nav/address, botones nativos y skip link | Jerarquía de ministerios usa varios H2: válido, no error SEO automático |
| Imágenes | Suite comprueba alt, width y height; decoración con aria-hidden | Revisión humana de pertinencia del alt y permisos sigue siendo necesaria |
| Teclado | Apertura/cierre menú, Escape, foco, anclas y acordeón Enter/Espacio probados | No se probó con lector de pantalla real |
| Menú | Dialog no modal; Tab puede salir; no trampa de foco; aria-expanded/controls | Conservar comportamiento solicitado, sin imponer modal |
| Objetivos táctiles | Menú 44/48 px, botones sociales 44 px, pills ≥48 px | No se certificaron todas las excepciones de WCAG 2.2 target size |
| Reduced motion | Entradas/scroll/transiciones canceladas; video manual | Debe revalidarse si se cambia CSS o el video |
| Sin JS | Navegación alternativa, doctrina abierta y poster disponibles | Prueba funcional, no sesión con navegador asistivo |
| axe automático | Doce análisis nuevos con tags WCAG 2 A/AA, 2.1 y 2.2 AA: **cero violations** | Hay resultados **incomplete**, especialmente contraste, aria-valid-attr-value y video-caption. Requieren revisión; cero violations no equivale a cero problemas |
| Contraste sobre foto | Lectura degradada observada en título de historia a 1440 (`global.css:562`) | Corregir ese cruce texto/foto; medir todos sus fondos tras ajuste |
| Video | Hay pausa/sonido, fallback y estado accesible; no hay pista `<track>` | Determinar si audio contiene discurso significativo: si lo hay, evaluar subtítulos/transcripción y alternativas según contenido. No se comprobó el audio completo |
| Zoom/espaciado/orientación | No ejecutados exhaustivamente | Pendiente manual de 200/400 %, spacing y orientación |

No se encontraron formularios. No se inventan etiquetas de campos ausentes. Los textos de 10–13 px en header/notas legales merecen revisión de legibilidad, pero **un tamaño pequeño por sí solo no prueba incumplimiento WCAG**.

## Seguridad práctica

Sitio estático, sin endpoints propios ni secretos versionados detectados por inventario de archivos de entorno; no se imprimieron credenciales. `npm audit` dio cero avisos conocidos. Headers públicos comprobados: `nosniff`, referrer policy, SAMEORIGIN y HSTS. `public/_headers` propone DENY y Permissions-Policy, pero Vercel sirve la configuración de `vercel.json`: no asumir que ese archivo se aplica a todos los hosts. Unificar intención es deuda menor; no hay evidencia de explotación.

Una CSP podría evaluarse al introducir integraciones, pero no se recomienda bloquear recursos a ciegas ni declarar que su ausencia constituye por sí sola un incidente. `robots.txt` y `noindex` no son controles de acceso para material privado.
