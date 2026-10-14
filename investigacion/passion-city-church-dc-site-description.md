# Descripción del sitio: passioncitychurchdc.com

Documento de contexto para un agente de código (Codex). Resume estructura, contenido, componentes y comportamiento del sitio, relevado el 14/10/2026 a partir del HTML renderizado como texto de cada página y del sitemap.

Limitación del relevamiento: se leyó el contenido y la estructura, no el CSS ni el render visual. Los colores, tipografías y espaciados NO están documentados aquí; para eso conviene inspeccionar el sitio en un navegador o pedir el CSS. Lo marcado como "inferido" no está confirmado.

---

## 1. Qué es el sitio

Sitio oficial de la sede de Washington DC de Passion City Church (iglesia cristiana evangélica, parte del movimiento Passion, fundado por Louie y Shelley Giglio). Es un sitio institucional y de captación orientado a:

1. Visitantes nuevos: horarios, ubicación, estacionamiento, qué esperar.
2. Miembros: eventos, grupos, formación (CORE), voluntariado ("Door Holders"), donaciones.
3. Servicio comunitario: alianzas locales en DC (For the City, LOVE DC).

Lema: "For God. For people. For the city. For the world." Autodefinición recurrente: "We are a Jesus Church."

Idioma: inglés (en_US). Zona: Washington DC y área metropolitana (DMV: DC, Maryland, Virginia).

## 2. Stack técnico (inferido por URLs y metadatos)

- WordPress: rutas `/wp-content/uploads/AAAA/MM/...`, páginas por `?page_id=NNN`, favicon `cropped-favicon-2` (típico de WP). Metadatos tipo Yoast/similar (og:*, twitter:*, robots con `max-snippet`).
- Custom post types visibles en el sitemap: `event` (`/event/<slug>/`), `video` (`/video/<slug>/`) y `article` (`?post_type=article&p=NNN`).
- Google Tag Manager: contenedor `GTM-WT2MSM`.
- Sistemas de terceros enlazados:
  - Planning Center/Church Community Builder: `passioncitychurchdc.ccbchurch.com/goto/forms/<id>/responses/new` (RSVP, inscripciones, solicitudes de servicio, bautismo, grupos).
  - Donaciones: Pushpay (`pushpay.com/g/passioncitychurchdc`). Antes usaban Kindrid.
  - Empleo: Breezy HR (`passiondc.breezy.hr`, `passion.breezy.hr`).
  - Formularios: Formstack (`passion-forms.formstack.com`) y Google Forms (estudiantes).
  - Conexión/voluntariado: `connect.passion.team`, `connect.passioncitychurch.com`.
- Video de fondo en la página "Our Story": `/wp-content/uploads/2023/03/GlobalPageBroll_V2.mp4`.
- Descargable: libro "US" en PDF (`passioncontent.s3.amazonaws.com/USBooklet/PCC_US_Book.pdf`) y "Full Statement of Beliefs" en PDF (`/wp-content/uploads/2026/06/PCC-Full-Statement-of-Beliefs.pdf`).

## 3. Layout global (se repite en todas las páginas)

### 3.1 Cabecera
- Enlace "Skip to Content" (`#maincontent`) para accesibilidad.
- Barra superior con enlaces: Our Story (`/us/`), Our Beliefs (`/beliefs/`), Latest Talk (externo a passioncitychurch.com), Give (`/give/`), Join Our Team (`passiondc.breezy.hr`).
- Selector "Locations": Atlanta (`passioncitychurch.com/atlanta`) y Washington, DC (`/`).
- Botón "Upcoming Events" (`/events/`).
- Botón "Menu" que abre un menú desplegable/overlay con tres columnas:
  - Who We Are: Our Story, Our Beliefs, Latest Talk, Give, Join Our Team.
  - Your Next Step: Welcome to Church (`/welcometochurch/`), Become a Door Holder (`/doorholders/`), Find Community (`/community/`), Get Baptized (`/baptism/`), Serve Our City (`/forthecity/`).
  - The Passion Movement: Passion Conferences, sixstepsrecords, Passion Equip, Passion Publishing, Passion Resources (todos externos).
- Banner/ticker superior con el lema y un enlace al próximo evento destacado (en la home: "CORE — Essential Theology 09.28.26"). En varias páginas el banner está desactualizado (ver sección 7).

