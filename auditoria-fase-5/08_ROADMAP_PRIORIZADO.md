# Matriz de hallazgos y roadmap

Fecha: **15/10/2026**. Propuestas **no implementadas**. La base editorial, logo madre, CCVS secundario, color, tipografías, menú en tarjeta y retroceso desde arriba se conservan.

## Matriz única de prioridades

**P0 confirmado: ninguno.** No se observó una caída de navegación, lectura general, seguridad o acceso que lo justifique. El bloqueo de rastreo es una decisión de revisión y un requisito pendiente para el lanzamiento, no una emergencia que autorice retirarlo ahora.

Impacto/urgencia/dificultad/riesgo son estimaciones cualitativas de ingeniería. “Urgencia alta” significa resolver antes de promover el sitio definitivo; no autoriza publicar cambios durante esta auditoría.

| ID | Categoría | Página/componente | Problema | Evidencia | Impacto | Urgencia | Dificultad | Riesgo modificación | Beneficio esperado | Prioridad |
|---|---|---|---|---|---|---|---|---|---|---|
| F01 | UX/local | Visitarnos/Links | Sin destino Maps habilitado | `links.ts:14–16`, `visitanos:11`; pin no verificable | Alto | Alta | Baja técnica / depende de confirmación | Bajo al validar destino | Completar llegada | P1 |
| F02 | Performance | Hero video | LCP móvil mediano 3,06 s; video de 8,44 MB | `hero-video.ts:23–29,73`; laboratorio final | Alto | Alta | Media | Medio editorial | Menos espera/datos | P1 |
| F03 | Lectura/a11y | Nosotros/historia | Texto negro invade foto oscura | `global.css:562`, captura nosotros-1440 | Alto | Alta | Baja | Bajo, ajuste local | Recuperar legibilidad del título | P1 |
| F04 | SEO/lanzamiento | Global | noindex y robots bloquean descubrimiento normal | `site.ts:120`, `robots.txt.ts:3`; público | Alto al lanzar | Alta al lanzar | Baja técnica | Alto si se habilita antes de aprobar | Permitir rastreo/publicación institucional | P1 condicionada |
| F05 | SEO | Metadata/sitemap | Sin canonical/og:url/sitemap por dominio pendiente | `BaseLayout:11,20`, sitemap:3; público 404 | Alto al lanzar | Alta al lanzar | Baja | Medio, URLs equivocadas | Consolidar URL y descubrimiento | P1 condicionada |
| F06 | Contenido/legal | Términos/recursos | Identificación legal y aprobaciones pendientes | `legal.ts:5–13`, avisos visibles | Alto institucional | Alta | Media/external | Alto si se inventan datos | Publicación revisada | P1 |
| F07 | Contenido | Historia | Cronología de donación y autonomía requieren ratificación | `history.ts:4,6`, pedido del usuario | Medio-alto | Alta editorial | Baja técnica | Medio institucional | Exactitud histórica | P1 |
| F08 | UX | Header/hero móvil | Visitarnos oculto y sin horario temprano | `global.css:155`, `EditorialHero:6` | Alto para nuevos | Alta | Baja-media | Medio, espacio aprobado | Menos acciones para visitar | P1 |
| F09 | Contenido/GEO | Visitarnos | Primera visita poco concreta | `visitanos:10` | Medio-alto | Media | Baja técnica | Medio, datos faltantes | Reducir incertidumbre | P2 |
| F10 | Identidad social | Head | Sin OG image/favicon | `BaseLayout:20`, DOM seis rutas | Medio | Media | Baja | Bajo con activos aprobados | Reconocimiento al compartir/buscar | P2 |
| F11 | UX/redes | Jóvenes | Instagram separado del contexto | `MinistryFeature:18`, `links.ts:10` | Medio | Media | Baja | Bajo | Un paso siguiente claro | P2 |
| F12 | SEO local | Presencia externa | Ficha pública no verificada; terceros ambiguos | enlace share.google, búsqueda de marca; informe 04 | Alto | Alta externa | Media | Alto si se edita ficha incorrecta | Identidad/destino coherentes | P1 verificación |
| F13 | GEO/schema | Layout | Church mínimo sin descripción/ID estable/redes | `BaseLayout:12`, validator de propuesta | Medio | Media | Baja | Medio, confundir grupo/entidad | Contexto semántico consistente | P2 |
| F14 | Mantenimiento | Documentación | README/deploy y pendientes desactualizados | Fotos actuales `site.ts:3–17`, HEAD, 78 tests | Medio | Media | Baja | Bajo | Evitar decisiones sobre estado viejo | P2 |
| F15 | UX | Links | Cabecera alta y sin regreso explícito a Inicio | `links:11`, captura 390 | Medio | Media | Baja | Bajo | Destinos más cercanos al entrar | P2 |
| F16 | Motion | Entradas/menú | Secuencias hasta ~880 ms menú y títulos 950 ms | `ui.ts:75–87,131` | Medio | Media | Baja-media | Medio, preservar estilo aprobado | Respuesta perceptiva más inmediata | P2 |
| F17 | CSS | global.css | Sobrescrituras y selectores heredados | reglas .home-schedule h2 y .sunday/.gatherings | Bajo-medio | Baja | Media | Medio por cascada | Facilitar mantenimiento | P2 incremental |
| F18 | QA/a11y | Suite | Incomplete axe, lector/Safari/zoom sin prueba completa | `rutas.json`, suite Chromium | Medio-alto | Alta antes de lanzamiento | Media | Bajo, diagnóstico | Completar cobertura | P1 validación |
| F19 | UX editorial | Inicio/galería juvenil | Repetición de reunión/fotos y recorrido largo | `index:17–21`, `MinistryFeature:11–15` | Medio | Baja | Media | Medio visual | Mejor relación información/scroll | P2 |
| F20 | SEO/UX | 404 | Respuesta correcta pero genérica de Vercel | público ruta inexistente 404 | Bajo | Baja | Baja | Bajo | Recuperar navegación | P2 |
| F21 | Mantenimiento | Horarios/identidad | Datos parcialmente repetidos | `visitanos:9`, `schedule.ts`, `BaseLayout:12` | Medio futuro | Baja | Baja | Bajo con verificación | Evitar divergencia | P2 |
| F22 | Hosting | Headers | _headers y Vercel expresan políticas diferentes | `public/_headers`, `vercel.json`, headers públicos | Bajo | Baja | Baja | Medio si se endurece sin probar | Configuración comprensible | P3 |
| F23 | Motion | Legal | Flecha decorativa sin ayuda práctica clara | `terminos-y-condiciones:7` | Bajo | Baja | Baja | Bajo | Simplificar lectura | P3 |
| F24 | Medición | Global | Sin evidencia de campo ni medición de tareas | ausencia de tracker/GSC disponible | Medio futuro | Media | Baja-media | Medio privacidad | Decidir con datos reales | P2, tras aprobación |

