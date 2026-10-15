# Benchmark de iglesias

Fecha de consulta: **15/10/2026**. Se usaron sitios oficiales; las observaciones no comparan doctrina ni tamaño institucional. Capturas de primer viewport **1440×900 y 390×844**, con reduced motion, en [evidencia/benchmark](evidencia/benchmark/). Extracción de títulos, enlaces, texto y canonical en [externos.json](evidencia/externos.json). No se copiaron código, fuentes, imágenes o textos al producto.

**Límites:** no hay Lighthouse/CrUX comparable de estas iglesias, ni auditoría completa de teclado, accesibilidad o animaciones. Rendimiento externo queda **no medido** para todas. Que una página responda 200 o tenga canonical no demuestra que esté indexada ni que posicione mejor. Las capturas pueden mostrar recursos demorados, popups y cookies de esa sesión; no prueban fallos permanentes.

## Referencias e ideas aplicables

| Iglesia / URL oficial | Qué hace bien, observado | Qué hace peor que CCVS, o límite de comparación | Idea para adaptar | Complejidad / prioridad | Evidencia |
|---|---|---|---|---|---|
| **Passion City Church** — [Inicio](https://passioncitychurch.com/), [US](https://passioncitychurch.com/us/) | Jerarquía editorial, fotografía protagonista y mezcla sans/serif. US relaciona identidad y creencias | En móvil, Inicio también reserva casi toda la pantalla al manifiesto visual: no es una solución automática para encontrar horario. CCVS ya presenta una única localidad sin selector | Conservar lenguaje editorial actual, añadir información práctica propia. **No copiar cian ni fuentes comerciales** | Baja / P2 | `passion*` capturas, title/canonical y enlaces del DOM |
| **VOUS Church** — [sitio](https://www.vouschurch.com/) | Sección de visita con sedes/horarios/direcciones, ministerios por etapa y accesos a contenidos | Primer viewport móvil de esta sesión: video y popup de conexión reducen información práctica visible; CCVS abre sin ese popup | Relacionar horario, destino y próximo paso en un bloque simple; no replicar menú de megacongregación | Baja-media / P1 | `vous-390.png`, enlaces Visit y VOUS High en DOM |
| **The Belonging Co** — [sitio](https://thebelonging.co/) | “Plan a visit” claro, localidades/horarios y siguientes pasos comprensibles; fotografía consistente | Banner de cookies ocupa gran parte del viewport móvil. CCVS hoy evita esa interrupción | Una guía de primera visita breve. No trasladar calendario, college ni donaciones al MVP local | Baja / P1–P2 | `belonging-390.png`, texto de Locations/Next Steps, canonical |
| **Elevation Church** — [sitio oficial verificado](https://www.elevationchurch.org/), [contacto/FAQ](https://www.elevationchurch.org/contact) | Accesos a sedes, mensajes y preguntas de visita. La identidad oficial se verificó en dominio y página de contacto; no se usaron iglesias homónimas | Hero audiovisual sin imagen visible en nuestra captura y banner de privacidad grande; es límite de esa carga, no prueba de caída. CCVS conserva poster | Preguntas prácticas de visita y acceso claro a ubicación, con respuestas locales aprobadas | Baja / P2 | `elevation-*`, navegación DOM y página oficial de contacto |
| **TOMATULUGAR** — [sitio](https://tomatulugar.com/), [eventos](https://tomatulugar.com/eventos/) | Identidad consistente y acceso a eventos, formación y canales. El propio sitio enlaza Instagram de TTL Iglesia | Portada centrada en cartelería: poco texto institucional extraíble y pocos datos de visita en el DOM observado. CCVS explica mejor quién es y cuándo reúne | Separar canales juveniles/general sin ocultar información principal dentro de flyers | Baja / P2 | `ttl-*`; canonical y enlaces propios a `ttliglesia`, TTL Training y TTL Music |
| **Rey de Reyes, Buenos Aires** — [sitio](https://reydereyes.com.ar/), [creencias](https://reydereyes.com.ar/enquecreemos/) | CTA “Ver horarios” temprano; reuniones/dirección y página de creencias localizables | Muchas categorías y recursos; varios H1 en DOM. CCVS mantiene un H1 por ruta y arquitectura más acotada | CTA de horarios temprano, conservar claridad de un solo destino | Baja / P1 | `rey-*`, encabezados, canonical y enlace horario |
| **Catedral de la Fe, Buenos Aires** — [sitio](https://catedraldelafe.org/), [sedes](https://catedraldelafe.org/iglesias-en-extension/) | Reuniones presenciales/online y direcciones separadas por sede; agenda y servicio identificables | A 390, radio, contribución, logo y redes ocupan mucho alto antes del contenido. CCVS presenta un header compacto | Mantener dirección+reunión juntas; no sumar franjas promocionales o embeds innecesarios | Baja / P1 | `catedral-390.png`, horarios/sedes en texto oficial |
| **Centro Cristiano Familiar, Río Cuarto** — [sitio](https://www.iglesiaccf.org/) | Distingue horarios por grupo y acceso a contactos; nombra localidades y extensiones | `scrollWidth > 390` detectado en móvil en esa sesión; CCVS pasa las 42 comprobaciones. No se atribuye causa sin inspección adicional | Enlace de Instagram junto al grupo juvenil y un contacto confirmado junto a visita | Baja / P2 | `ccf-*`, overflow en JSON, texto que identifica Río Cuarto/Córdoba |
| **Iglesia La Misión, Villa Allende / Sierras Chicas** — [sitio](https://www.iglesialamision.com.ar/) | Identifica región y públicos, CTA de visita, dirección, Maps y canal de consulta. Distingue sedes | Homepage extensa y más objetivos comerciales/eventos. Hay énfasis reiterado en crianza; CCVS ofrece recorrido institucional más simple. No se midió cuál convierte mejor | Texto breve para alguien nuevo + CTA Maps + contexto regional verdadero, sin copiar su propuesta pastoral | Baja-media / P1–P2 | `mision-*`, DOM con “Cómo llegar”, Villa Allende y enlaces de sedes |
| **Cita con la Vida, Córdoba** — [sitio](https://citaconlavida.com.ar/) | El resultado recuperado del sitio oficial muestra reuniones por auditorio y “Ver mapa” | **Comparación visual no disponible:** Chromium devolvió `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`; herramienta web dio 502. No se califican diseño/mobile/animación actuales | Aprender de agrupar lugar+horario+mapa; no copiar noticias fechadas como si estuvieran vigentes | Baja / P1 funcional | Error registrado en JSON; [referencia municipal al sitio](https://turismo.cordoba.gob.ar/cita-con-la-vida/) y resultado del dominio oficial |

TOMATULUGAR se incluye como ecosistema ministerial vinculado a TTL Iglesia; no se presupone que su portada de eventos equivalga al sitio completo de una congregación local. Cita es referencia de comunicación regional con inspección parcial. CCF y La Misión ofrecen las dos comparaciones regionales efectivamente abiertas en navegador.

## Comparación transversal

| Criterio | Aprendizaje verificado | Decisión CCVS |
|---|---|---|
| Diseño | Passion y Belonging sostienen jerarquía con fotografía/tipografía | Mantener Archivo/Bodoni, madre/CCVS y #631918 |
| Navegación | Referentes internacionales segmentan muchas sedes/recursos | Conservar menú de tres grupos; reducir pasos de visita móvil |
| Mobile | Banners/popups pueden desplazar los objetivos principales | Preservar apertura limpia; compactar Links, sin overlays nuevos |
| Animación | Se observó presencia audiovisual; no se auditó toda la coreografía externa | Evaluar con evidencia propia, no copiar efectos por prestigio |
| Contenido | Sitios oficiales separan identidad, grupos y próximos pasos | Más información real para visitantes, sin trasladar doctrina |
| Visitantes | Horario + dirección + Maps es patrón útil nacional/regional | Completar ese circuito antes de más decoración |
| SEO observable | Passion, Belonging, TTL, Rey, Catedral y La Misión expusieron canonical; otras extracciones no lo encontraron | Configurar canonical propio al aprobar dominio; ninguna conclusión de ranking ajeno |
| Redes/multimedia | Canales contextuales ayudan a reconocer el destino | Instagram juvenil junto a Jóvenes; no convertirlo en Instagram general |
| Rendimiento | Sin medición comparable de terceros | No asignar notas ni afirmar ventaja de velocidad |
| Accesibilidad | Capturas detectan ocupación de pantalla; no verifican conformidad | Conservar suite local; completar manual/lector de pantalla |

## Orden recomendado

1. **P1:** patrón visita de VOUS/La Misión/Cita: cuándo, dónde, cómo llegar.
2. **P1:** CTA de horarios temprano, como Rey de Reyes, adaptado al header/hero aprobado.
3. **P2:** guía de primera visita, inspirada en el enfoque de Belonging/Elevation.
4. **P2:** redes asociadas a su grupo, como CCF, con los enlaces confirmados de CCVS.
5. **P2–P3:** revisar fotografía y tiempos de movimiento conservando la composición de Passion ya adaptada.

No hay fundamento para copiar la cantidad de páginas, CMS, tiendas, apps, formularios o infraestructura audiovisual de estas organizaciones. El benchmark compara decisiones visibles y utilidad para CCVS; no establece una competencia de fe ni un ranking general de iglesias.