### 3.2 Pie de página
- Columnas: Our House (Our Story, Our Beliefs, Our Leadership `/leadership/`, Join Our Team `/join-our-team/`), Locations, The Passion Movement.
- Bloque "Stay up to date with Passion": formulario de suscripción por email (ver sección 7: no renderiza).
- Copyright "© 2026 Passion City Church DC".
- Legales: Cookie Policy, Terms + Conditions, SMS Terms + Conditions (y Privacy Policy en el sitemap).
- Redes: Facebook, Instagram, YouTube. En la home y páginas de DC apuntan a cuentas de DC (`passioncitydc`); en otras páginas apuntan a las cuentas generales de Passion City Church.

### 3.3 Componentes reutilizables
- Hero con título grande (a veces dos niveles: "Heartbeat / of Generosity", "ABOVE / + BEYOND") e imagen de fondo.
- Tarjetas con imagen + título + párrafo + botón "Learn More".
- Listado de eventos con "Search" y "Filter By" (carga dinámica; ver sección 7).
- Acordeón "Frequently Asked Questions" (el contenido no aparece en el HTML leído; se carga por JS o está colapsado).
- Bloques de pastores con foto, rol, biografía corta y enlace "Read more".
- Secciones con versiones duplicadas del texto (una versión "colapsada" con botón y otra expandida), lo que sugiere un patrón de tarjeta expandible/tab.
- Botones de acción (CTA) casi siempre enlazan a formularios externos (CCB, Pushpay, Formstack).

## 4. Mapa del sitio (URLs principales)

| URL | Función |
|---|---|
| `/` | Home de la sede DC: horarios, ubicación, ministerios por edad, eventos, liderazgo |
| `/us/` | Our Story: historia, valores, ubicaciones, liderazgo global |
| `/beliefs/` | Our Beliefs: 10 creencias |
| `/leadership/` | Pastores de cada sede y junta directiva |
| `/give/` | Donaciones (Pushpay, texto, correo, acciones) |
| `/beyond/` | Campaña "Above + Beyond 2026" (ofrenda especial) |
| `/ab-giving-buttons/` | Página auxiliar de botones de donación (en sitemap) |
| `/sundays/` | Info para primera visita a los servicios dominicales |
| `/welcometochurch/` | Sesión mensual de bienvenida |
| `/community/` | Hub de comunidad (Neighborhood Nights, Family Groups, CORE) |
| `/communitygroups/` y `/neighborhoodnights/` | Grupos comunitarios (contenido desactualizado) |
| `/doorholders/` | Voluntariado (equipos de servicio) |
| `/forthecity/` | Servicio a la ciudad y organizaciones aliadas |
| `/love-dc/` | Evento anual de servicio LOVE DC |
| `/baptism/` | Bautismo (marcada `noindex`) |
| `/kids/`, `/dc/bloom/`, `/dc/students/` | Ministerios por edad |
| `/40plus/` | Página heredada que hoy habla de CORE |
| `/sabbath/` | Domingo de Sabbath (sin reuniones el 9 de agosto) |
| `/start/` | Página en sitemap, no relevada en detalle |
| `/events/` | Listado de eventos |
| `/event/<slug>/` | Detalle de evento (cientos, desde 2024) |
| `/video/<slug>/` | Archivo de mensajes/predicaciones (2020 a 2026) |
| `/join-our-team/` | Empleo en Passion |
| `/privacy-policy/`, `/cookiepolicy/`, `/terms-and-conditions/`, `/sms-terms-conditions/` | Legales |

Volumen aproximado del sitemap: unas 30 páginas estáticas, más de 190 eventos y más de 100 videos. Los eventos se repiten por series (por ejemplo `welcome-to-church-1` a `-38`, `neighborhood-nights-dc-1` a `-12`, `neighborhood-nights-virginia-1` a `-11`, `core-*`, `college-night-*`).

## 5. Descripción página por página