No son 24 errores independientes de código: se incluyen datos, decisiones de lanzamiento, verificaciones y oportunidades. Los IDs evitan duplicar el mismo problema en varios documentos.

## Fase A — Quick wins y prueba temprana del hero

| Tarea / IDs | Impacto / complejidad | Dependencias y riesgo | Criterio de aceptación | Archivos posibles |
|---|---|---|---|---|
| A1. Recuperar título de historia (F03) | Alto / baja | Sin datos externos; riesgo bajo sobre una regla puntual | Título legible sobre todos sus fondos en 768/1024/1440; sin cambiar composición general | `global.css`, `nosotros.astro` si fuera necesario |
| A2. Facilitar visita móvil (F08) | Alto / baja-media | Aprobar posición/texto; riesgo medio de espacio | Horario o CTA de visita en primera pantalla de 360/390; usable a 430 y con teclado | `SiteHeader`, `EditorialHero`, CSS, datos |
| A3. Revisar afirmaciones históricas (F07) | Alto institucional / baja técnica | Aprobación pastoral; riesgo de alterar sentido | Cronología y 2015 ratificados; sin inferencias de autonomía | `history.ts`, informe de aprobación |
| A4. Sincronizar documentación/datos repetidos (F14/F21) | Medio / baja | Estado real y responsable de horarios | README describe fotos/video/versiones actuales; una fuente de horario por dato | README, pendientes, `site.ts`, `schedule.ts`, Visitarnos/layout |
| A5. Prototipo medido de estrategia del video (F02) | Alto / media | Decisión editorial sobre autoplay; riesgo medio | Misma metodología de tres repeticiones; menor payload y objetivo LCP ≤2,5 s sin perder poster/controles/reduced motion | `HeroVideo`, `hero-video.ts`, script de preparación/media |

A5 entra temprano por prioridad; Fase D consolida y vuelve a validar. No dejar performance detrás de decoración.

## Fase B — SEO local y GEO

