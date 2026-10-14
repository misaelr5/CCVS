# Prompt maestro para Codex — CCVS

Actuá como desarrollador frontend senior con criterio de dirección de arte y accesibilidad. **Implementá** un sitio web institucional funcional, responsivo y de alta calidad para **Comunidad Cristiana Villa Sarmiento (CCVS)**, inspirándote en el lenguaje editorial de Passion City Church sin clonar activos, código ni contenido reconocible. La prioridad absoluta es la **experiencia móvil real**. No me des solo un plan: trabajá en el repositorio y verificá el resultado.

## 1) Contexto local (leer en este orden, sin duplicarlo en la respuesta)
1. `IDENTIDAD_VISUAL.md` — decisiones definitivas de marca, prioridad máxima.
2. `BRIEF_IGLESIA.md` — hechos y horarios; no inventar.
3. `DISENO_REFERENCIA.md` y fotogramas de `referencias/` — referencia de composición y mobile.
4. `PENDIENTES.md` — todo lo no confirmado.

Fuentes visuales orientativas: `https://passioncitychurch.com/` y `https://passioncitychurch.com/us/`. Ya hay fotogramas locales: **no gastes contexto buscando o analizando la web completa si no es necesario**. Los archivos de `referencias/` son exclusivamente de estudio. Las imágenes de `identidad/` sí corresponden a la iglesia, pero son versiones provisionales.

## 2) Reglas críticas de identidad
- En **header escritorio y mobile, mostrar exclusivamente el logo original de Comunidad Cristiana** (cruz y paloma) con etiqueta textual "Comunidad Cristiana Villa Sarmiento". **NO colocar logo CCVS en header**, ni como reemplazo ni junto al símbolo.
- En el resto, usar CCVS limpio bordó en `/nosotros` y footer como identidad local secundaria; CCVS texturizado solo recurso decorativo puntual. En `/links`, emblema madre primero.
- **Nunca cambiar el emblema madre a bordó ni recolorearlo**. No recrear ni descargar logos externos.
- Interfaz: bordó CCVS `#631918` (hover `#812725`), fondo `#F7F6F3`, cards `#E8E5E1`, texto `#111111`, blanco `#FFFFFF`. **CERO CIAN**.
- Fotos y SVG/PNG finales faltan: las imágenes de `identidad/` son provisionales. No quitar fondos en forma destructiva ni simular versiones "oficiales" no autorizadas. Resolver visualmente la previsualización con contenedores blancos o espacios preparados.

## 3) Stack / alcance MVP
- Astro estable + TypeScript en modo estricto + Tailwind CSS 4 con integración Vite oficial.
- Generación estática SSG; sin backend, autenticación, MySQL, WordPress, Supabase ni CMS.
- Componentes `.astro` y CSS como estándar. JS vanilla solo para interacciones imprescindibles. **No React, Next, Swiper, Lenis ni Framer Motion**.
- CSS transitions y scroll snap primero; GSAP opcional únicamente si una animación lo exige claramente, con `prefers-reduced-motion`.
- `astro:assets` para imágenes locales con dimensiones explícitas y formatos WebP/AVIF cuando corresponda.
- Fonts elegidas legalmente (p.ej. Manrope/Inter para sans e Instrument Serif para acentos editoriales), con self-host si viable. Evitar bibliotecas de iconos enormes; SVG inline propios.
- Contenido editable desde un único módulo TypeScript tipado `src/data/site.ts` (textos, horarios, ministerios, links y rutas de recursos).
- Sin formularios de contacto, ofrendas, envío de datos o integraciones que requieran secretos en primera versión. No usar enlaces falsos `href="#"`.