### Home (`/`)
Orden de secciones:
1. Hero "DC — Located at The Lincoln Theatre", dirección 1215 U St NW, Washington, DC 20009. Horarios: domingo 9:30a y 11:30a.
2. "Sunday Morning / What to Expect": tres tarjetas con foto:
   - Getting Here: estacionamiento gratis en la calle los domingos; garaje Franklin D Reeves Center Garage en U St abierto de 8a a 3p.
   - Gathering Details: descripción de las reuniones dominicales.
   - Family Ministries: ubicados en 1201 U St NW (a pocas puertas del teatro). Niños de 6 semanas a 5.º grado en ambos horarios; secundaria y preparatoria solo en el de 11:30a.
3. "Upcoming Events": widget con búsqueda y filtro, "See More Events" lleva al listado.
4. Campaña destacada "Above + Beyond" (imagen + texto + "Learn More" a `/beyond/`).
5. Ministerios "All Ages": bloom (6 semanas a Pre-K), Passion Kids (K a 5.º), Passion Students (6.º a 12.º), cada uno con enlace.
6. "Become a Door Holder / Get Involved": explica por qué dicen "Door Holders" en lugar de "voluntarios". CTA a `/doorholders/`.
7. "Looking for parking? Free Parking": con botón "Directions" a Google Maps.
8. "Leadership": Ben + Donna Stuart (Lead Pastor DC) y Louie + Shelley Giglio (Global Pastor), con "Read more" a `/leadership/`.
9. Pie con suscripción por email.

### Our Story (`/us/`)
- Título "US" y subtítulo "Glory of God. Radical Grace. Extravagant Worship."
- Bloque "What We Believe" que enlaza a `/beliefs/`.
- "Our History": video de fondo y texto. Resumen: Passion City Church nació de la visión de Louie y Shelley Giglio; reuniones en casas desde 2008; primer servicio el 15 de febrero de 2009 en The Tabernacle (Atlanta); sedes 515, Cumberland y Trilith en Atlanta; la sede de DC empezó en abril de 2018.
- "Our Cities + Locations": tarjetas de Atlanta y Washington DC.
- "Our Leadership": Louie + Shelley Giglio.
- Sección "US" con botón para descargar el booklet en PDF (valores y estándares).

### Our Beliefs (`/beliefs/`)
Lista numerada de 10 creencias, cada una con título y párrafo corto: 1 Knowable Truth, 2 One God, 3 Uniqueness of Christ, 4 Grace Life, 5 Indwelling Power, 6 God's People, 7 The Knowledge of the Holy, 8 Whole Life Worship, 9 His Renown, 10 Community of Faith. Enlace a PDF con la declaración completa. Cierra con bloque "About Passion City Church" hacia `/us/`.

### Leadership (`/leadership/`)
- Intro del equipo y Louie + Shelley Giglio (Global Pastor).
- "Location Pastors": Ben + Donna Stuart (DC), Brad + Brittany Jones (Atlanta 515), Grant + Maggie Partrick (Cumberland), Dan + Jo Watson (Trilith). Cada uno con foto, bio corta y botón a su sede (los de Atlanta apuntan a `?page_id=` internos del mismo dominio).
- "Our Board": lista de 8 miembros de la junta de Passion, Inc. (nombre y cargo).

### Give (`/give/`)
- Hero "Heartbeat of Generosity" con botón "Give Online" (Pushpay).
- Aviso de migración: la iglesia pasó de Kindrid a Pushpay; los regalos recurrentes no se transfieren automáticamente; hay una guía descargable (`passiondc.link/givingsetup`) y ayuda presencial en el lobby los domingos.
- "Ways to Give": Online (Pushpay), Text to Give (texto "GIVE + monto" a un número de EE. UU.), Gifts by Mail (cheque a "Passion City Church DC", dirección 1201 U St NW), Giving Stock (por email a give@passioncitychurchdc.com).
- Bloque "Generosity is Normal" y acordeón FAQ.

### Above + Beyond (`/beyond/`)
Campaña de ofrenda especial. Título "ABOVE + BEYOND". Texto explicativo, botón "Give Now" (Pushpay con parámetros de fondo), tres formas de dar (online, correo con "ABOVE+BEYOND" en el memo, otras vías por email) y FAQ. La home muestra una versión tarjeta de esta campaña.

### Sundays (`/sundays/`)
Encabezado con dirección y horarios, sección "First Time? We Can't Wait to Meet You!" con video, estacionamiento, "Family Ministries" (tres tarjetas) y llamado a "Welcome to Church".

