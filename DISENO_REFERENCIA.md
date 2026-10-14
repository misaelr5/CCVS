# Dirección de arte y patrones observados — videos de Passion City

Fuente: grabaciones facilitadas por el usuario de la web principal y `/us/`, tanto en escritorio como en celular. Los fotogramas de `referencias/` son para **estudio privado de layout**, nunca para publicarse en la web.

## Elementos a adaptar
1. Layout editorial luminoso, tipografía sans contundente y serif expresiva, amplios espacios en blanco, módulos cálidos y bordes ligeramente redondeados.
2. Hero fotográfico envolvente con superposición de título blanco grande, degradado de legibilidad y CTA contrastado; imagen panorámica en escritorio y **recorte vertical intencional en mobile**.
3. Header limpio: **solo emblema madre de Comunidad Cristiana**, identificación textual local, menú compacto y control de navegación. No mostrar CCVS en header. En mobile, menú superpuesto o panel usable, Escape, foco, cierre tras navegación.
4. Ritmo de alternancia entre bloques asimétricos foto+texto, citas/editorial, tarjetas cálidas y secciones de ministerios.
5. Carrusel táctil con `scroll-snap` y controles accesibles solo donde aporte valor (evitar dependencias).
6. Timeline de la historia de Villa Sarmiento, **sin inventar fechas**.
7. Acordeón doctrinal con numeración, línea divisoria, botones +/− accesibles. No copiar las máximas de Passion City: usar las creencias del brief local.
8. Footer institucional, encabezados grandes y navegación por columnas que se apila en mobile.
9. Microinteracciones: fade/translate suave, hover sutil, sin scroll hijacking, bloqueos de scroll o desplazamientos forzosos. `prefers-reduced-motion` desactiva animaciones no esenciales.
10. Mobile-first desde 360px: secciones en una columna, hero legible, control táctil >=44px, fotos adecuadamente recortadas, márgenes robustos y nada de desbordes horizontales.

## Sistema de identidad CORREGIDO
Seguir `IDENTIDAD_VISUAL.md`. El **cian de Passion está descartado**; acento bordó `#631918`, fondo `#F7F6F3`, texto `#111111`, superficie `#E8E5E1`. El logo madre conserva sus colores.

## Muestras del kit
- `referencias/desktop_inicio_hero.jpg` — hero y navegación.
- `referencias/desktop_inicio_liderazgo.jpg` — fotografía+texto.
- `referencias/desktop_inicio_footer.jpg` — footer tipográfico.
- `referencias/desktop_nosotros_portada.jpg` — cabecera editorial `/us/`.
- `referencias/desktop_nosotros_historia.jpg` — historia.
- `referencias/desktop_nosotros_acordeon.jpg` — acordeón.
- `referencias/desktop_doctrina.jpg` — jerarquía de creencias.
- `referencias/mobile_referencia_4_estados.jpg` — hero, módulos, texto y acordeón en pantalla reducida.

## Interpretación, no calco
- "Select a City" -> **Visitarnos**: una sola sede, dirección y horarios, no buscador multicampus.
- "Leadership" -> liderazgo real **solo cuando el nombre y foto estén aprobados**; hasta entonces, un bloque sobre vida comunitaria.
- "US / History" -> recorrido documentado **2005 / 2008–2012 / 2015 / presente**.
- "What We Believe" -> cinco temas doctrinales informados, sin ampliar arbitrariamente.
- Módulos internacionales -> actividades locales (oración, jóvenes, niños, ropero solidario, merendero, etc.).
- Newsletter/formularios/donaciones -> no renderizar hasta contar con autorización e infraestructura.
