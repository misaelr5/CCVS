# Próximos pasos en comunidad — revisión local

Implementado el 20/10/2026. Ubicación: después de «En Cristo, crecemos juntos» y antes de la reunión general. Se conservan literalmente el eyebrow, título, introducción, descripciones y CTAs del pedido.

## Auditoría y decisión

- Árbol de trabajo limpio al comenzar; base local `dd2bcd5`.
- Astro 7.3.8, TypeScript estricto, Tailwind 4 y npm con lockfile. Node 24.15.0 / npm 11.12.1 en esta ejecución.
- Sitio estático, sin base de datos, autenticación ni API de aplicación. Configuración Astro/Vercel conservada.
- Home existente: portada y accesos rápidos → bienvenida → reunión general → banner → horarios → historia → niños/jóvenes → invitación → footer. El módulo crea un puente entre la presentación de la congregación y la información práctica; contiene solo sus tres CTAs.
- `/visitanos/` presenta horarios centralizados, dirección, primera visita y mapa; `/ministerios/` reúne encuentros regulares/programados; `/lo-que-creemos/` contiene introducción, fotografía y ocho fundamentos. Se enlazan estas páginas existentes.
- REUSE: `PhotoSection`, `Photo`, fotografías ya utilizadas en páginas internas, clases `shell`, `section-gap`, `kicker`, `serif`, `inline-link` y tokens `--paper`, `--surface`, `--accent`. Archivo y Bodoni Moda locales.
- ADAPT: `PhotoSection` admite `sizes` opcional; los consumidores anteriores mantienen el mismo valor predeterminado.
- BUILD: únicamente la composición editorial `NextSteps.astro`, con datos tipados locales y CSS encapsulado. No necesita una biblioteca de tarjetas, un CMS ni una nueva dependencia.
- Referencia técnica consultada: [imágenes de Astro](https://docs.astro.build/en/guides/images/). Se mantiene el procesamiento `astro:assets` ya instalado.
- Tres columnas por encima de 700 px y una columna hasta 700 px; márgenes del sistema existente (cambio adicional a 1100 px). Imágenes horizontales 16:10, números bordó, superficies neutras, radios de 14 px y CTAs alineados al pie.

## Archivos

| Archivo | Cambio |
| --- | --- |
| `src/components/NextSteps.astro` | Nueva sección con h2, tres h3, lista ordenada y tres enlaces. |
| `src/components/PhotoSection.astro` | Opción `sizes` para expresar el ancho de las tarjetas. |
| `src/pages/index.astro` | Importación e inserción del módulo. |
| `tests/next-steps.spec.ts` | 11 pruebas del módulo: responsive, teclado, enlaces, accesibilidad, sin JS y texto ampliado. |
| `docs/proximos-pasos.md` | Decisiones, evidencia y límites de la entrega. |

## Fotografías y accesibilidad

1. Conectate: `site.photos.visitMeeting`, congregación reunida; ya utilizada en Visitarnos.
2. Participá: `ministryPhotos.youth[1]`, encuentro de jóvenes; ya utilizada en Ministerios.
3. Crecé en la fe: `site.photos.beliefs`, lectura bíblica; ya utilizada en Lo que creemos. Recorte inferior para mantener visible la lectura.

Se inspeccionaron las tres imágenes antes de usarlas. No se repiten archivos fotográficos dentro de la home, no se agregaron imágenes externas/generadas y no hizo falta un fallback. Se conserva la procedencia del repositorio; esta tarea no constituye una auditoría legal independiente de permisos fotográficos.

`section` identificada mediante `aria-labelledby`; `ol` con semántica de lista explícita para preservar su anuncio aun sin marcadores CSS. Los números decorativos no duplican el orden anunciado por el lector de pantalla. No hay enlaces anidados ni tarjetas completas aparentemente clickeables. Los CTAs conservan el foco visible y altura mínima de 44 px.

Las fotografías mantienen dimensiones intrínsecas, proporción reservada, derivados WebP, `srcset` y carga lazy. No se agregó JavaScript ni hidratación: la sección participa del reveal global existente, cuyo comportamiento reduced motion permanece vigente. La ampliación de texto puede partir palabras largas para evitar recortes en las columnas.

## Validación

- `npm run check`: 85 archivos, 0 errores, 0 warnings, 0 hints.
- `npm run build`: ocho páginas estáticas.
- `npm run verify:static`: ocho rutas, 217 enlaces internos/anclas y 128 recursos válidos.
- `npm run test:e2e` con `CCVS_TEST_BASE_URL=http://127.0.0.1:4322`: **124 pruebas aprobadas en 3 minutos**, incluidas las 11 nuevas. La suite cubre navegación, menú, historial, reduced motion, video, mapa, ocho fundamentos y rutas responsive. Código de salida 0.
- `git diff --check`: sin errores.
- No existe un script de lint separado.
- Pruebas del módulo aprobadas en 320/360/375/390/430/768/1024/1440 px; sin desborde de página en los anchos solicitados (360–1440).
- Axe A/AA sin infracciones detectadas en el módulo a 390 y 1440 px. No equivale a certificación.
- CTAs con teclado, foco visible, destinos y atrás/adelante; lectura/enlace sin JavaScript; texto al 200% a 768 px.
- Revisión visual de capturas del módulo a 390/768/1440 y viewport a 390×844 / 1440×900.
- Capturas y logs: `qa-artifacts/next-steps/`. Los archivos `home-*.png` fuerzan la carga de imágenes solo durante QA para poder capturar la página completa; sus mediciones de bytes no representan una visita normal.

## Observaciones y límites

- La referencia adjunta contiene únicamente texto; no llegó una imagen de referencia. Se siguió la descripción de composición y la identidad existente.
- El 20/10/2026, consultas HTTP directas a la home publicada y `/visitanos/` devolvieron 200 y **20:30 en ambas**. No se encontró 19:30. La discrepancia mencionada no se reproduce actualmente; el código también toma 20:30 de `schedule.ts`. No se editó ningún horario.
- La prueba adicional de 320 px encontró desborde previo en `.home-principal`; el módulo nuevo permanece contenido. No se amplió el alcance para modificar esa sección.
- Términos y privacidad provisionales no se modificaron. Su aprobación institucional/jurídica sigue fuera de esta tarea.
- No se probaron dispositivos físicos, Safari, lectores de pantalla ni zoom nativo del navegador; se verificó reflow a 320 px en el módulo y ampliación de texto al 200%. No se midieron Lighthouse ni Core Web Vitals de campo.
- No se realizó commit, push ni despliegue.

## Revisión y aprendizaje

Abrir `http://127.0.0.1:4322/` mientras está activo el preview; para reiniciarlo, ejecutar `npm run preview -- --port 4322`.

El siguiente paso es revisar la composición en un teléfono real. Conceptos útiles: renderizar HTML estático evita JavaScript para contenido editorial; `srcset` ofrece resoluciones y `sizes` informa el ancho esperado; reservar la proporción de una foto evita que su carga empuje el contenido.

## Animaciones — actualización del 21/10/2026

- Cada tarjeta entra al llegar a su viewport usando el `IntersectionObserver` y `animateItem` existentes (680 ms, desplazamiento de 24 px y opacidad). El encabezado se anima por separado; las tarjetas inferiores en mobile esperan su propia aparición. El reveal no se repite al volver a hacer scroll.
- Se reutilizan las reglas compartidas de transición de las tarjetas y fotografías: elevación de 5 px en hover/foco (340 ms) y zoom fotográfico de 1.045 (800 ms). El hover de las tarjetas se limita a dispositivos con mouse.
- Mobile incorpora una presión de escala 0.98 durante el toque. Se añaden listeners pasivos mínimos al ciclo existente de `ui.ts`, sin librerías, nuevos observers ni hidratación. El estado se limpia al soltar, mover, cancelar, desplazar o desmontar la página mediante su `AbortSignal`.
- La entrada usa `translate` y la interacción `transform`; así no se sobrescriben. Reduced motion desactiva ambas. El CTA conserva la navegación normal, también sin JS.
- Archivos de esta actualización: `NextSteps.astro`, `ui.ts`, `global.css`, `next-steps.spec.ts` y este informe. Se preservan los cambios pendientes de la implementación anterior.
- Verificación específica: entrada individual, ausencia de repetición, hover, zoom, foco, presión táctil real mediante CDP, limpieza al mover/soltar, navegación y reduced motion. Capturas `hover-1440.png` y `touch-390.png` en `qa-artifacts/next-steps/`.
- Typecheck sin errores, build correcto y verificación estática de 217 enlaces/anclas y 129 recursos. Suite completa final: **126 pruebas aprobadas en 2,7 minutos**, código de salida 0; `git diff --check` sin errores. La cifra de 124 tests arriba corresponde a la entrega original.
- Mobile se comprobó con emulación táctil Chromium; queda pendiente la revisión en teléfono físico y Safari. Sin commit, push ni deploy.