### Welcome to Church (`/welcometochurch/`)
Sesión mensual de introducción (historia, creencias, conocer a líderes). Tras la sesión hay una breve inducción para quienes quieran ser Door Holders. Lista de "Upcoming Sessions" cargada dinámicamente y bloque "Who We Are".

### Community (`/community/`)
Hub organizado en tres ideas: adorar a Dios con otros, crecer sirviendo/perteneciendo/aprendiendo, ayudar a otros a hacer lo mismo. Tarjetas con CTA:
- Neighborhood Nights: cenas mensuales gratuitas en barrios (DC y Virginia), con RSVP.
- Family Groups: grupos de 4 a 12 personas (hombres, mujeres, parejas casadas), con registro de interés.
- CORE: formación teológica; "Essential Theology" (28 y 29 de septiembre, 7 a 9 pm, en 1201 U St) y "Exploring Christianity" (cuatro lunes: 5 y 19 de octubre, 2 y 16 de noviembre), ambos con RSVP.
- Eventos próximos (widget) y FAQ.

### Door Holders (`/doorholders/`)
Explica el término (Salmo 84:10) y lista de equipos donde servir, cada tarjeta con foto y botón "Apply to Serve" al mismo formulario CCB: Experience, Environments, Hospitality, Media, Operations, Production, Resources, bloom, Passion Kids y Worship.

### For the City (`/forthecity/`)
Versículo Mateo 5:16. Explica el enfoque: mejorar resultados de niños y familias en cuatro áreas (Health & Safety, Education, Economic Security, Family Stability) con enfoque de tres niveles (helping, healing, transforming). Dice colaborar con más de 50 organizaciones; muestra 12 socios principales con descripción y enlace externo (Bethany House, Breadcoin, Capitol Hill Pregnancy Center, Cornerstone Schools, Central Union Mission, Garrison Elementary, MPD 3D Outreach, Raising A Village, Shaw Community Center, The House D.C., Unique Learning Center, Young Lives). Sección "Apply to Serve" con dos formularios Formstack (Door Holders actuales y no Door Holders). Requiere asistir a una clase "For the City Equipping". Contacto: serveinfo@lovedc.com.

### LOVE DC (`/love-dc/`)
Evento anual de servicio. La página dice "June 4-6", con 53 proyectos, más de 25 socios y más de 500 voluntarios previstos; el año anterior fueron 47 proyectos y 470 voluntarios. CTA "Sign up to serve" a `connect.passion.team/lovedc/projects`. Es una página de evento pasado a esta fecha (octubre de 2026).

### Baptism (`/baptism/`)
Explica el bautismo como celebración pública de pasar de muerte a vida. CTA "Get Baptized" al formulario CCB. Tiene `meta robots: noindex` aunque está enlazada en el menú principal.

### Ministerios por edad
- `/dc/bloom/`: bloom (6 semanas a Pre-K), se reúne en 1201 U St NW en tres salas asignadas por edad o etapa. Info de estacionamiento, FAQ y CTA para voluntarios (con screening y verificación de antecedentes).
- `/kids/`: Passion Kids (K a 5.º), mismas secciones. Los niños se agrupan en "tents" por grado, niños con niños y niñas con niñas.
- `/dc/students/`: Passion Students (6.º a 12.º). Se reúnen los domingos de 11:30 a 1:00p en "The 1201". Tarjeta de "Fall Retreat" (16 al 18 de octubre, Maryland) con registro CCB. Registro por Google Form.

### Sabbath (`/sabbath/`)
Un domingo al año sin reuniones presenciales (9 de agosto). Incluye devocional de 15 días ("Sabbath in the Psalms", en passionequip.com) y recursos para familias.

### Join Our Team (`/join-our-team/`)
Presenta a Passion como empleador y enlaza a "Current Openings" (Breezy HR). Nota: el menú principal enlaza directo a Breezy, mientras el pie enlaza a esta página interna.

### Events (`/events/`) y detalle (`/event/<slug>/`)
- Listado: título "Upcoming at Passion City Church", buscador y filtro; las tarjetas de eventos se inyectan por JS (en el HTML leído aparece "No Result Found").
- Detalle de evento: la plantilla muestra solo cabecera, contenido (que no se pudo ver) y pie. Campos esperables (inferido): fecha, hora, lugar, descripción, botón RSVP. El slug se autonumera cuando se repite la serie.