| Tarea / IDs | Impacto / complejidad | Dependencias y riesgo | Criterio de aceptación | Archivos/sistemas posibles |
|---|---|---|---|---|
| B1. Ratificar ficha local y pin (F01/F12) | Alto / baja técnica | Confirmación humana del salón y ficha; riesgo alto de entidad homónima | Nombre/dirección/categoría/horarios/web documentados, destino abre lugar correcto en celular; sin reclamar perfil sin pedido | `links.ts`, Visitarnos/Links; registro institucional |
| B2. Definición institucional + FAQ real (F09/F13) | Medio-alto / baja | Datos y aprobación pastoral | Preguntas de visita respondidas sin inventar edades/duración/acceso; relación con Comunidad Cristiana clara | `site.ts`, Nosotros, Visitarnos |
| B3. Dominio y schema (F05/F13) | Alto / baja-media | Dominio aprobado y activos autorizados; riesgo medio | Canonical/og:url propios, sitemap de rutas canónicas; Church válido, sameAs correcto y sin geo/horarios supuestos | Astro config, layout, sitemap/robots, variables del build |
| B4. Preparar Search Console (F04/F24) | Alto de verificación / baja | Titularidad del dominio y autorización; no modificar cuentas ahora | Propiedad verificada y plan de revisión de cobertura/consultas; sitemap preparado. Activar rastreo solo con salida aprobada de Fase D | DNS/hosting/Search Console; documentación |

## Fase C — Refinamiento UX/UI

| Tarea / IDs | Impacto / complejidad | Dependencias y riesgo | Criterio de aceptación | Archivos posibles |
|---|---|---|---|---|
| C1. Redes contextuales y Links compacto (F11/F15) | Medio / baja | Canales confirmados; riesgo bajo | Jóvenes conduce a su Instagram en un clic; hub conserva destinos, mejora visibilidad inicial y regreso al sitio | `MinistryFeature`, Links, CSS |
| C2. Ajustar ritmo y galerías (F16/F19/F23) | Medio / media | Aprobar selección, preservar menú sin fades; riesgo medio visual | Contenido práctico no espera stagger largo; secuencia coherente, sin bloquear lectura, reduced motion intacto | `ui.ts`, CSS, componentes de galería/Legal |
| C3. Consolidación CSS limitada (F17) | Medio / media | Prueba por selector/componente; riesgo de cascada | Diff acotado, capturas sin regresión en siete anchos; eliminar reglas solo con evidencia de no uso | `global.css` y estilos locales si procede |
| C4. Social preview/404 (F10/F20) | Medio / baja | Logo/foto autorizados; riesgo bajo | Favicon visible, OG con imagen/URL correcta; 404 con acceso a Inicio/Visitarnos | layout, `public/`, futura `404.astro` |

## Fase D — Optimización final y preparación de publicación

| Tarea / IDs | Impacto / complejidad | Dependencias y riesgo | Criterio de aceptación | Archivos/sistemas posibles |
|---|---|---|---|---|
| D1. Revisión institucional/legal (F06/F07/F12) | Alto / externa | Entidad/contacto, copy/doctrina, permisos de fotos/video, horarios | Aprobaciones registradas; términos ya no prometen completar datos; canal real | datos, legal, recursos y documentos |
| D2. QA final (F02/F03/F18) | Alto / media | Cambios anteriores completos | check/build/static/E2E pasan; teclado, forward/back desde arriba, hashes, sin JS, reduced motion y capturas; Safari/dispositivo/lector/zoom revisados o límites explícitos | pruebas y artefactos QA |
| D3. Hosting/SEO de lanzamiento (F04/F05/F22) | Alto / baja-media | D1 y autorización explícita de publicación | URL definitiva, headers/redirects/404 correctos; robots y noindex coherentes con entorno; schema validado sobre HTML final | config/layout/robots/sitemap/Vercel |
| D4. Medición proporcional (F24) | Medio / baja-media | Elección de proveedor, privacidad y autorización | Una vista/evento por navegación o clic, sin duplicados Astro ni datos personales; presupuesto de red validado | layout, módulo analítica futuro, política |

**Publicar requiere un pedido posterior.** Esta auditoría termina sin activar indexación, instalar analíticas, conectar cuentas, editar fichas ni desplegar.

## Analítica futura: comparación y decisión