## 4) Estructura y pantallas obligatorias
1. `/` **Inicio**: header institucional, hero fotográfico/reserva editorial si todavía no hay fotos reales, bienvenida, horarios, introducción a ministerios y servicio comunitario, microbloque de historia, CTA visitarnos y footer.
2. `/nosotros` **Nosotros**: composición asimétrica tipo editorial basada en referencia `/us/`, historia desde 2005 sin inventos, credo/doctrina fiel al brief en acordeón numerado, bloque Comunidad Cristiana + CCVS local, cierre para visitantes. No inventar pastor ni nombre de líder.
3. `/ministerios` **Ministerios**: oración, estudio bíblico, evangelismo, niños, jóvenes, ropero solidario, merendero y ayuda social, matrimonios, varones/mujeres y consejería. Sólo los horarios confirmados deben aparecer.
4. `/visitanos` **Visitarnos**: cuatro horarios confirmados, dirección exacta tal como fue facilitada, guía de primera visita sin dar por hechos características no verificadas; mapa solamente si hay URL confirmada.
5. `/links` **Página de enlaces propia**: perfil para Instagram, encabezado con emblema madre, navegación táctil en una columna, botones reales de sitio/reuniones/visita; enlaces externos solo si se cargan URLs confirmadas. Vista especialmente cuidada a 390px.
6. Componentes reutilizables `SiteHeader`, `MobileMenu`, `SiteFooter`, `Hero`, `EditorialSplit`, `SectionHeading`, `ActivityCard`, `ScheduleList`, `FaithAccordion` y `LinksHub` (nombres adaptables).
7. `README.md` de operación con rutas, comandos, cómo cambiar textos/fotos/logos y cómo publicar. Generar `PENDIENTES_PUBLICACION.md` a partir de los faltantes reales.

## 5) Experiencia responsive y detalles de diseño
- Primero diseñar **390px**, verificar además **360, 375, 430, 768, 1024, 1440px**. Evitar scroll horizontal a toda costa.
- Header sencillo con símbolo madre en fondo apropiado, alto funcional para mobile, botón de menú con área táctil >=44px y panel navegable con teclado/`Escape`/focus y cierre al navegar.
- Desktop: hero amplio, grillas asimétricas, títulos potentes, ritmo editorial, imágenes de bordes suaves, contenido máximo ~1280px.
- Mobile: hero vertical e intencionalmente recortado; tipografía `clamp()` legible, texto que no tape rostros, CTA accesible, cards apiladas o scroll-snap táctil si tiene sentido, footer ordenado.
- Acordeón semántico accesible usando `<details>/<summary>` cuando funcione (preferible a JS adicional) o button con `aria-expanded`; numeración y +/−.
- No usar recursos visuales propiedad de Passion City en la web final, ni copiar slogans, fotos, historia, creencias o referencias multicampus.
- Si todavía no hay fotografías reales, usar composiciones geométricas tipográficas o bloques editoriales neutros, **no fotos stock presentadas como la congregación**; dejar espacios de reemplazo claros. Diseñar para que agregar las fotos finales no rompa el responsive.
- Performance: imágenes adaptativas, lazy loading bajo primer viewport, evitar CLS, JS mínimo, buena accesibilidad y SEO local. Páginas navegables y listas antes de cualquier motion complejo.

## 6) Calidad técnica y ahorro de tokens
- Implementá el proyecto **en una pasada coherente**: estructura, componentes, datos, páginas, estilos y responsive; luego corregí tras verificar. No ejecutes investigaciones redundantes ni instales librerías sin uso.
- No repitas los briefs completos en el chat. Evitá logs masivos y explicaciones de cada archivo; reportá solo errores relevantes y soluciones.
- Ejecutá `npm install`, `npm run check` (configurarlo con `astro check`), `npm run build` y corregí errores. Si hay herramientas de navegador, probá al menos `/` y `/nosotros` a 390px y 1440px, más menú/links; si no, no afirmes que lo hiciste.
- No uses datos inventados ni enlaces vacíos. Configurá ausencia de URLs mediante ocultar CTA o estado informativo no clickeable.
- No hagas `git push`, despliegues ni compres dominio sin autorización. Si el directorio contiene código previo, preservalo.
- **Al terminar:** resumen máximo 180 palabras con rutas creadas, stack, verificaciones reales, limitaciones y pendientes indispensables. La calidad del código debe verse en el repositorio, no en una respuesta extensa.

## 7) Criterio de aceptación
La web parece una producción original de Comunidad Cristiana Villa Sarmiento, con tratamiento visual editorial premium cercano en calidad a Passion City, identidad madre priorizada, acento bordó, estructura completa, contenido fiel y excelente experiencia móvil. **No declarar completado si hay build roto, navegación no funcional o contenido inventado.**