## 6. Contenido y tono

- Voz: cálida, comunitaria, evangélica; usa vocabulario propio: "House" (la iglesia), "Door Holders" (voluntarios), "tribe", "Jesus Church", "lead story", "Family Groups", "CORE", "Neighborhood Nights".
- Los CTA suelen ser de acción concreta: Learn More, RSVP, Apply to Serve, Get Baptized, Give Now, Register Your Interest.
- Fotografía real de la comunidad en casi todas las secciones (carpeta `/wp-content/uploads/`).

## 7. Observaciones y problemas detectados (relevantes para quien edite o replique el sitio)

1. Formulario de suscripción roto: en todas las páginas el bloque "Stay up to date with Passion" muestra "Error: Contact form not found."
2. Listados dinámicos vacíos: "Upcoming Events" y "Upcoming Sessions" muestran "No Result Found" en el HTML inicial; dependen de JS/AJAX y no se pudo ver su render real.
3. FAQ acordeón: el encabezado "Frequently Asked Questions" aparece en varias páginas pero sin preguntas ni respuestas en el contenido leído.
4. Banner de evento desactualizado: algunas páginas (Our Story, Beliefs, For the City, Leadership, Door Holders) muestran el banner "Passion Camp 07.14.25", mientras otras muestran "CORE — Essential Theology 09.28.26" o "Passion Camp 2026 07.13.26". Sugiere caché o banner configurado por plantilla/página.
5. Contenido obsoleto:
   - `/neighborhoodnights/` lista fechas de julio (lunes 15, martes 16, miércoles 17) de un año anterior y habla de "this summer"; los datos vigentes están en `/community/`.
   - `/40plus/` habla de CORE con fechas de mayo de 2025.
   - `/love-dc/` aún invita a inscribirse a un evento de junio.
   - `/forthecity/` y `/give/` enlazan a `passioncitychurch.com/dc/give/` (dominio distinto) en lugar de a este sitio.
6. Inconsistencias de marca y enlaces:
   - La página `/dc/bloom/` usa un menú distinto (versión de Atlanta: "About", "I'm New to Faith", "Rooms: Love Atlanta, The Grove...", enlaces `?page_id=`), con el mismo título "bloom" en la meta de `/dc/students/`.
   - Redes sociales alternan entre cuentas de DC y cuentas generales según la página.
   - El enlace "Latest Talk" apunta a `passioncitychurch.com`, no a este dominio (existe también `/video/latest-talk-from-washington-dc/` en el sitemap).
7. Errores tipográficos: en `/dc/students/` aparecen "Find Lfe" y "the regular rhthym".
8. Páginas de prueba o auxiliares en el sitemap: `/hello-world/`, `/event/test-event/`, `/ab-giving-buttons/`, `/event/13066/`, `/event/13005/`, eventos duplicados con sufijo numérico.
9. Eventos de Atlanta mezclados en el sitemap de DC (por ejemplo `love-atlanta-week`, `ya-love-atlanta-project`, `passion-city-church-at-state-farm-arena`), lo que indica que el sitio parte de una base compartida con Atlanta.
10. Se repite el contenido de varias secciones en versión corta y versión larga (parece diseño de tarjeta expandible).

## 8. Cómo usar este documento con Codex

Si el objetivo es replicar o rediseñar el sitio:
- Reutilizar la estructura de layout global (sección 3) y la jerarquía de URLs (sección 4).
- Modelar como colecciones de contenido: `events`, `videos` (mensajes), `articles` y páginas estáticas.
- Integraciones a mantener o reemplazar: CCB (formularios), Pushpay (donaciones), Breezy HR (empleo), Formstack, GTM.
- Datos de contacto clave: dirección 1215 U St NW (servicios) y 1201 U St NW (ministerios familiares y oficina); give@passioncitychurchdc.com; serveinfo@lovedc.com; dccore@passioncitychurch.com.

Si el objetivo es solo comprender el sitio, las secciones 1, 3 y 5 son suficientes.

Fuentes principales: https://passioncitychurchdc.com/ y https://passioncitychurchdc.com/sitemap.xml