Se aplicó la guía `analytics` únicamente para diseñar la medición. Fuentes oficiales consultadas el 15/10/2026: [Search Console](https://support.google.com/webmasters/answer/9128668), [GA4](https://marketingplatform.google.com/about/analytics/), [configuración GA4](https://support.google.com/analytics/answer/9304153), [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/), [sus límites funcionales](https://developers.cloudflare.com/web-analytics/faq/), [Plausible y privacidad](https://plausible.io/data-policy), [eventos Plausible](https://plausible.io/docs/custom-event-goals), [planes](https://plausible.io/).

| Herramienta | Objetivo/métricas | Complejidad/coste | Privacidad/impacto | Mantenimiento/adecuación |
|---|---|---|---|---|
| Search Console | Indexación, consultas, impresiones y clics desde Google; informe generativo según datos disponibles | Baja; gratuito | Verificación de propiedad; no requiere beacon de visita para esos informes | **Primera elección** para descubrimiento; no mide clics a Maps dentro del sitio |
| GA4 estándar | Eventos, fuentes, recorridos y conversiones configuradas | Media; versión estándar gratuita | Script/requests y configuración de consentimiento/retención; excluir identificadores, publicidad y datos sensibles | Más capacidad de la necesaria para este MVP; usar solo con una pregunta que lo justifique |
| Cloudflare Web Analytics | Visitas y rendimiento/CWV agregados | Baja; servicio disponible sin migrar obligatoriamente hosting | Beacon adicional, orientado a privacidad; no se midió su coste exacto aquí | Bueno para tráfico/rendimiento; **no soporta custom events ni UTMs según FAQ consultada**, por lo que no cubre la lista de clics pedida |
| Plausible alojado | Páginas, referencias y eventos/objetivos configurables | Baja-media; suscripción según tráfico/plan, sin cotización fija en esta auditoría | Sin cookies/persistencia entre días según proveedor; procesa datos para agregación, requiere revisar política y contrato | Alternativa proporcionada si se necesita medir Maps/redes; menor operación que autoalojar |

Recomendación: **Search Console primero**. Después, si hay presupuesto y decisiones basadas en clics, evaluar Plausible; si solo interesa tráfico/CWV y coste mínimo, Cloudflare con aceptación explícita de sus límites. No instalar dos beacons por defecto. GA4 no queda descartado, pero hoy añade configuración sin una necesidad demostrada. Autoalojar analítica implica servidor, actualizaciones y copias: no encaja con el MVP sin backend.

### Plan de eventos mínimo, sin implementar

| Evento | Disparador | Propiedades permitidas | Decisión que informa |
|---|---|---|---|
| `page_view` | Entrada/cambio de ruta confirmado | pathname, origen agregado | Cuántas visitas llegan a `/visitanos/`, `/links/`, `/ministerios/` |
| `maps_click` | Clic en destino Maps verificado | ubicación del enlace: visita/links/footer | Si el recorrido conduce a instrucciones de llegada |
| `social_click` | Clic Instagram/Facebook/YouTube | destino enumerado, ubicación del enlace | Qué canales sirven a visitantes |
| `schedule_click` | Clic en horario/ancla | principal/oración/jóvenes/niños, ubicación | Si encuentran reunión relevante |
| `hub_navigation` | Clic desde Links a ruta propia | destino de ruta | Uso de bio-link |
| `ministry_navigation` | Clic hacia bloque/grupo | identificador de grupo, origen | Acceso a las actividades reales |

Una navegación a Visitarnos es una intención, **no una asistencia confirmada**. Para atribuir desde Instagram puede usarse campaña sin datos personales en el enlace de bio, si el proveedor elegido soporta UTMs. Registrar solo el evento necesario, no reconstruir perfiles individuales de creencia religiosa.

Antes de añadir tracker: informar tratamiento real, proveedor/transferencias, finalidad, retención y canal de derechos; revisar necesidad de consentimiento según alcance y configuración. La [Ley argentina 25.326](https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/texto) incluye convicciones religiosas entre datos sensibles. No enviar nombres, teléfonos, pedidos de oración, mensajes, correos ni URLs con esos datos. “Sin cookies” no sustituye revisión de privacidad. Esta es una lista de aspectos a revisar, no una aprobación jurídica.

Con ClientRouter hay que verificar pageviews en `astro:page-load`/historial y cleanup, sin duplicar disparos del proveedor. Criterio: entrar, navegar, retroceder y avanzar produce la cantidad esperada; un clic emite una sola acción. No hace falta GTM, fingerprinting o session replay para estas preguntas.

## Próxima decisión y aprendizaje

El siguiente paso de mayor valor es aprobar **Fase A** y confirmar pin/datos históricos con la iglesia. El roadmap permanece detenido hasta esa elección.

Conceptos útiles: (1) una web estática puede conservar interacciones con mejora progresiva; (2) rastreo, indexación y publicación institucional son estados diferentes; (3) laboratorio, datos de campo y recorridos reales responden preguntas distintas. Optimizar la métrica sin completar el recorrido de visita no cumple el objetivo.
