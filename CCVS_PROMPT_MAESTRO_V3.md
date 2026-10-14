# CCVS — PROMPT MAESTRO V3
## Reconstrucción desde cero, fidelidad visual y arquitectura institucional

> **Documento único de instrucciones para Codex.** Este prompt sustituye todos los prompts, diseños y decisiones de implementación anteriores de CCVS. Los archivos `referencias/`, `identidad/` y `videos/` (si están disponibles) son **evidencia visual**, no instrucciones adicionales. Las afirmaciones sobre Passion City Washington DC proceden de un relevamiento de HTML/sitemap y no verifican el CSS ni los píxeles.

### 0. Encargo no negociable

Actuá como **frontend principal + director/a de arte digital + auditor/a visual responsive**. Reconstruí el sitio **Comunidad Cristiana Villa Sarmiento (CCVS)** desde cero. El primer intento fue rechazado porque no respetó la tipografía, la geometría ni la apariencia de la referencia. No repitas una landing genérica.

Quiero una traducción fiel del **lenguaje visual y de interacción** de estas páginas, adaptado a material original de nuestra congregación:

**Referencias VISUALES primarias (orden obligatorio):**
1. https://passioncitychurch.com/ — portada global.
2. https://passioncitychurch.com/us/ — composición de «US / Our Story».
3. Capturas en `referencias/` y grabaciones en `videos/` proporcionadas por el cliente, especialmente sus estados MOBILE y menú.

**Referencia ESTRUCTURAL secundaria:** https://passioncitychurchdc.com/ y el análisis adjunto `investigacion/passion-city-church-dc-site-description.md`, que procede de HTML/sitemap. Este análisis **NO observó CSS, estilos, medidas, colores, tipografías ni layout real**. Nunca lo trates como especificación visual. **Los sitios `.com` y `dc.com` NO son la misma portada**. Si difieren, mandan las imágenes/videos de las URLs primarias.

**Datos institucionales únicos y autorizados:** el brief de CCVS en este prompt. Nunca traslades datos, nombres de pastores, historia, direcciones, doctrinas, lemas, eventos, ministerios o contactos de Passion City a CCVS.

**Resultado:** sitio original, fotográfico, editorial, nítido, funcional, extremadamente cuidado en teléfonos. Alta fidelidad al sistema visual; **no copiar código fuente, imágenes, textos, símbolos ni assets propietarios** de la referencia.

### 1. Autorización para reiniciar y proteger recursos

Podés reemplazar la implementación anterior de CCVS. Antes:
- Inspeccioná el repositorio y su raíz. Verificá que realmente sea el proyecto CCVS; no borres directorios ajenos.
- Si hay Git, guardá el estado actual en un commit o rama de respaldo; sin Git, copiá los archivos a un directorio de backup identificado.
- **Conservá** `.git`, `.env*`, originales gráficos, imágenes, videos, documentos institucionales, archivos de referencia y contenido proporcionado. Nunca imprimas secretos en terminal/reporte.
- Eliminá o sustituí la UI, páginas, estilos, componentes y dependencias visuales que no sirvan. Actualizá cualquier `AGENTS.md` obsoleto que contradiga este prompt.
- No uses componentes heredados por conveniencia. No hagas push ni deploy.
- No vuelvas a preguntar si hay que comenzar: implementá. Si un dato esencial no existe, diseñá sin inventarlo y registralo como pendiente.

### 2. La marca: jerarquía exacta

1. **EMBLEMA MADRE DE COMUNIDAD CRISTIANA:** cruz blanca con paloma roja y formas cálidas amarillo/naranja/rojo. Es el primer nivel institucional y **único logo visible en el HEADER desktop y mobile**. Jamás recolorearlo, redibujarlo, sustituirlo por un icono de librería ni colocar «CCVS» a su lado en forma de segundo logo. Se permite identificación textual local si la composición lo requiere, pero no un segundo logotipo.
2. **CCVS BORDÓ LIMPIO:** letras CCVS bordó, contorno negro. Es marca local secundaria para `Nosotros`, secciones institucionales y footer **después** del emblema madre.
3. **CCVS TEXTURIZADO:** variante decorativa para recursos editoriales puntuales, no un logo principal ni para la navegación.

Los archivos actuales en `identidad/` son provisionales. Respetá aspecto y escala; no elimines fondo de manera destructiva. Prepará fácil reemplazo por SVG/PNG transparentes oficiales cuando lleguen. En `/links` debe aparecer prioritariamente el emblema madre.

**Color de acento**: `#631918` (bordó aproximado extraído del logotipo limpio), hover `#812725`. Fondo `#F7F6F3` o blanco `#FFFFFF`; texto `#111111`; superficie `#E8E5E1`. La referencia puede utilizar cian, **CCVS NUNCA**. Predominio claro, negro, fotografías reales y aire editorial. El emblema madre conserva sus colores originales.

### 3. Tipografía: requisito crítico, no «parecida» al azar

La ficha de diseño de Passion City registra **GT America** (sans, Grilli Type) y **Saol** (serif, Schick Toikka): https://maxibestof.one/websites/28852-passion-city-church. Es evidencia de un catálogo de terceros, no un desglose exhaustivo de qué peso y estilo usa cada componente.

- Si el cliente dispone de archivos propios y licencia web apropiada, integrá GT America + Saol.
- Si no, **NO extraigas fuentes del sitio original ni descargues archivos comerciales sin permiso**.
- Fallback libre propuesto: **Archivo** (sans) + **Bodoni Moda** (editorial). No digas que son idénticas; compará las formas de las letras, x-height, anchos, espaciado y contraste, y ajustá pesos, tracking y line-height hasta aproximar la referencia.
- Para texto corrido, sans muy legible; para títulos principales, sans pesada; para grandes declaraciones de `/nosotros`, serif editorial. Evitá Inter/Manrope/Instrument Serif como elección automática.

Creá tokens globales `--font-sans`, `--font-editorial`, escala fluida con `clamp()`, tracking y line-height explícitos. **Los tamaños NO se deciden solo por rangos:** determiná proporciones del screenshot al mismo ancho y ajustá. Rangos *solo para iniciar*: hero 46–62 px móvil / 64–100 desktop; título «NOSOTROS» 64–92 móvil / 108–170 desktop; serif editorial 36–54 móvil / 52–78 desktop. Si el salto de línea no coincide con la referencia, reajustá tamaño, ancho, familia o tracking; no metas `<br>` arbitrarios en todos los breakpoints.

### 4. Dirección de arte: qué reproducir y qué evitar

**Reproducir:** grandes titulares compactos, serif de alto contraste, bloques asimétricos foto + texto, fotografía inmersiva, superficie mayormente blanca, márgenes consistentes, CTA simple, imágenes con radios discretos, ritmo vertical editorial, tratamiento cuidadoso de crop, footer tipográfico, menú mobile de excelente calidad, microinteracciones moderadas.

**NO hacer:** hero corporativo de dos columnas cuando la referencia es foto de fondo; cuadrícula repetitiva de 3 cards para todo; fondos con blobs o gradientes de marketing; glassmorphism; íconos grandes decorativos; badges por todas partes; una página tipo SaaS; sombras muy pesadas; nuevas secciones por rellenar; animaciones llamativas no sustentadas por videos. No copiar la gran arquitectura multi-campus de Passion City.

**Primera meta visual:** Inicio + Nosotros deben parecer parte del mismo sistema editorial que las referencias, incluso si las fotos locales finales aún no llegaron. Diseñá containers, crops y espacios preparados. No publiques fotos genéricas atribuidas a la iglesia.

### 5. Navegación global adaptada (aporte del estudio de Passion DC)

En el relevamiento de Washington DC se aprecia una organización en grupos: **Quiénes somos / Siguiente paso / Movimiento Passion**; también un `Skip to Content`, banner de evento, CTA y footer por columnas. Son **patrones funcionales**, no una orden de copiar su menú, sus secciones ni sus enlaces.

**Adaptación para CCVS:**
- Header compacto, emblema madre a la izquierda, enlaces pertinentes y botón de menú. El header NO muestra CCVS.
- Menú extendido con grupos claros si es visualmente pertinente:
  - **Conocé nuestra iglesia:** Inicio, Nosotros, Historia (ancla de Nosotros), Qué creemos (ancla de Nosotros).
  - **Participá:** Ministerios, Horarios, Visitarnos.
  - **Conectate:** página de enlaces, redes verificadas y contacto verificado.
- Usar un enlace de accesibilidad «Saltar al contenido» al comienzo (`#contenido`).
- No crear selector de ciudades/sedes: **tenemos una congregación confirmada**.
- El banner/ticker para evento destacado es **opcional y debe ocultarse por defecto** hasta contar con una actividad real, fecha válida y autorización. Nunca mostrar fechas antiguas.
- Redes no confirmadas no aparecen. Nada de enlaces `#`, números falsos o CTA simulados.
- En mobile: menú que abre/cierra de verdad, foco administrado, Escape, botón de cierre accesible, scroll del fondo controlado al abrir y restauración al cerrar. Controles táctiles >=44px. Diseño intencional a 360–430px.

### 6. Arquitectura FINAL (no agregar sitemap de Passion DC)

Implementar exactamente las cinco rutas:

1. `/` — Inicio: bienvenida editorial, información esencial, entrada a vida comunitaria y visita.
2. `/nosotros` — Nosotros: portada editorial tipo `/us/`, historia cronológica y doctrina.
3. `/ministerios` — actividades y ministerios locales.
4. `/visitanos` — horarios, dirección, preparación de mapa/enlace verificado.
5. `/links` — alternativa Linktree propia, excelente en celulares.

Admitir enlaces con fragmentos a `#historia` y `#creencias`, sin crear páginas vacías adicionales.

**NO replicar:** `/give`, `/beyond`, `/events`, `/event/:slug`, `/videos`, `/leadership`, `/join-our-team`, `/baptism`, multicampus, CCB, Pushpay, Formstack, GTM, CRM, newsletter o sistemas de contratación. Son funcionalidades de otra organización; solo considerar una fase futura si CCVS las solicita. Un esquema de datos interno puede contemplar eventos reales futuros, pero **no construir un sistema completo de eventos ni un backend ahora**.

### 7. Inicio `/`: composición exacta, no confundir home global con DC

La HOME GLOBAL real incluye gran mensaje inicial, selección de ciudad/movimiento, liderazgo y bloques editoriales. La HOME DC tiene hero de ubicación, «What to Expect», eventos, ministerios por edades y estacionamiento. **No reemplaces la primera por la segunda.** Tomá la **gramática visual de la HOME GLOBAL**, y adaptá a una congregación local su misión informativa.

Orden funcional recomendado, subordinado siempre al ritmo visual de las grabaciones:

**A. Hero principal**: fotografía auténtica e inmersiva o contenedor de imagen preparado si aún falta la foto. Título sans grande sobre la imagen, alineación y encuadre inspirados directamente en `referencias/desktop_inicio_hero.jpg` y estados móviles. Superposición oscura mínima para contraste, esquinas ligeramente redondeadas. En desktop, imagen apaisada; en mobile, crop vertical deliberado, nunca mera reducción de desktop. Mensaje editorial provisional (no lema oficial): «Una comunidad. Una misma fe. Jesús en el centro.» CTA real: «Conocenos» -> `/nosotros`.

**B. Bienvenida**: texto institucional claro y humano, mezcla de sans/serif con composición editorial y fotos locales.

**C. Próxima reunión / horarios**: Domingo 19:30, Miércoles 21:00, Sábado jóvenes 21:00, Sábado niños 16:30. Exponer especialmente la reunión dominical y link `/visitanos`.

**D. Conocé nuestra comunidad**: foto y texto alternados para introducir historia y misión.

**E. Ministerios**: sólo actividades confirmadas, tratamiento fotográfico variado, links reales a `/ministerios`; no diez cards clonadas.

**F. Servicio a la comunidad**: ropero solidario, merendero y evangelismo, con información verificada y sin números inventados.

**G. Visitarnos**: dirección, horarios, mapa en cuanto esté confirmado, CTA «Cómo llegar» solo con URL oficial disponible.

**H. Footer editorial**: emblema madre primero, CCVS secundario, navegación y contacto verificable; gran tipografía/espacios inspirados en la referencia.

No colocar bloques de «Leadership» con fotos de pastores falsos. Si falta material real, dejar sección fuera de la primera versión.

### 8. Nosotros `/nosotros`: construir desde la referencia `/us/`

**Hero desktop**: gran rótulo **«NOSOTROS»** en sans pesada, declaración multilínea en serif editorial, párrafo acotado e imagen grande a la derecha con composición asimétrica y mucho espacio blanco. `referencias/desktop_nosotros_portada.jpg` manda sobre cualquier descripción textual. Mobile: usar el orden real que se ve en `referencias/mobile_referencia_4_estados.jpg`, y comprobarlo visualmente en lugar de suponer un stacking genérico.

Declaración editorial provisional: «Una comunidad. Una fe en Jesucristo. Una vida para servir.» No presentarla como lema oficial aprobado. Intro: «Somos Comunidad Cristiana Villa Sarmiento, una congregación que busca compartir el evangelio de Jesucristo, crecer en la fe y servir a nuestra comunidad».

**Historia** con módulos editoriales/fotos, no lista fría:
- **2005**: comienzan reuniones de oración en la casa de Esther Mercado, con el deseo de crecer espiritualmente y compartir la fe.
- **2008–2012**: crecimiento y reuniones en un salón alquilado sobre la calle principal.
- **Terreno y salón propio**: el municipio realizó una donación de terreno previamente al período de salón alquilado según el relato recibido; después comenzó la edificación. **La fecha exacta de donación y terminación no están confirmadas: no inventarlas.**
- **2015**: reconocimiento formal de un pastor y autonomía como congregación. **No inventar su nombre.**
- **Posteriormente / actualidad**: una vez concluida la construcción se trasladan las actividades al edificio propio, continúa el servicio espiritual y social.

No distorsionar la cronología. No inventar nombres, fechas o estadísticas.

**Doctrina**: basada en la Biblia como única autoridad y orientación cristiana «Hermanos Libres Renovados». Presentar 5 ítems, idealmente acordeón numerado con líneas finas, gran jerarquía tipográfica, botón +/- y estados accesibles:
1. La Biblia como autoridad.
2. Dios Padre, Hijo Jesucristo y Espíritu Santo.
3. La salvación por gracia mediante la fe.
4. La obra del Espíritu Santo en la vida del creyente.
5. La oración, adoración y vida en santidad.
No copiar las diez doctrinas de Passion DC ni redactar confesiones teológicas extensas no aprobadas.

**Relación con `/beliefs/` de Passion:** el estudio DC describe diez creencias en **página separada**; para esta primera versión CCVS las integra en `/nosotros#creencias` por alcance del proyecto. No asumir que el acordeón doctrinal exacto de Passion DC fue visualmente verificado por Claude: **el HTML ocultaba contenido del acordeón FAQ**.

### 9. Ministerios `/ministerios`

Contenido confirmado: oración, estudios bíblicos, evangelismo, ropero solidario, merendero/ayuda social, niños, jóvenes, matrimonios, varones, mujeres y consejería espiritual. Estos son **actividades**, no necesariamente estructuras formales de ministerio; no inventar ministerios, equipos, líderes ni horarios.

Presentación editorial, fotografías amplias y alternancia, secciones distintivas para niños/jóvenes/acción social; `scroll-snap` si la referencia avala un carrusel táctil. Secciones sin foto final deben mantener ratios/crops previsibles. Cada enlace funcional lleva a otra ruta real o ancla pertinente.

### 10. Visitarnos `/visitanos`

Datos confirmados: **Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina**.
- Domingo 19:30 — Reunión principal.
- Miércoles 21:00 — Oración.
- Sábado 21:00 — Jóvenes.
- Sábado 16:30 — Niños.

Inspiración funcional de Passion DC: la información de una primera visita debe resultar evidente de inmediato (horarios, ubicación, qué esperar). Pero no copiar sus detalles de estacionamiento, garajes, horarios ni prédicas.

Diseño: titular editorial, dirección visible, horario destacado, CTA a `/links` y botón de Maps **solo cuando llegue la URL confirmada**. Espacio reservado para mapa sin fingir coordenadas. FAQ únicamente con respuestas respaldadas. No afirmar que hay estacionamiento, accesibilidad, cuidado infantil o modalidad de cultos si no está confirmado.

### 11. Página `/links`: Linktree propio

Pensada para 360–430px y uso desde Instagram. Mostrar arriba únicamente emblema original y texto «Comunidad Cristiana Villa Sarmiento». Botones amplios, bordó con contraste suficiente, foco visible, espaciado generoso, carga casi inmediata y fondo editorial sobrio.

Enlaces internos activos: Inicio, Horarios y cómo visitarnos, Nosotros, Ministerios. Externos Instagram, Facebook, YouTube, WhatsApp, Maps **solo al recibir URL real**. No renderizar enlaces falsos, deshabilitados que parezcan clicables, ni `#`.

### 12. Footer y patrones tomados de la descripción de Claude

Del relevamiento DC vale la pena adaptar: footer por grupos, CTA de acción concreta, consistencia global, componentes de foto+texto, separación clara de visitantes vs miembros, navegación accesible, contenido agrupado y un sistema para datos estructurados.

Propuesta para CCVS:
- «La iglesia»: Inicio, Nosotros, Historia, Creencias.
- «Participá»: Ministerios, Horarios, Visitarnos.
- «Contacto»: dirección y redes **verificadas**.
- **Orden gráfico institucional:** emblema madre visible primero; CCVS limpio después, menor protagonismo.
- Copyright CCVS, año dinámico.
- Sin formulario de newsletter hasta contar con correo, consentimiento y servicio real de envío.

**Aprendizajes de errores detectados por Claude, no copiarlos:** formulario que falla («Contact form not found»), eventos sin datos («No Result Found»), banners vencidos, enlaces incorrectos entre dominios, enlaces sociales inconsistentes, páginas de prueba en sitemap y textos duplicados debido a variantes de CMS. En CCVS: ocultar módulos sin datos, revisar enlaces, no duplicar texto y no introducir recursos de Passion DC.

### 13. Datos, componentes y enfoque de desarrollo

**Stack requerido:** Astro con prerender estático + TypeScript + Tailwind CSS 4 + `astro:assets` + CSS moderno. GSAP solo cuando aporten animaciones que CSS no resuelva; evitar React, Next, SSR, CMS, DB, Supabase, Framer Motion, Lenis, sliders pesados, trackers y librerías de UI empresariales.

Componentes útiles, sin sobreabstraer: `SiteHeader`, `MobileMenu`, `EditorialHero`, `PhotoSection`, `SectionHeading`, `TextImageBlock`, `Schedule`, `HistoryTimeline`, `BeliefsAccordion`, `MinistryFeature`, `SiteFooter`, `LinkButton`. Usar HTML/JS nativo y un store mínimo solo si corresponde.

Centralizar contenido tipado en `src/data/`: `site.ts` (identidad/dirección), `schedule.ts`, `history.ts`, `beliefs.ts`, `ministries.ts`, `links.ts`. Separar claramente **hechos aprobados**, **copy editorial provisional** y **pendientes**. No recolectar datos personales de visitantes sin necesidad.

Assets: usar fotos CCVS recibidas; `astro:assets` optimiza para desktop/mobile, WebP/AVIF donde corresponda, srcset/sizes, loading eager únicamente para hero, lazy fuera de viewport. Proveer contenedores neutros / rutas explícitas si no hay fotos. Nunca usar fotos de Passion City en la web final; las capturas son exclusivamente de comparación de layout. No usar logos reimaginados.

### 14. Interacciones y animaciones

Implementar únicamente lo que se pueda observar o justificar: entradas suaves, hover leve, menú overlay, acordeones accesibles con `aria-expanded`/`aria-controls`, carruseles por `scroll-snap` cuando hagan falta, CTA reales. **No** imponer smooth scrolling global con bibliotecas, scroll hijacking, parallax excesivo, autoplay agresivo ni efectos que perjudiquen móviles. `prefers-reduced-motion` desactiva animaciones no esenciales.

Recurrí a `videos/` para confirmar timing, modo de apertura, orden de secciones y comportamiento mobile, no para inferir fuentes exactas. **Primero comparar capturas**, y usar video solo para incertidumbres de interacción, optimizando tiempo y tokens.

### 15. Responsive: objetivos por viewport

Diseñar desde 360px hacia arriba. Capturas a **390×844 y 1440×900** como checkpoints obligatorios si hay browser disponible, y pruebas adicionales 360, 375, 430, 768 y 1024px.

En cada página observar: tamaño real de encabezados, saltos de línea, orden editorial, radios, crop y `object-position`, separación entre secciones, ancho de texto, menu, CTAs, legibilidad, carga de imagen, teclado y ausencia de overflow horizontal. No aceptar que el mobile sea una simple columna nacida del CSS desktop.

### 16. Ciclo de comparación visual — CRÍTICO

**No basta con compilar**. Trabajar en dos etapas claras:

**A. Reconstrucción tipográfica/geométrica**
1. Inspeccionar evidencia visual disponible.
2. Montar encabezado, hero y página Nosotros antes de terminar el resto.
3. Comparar screenshot de referencia y screenshot local a viewport comparable.
4. Anotar en un registro corto los **cinco mayores desajustes concretos** (ej.: altura de hero, tipografía, proporción imagen, spacing, orden mobile).
5. Corregir y hacer una segunda comparación. Si no hay navegador, no afirmar que se midió píxel a píxel.

**B. Completar sitio y validar**
6. Construir resto de rutas con el sistema ya estabilizado.
7. Inspeccionar cada ruta desktop y mobile, revisar interacciones.
8. Ejecutar `astro check`/typecheck, lint si configurado, y `npm run build`.
9. Comprobar enlaces internos (y externos solo confirmados), tags semánticos, SEO, sitemap, foco visible, menú, acordeón y `prefers-reduced-motion`.
10. Corregir los problemas críticos antes de cerrar. Guardar comparativas finales si se dispone de captura automatizada.

No inventar métricas Lighthouse. Objetivos deseados —no resultados garantizados—: mobile performance >=90; accesibilidad >=95; buenas prácticas >=95; SEO >=95. Priorizar legibilidad real y estabilidad de layout.

### 17. Evitar especialmente las falsas certezas del material de Claude

La investigación externa se hizo con **HTML renderizado como texto y sitemap**, no inspección de CSS ni navegador. Por lo tanto:
- No presupongas que el texto duplicado es una tarjeta expandible ni implementes variantes duplicadas sin probarlo.
- No presupongas que un FAQ se ve exactamente como un acordeón concreto si el HTML no mostró su contenido.
- No presupongas que «No Result Found» equivale a eventos reales inexistentes; puede depender de JS.
- No copies el volumen del sitemap (cientos de eventos, videos y páginas) a CCVS.
- No copies integraciones CCB, Pushpay, Formstack, Breezy HR ni el analytics GTM de otra organización.
- No copies textos en inglés ni estilo local estadounidense («Door Holders», «CORE», «Neighborhood Nights», «bloom»).
- No traspases direcciones de Washington DC, horarios, nombres, fechas ni cuentas sociales.
- Para decisiones de píxeles priorizá capturas y videos de `passioncitychurch.com`, no la descripción `.dc.com`.

### 18. Reglas SEO y accesibilidad

Español de Argentina (`lang="es-AR"`), metatítulos/descripciones específicos por ruta, URL canónica una vez definido dominio, Open Graph preparado con asset propio, sitemap y robots apropiados, headings bien jerarquizados, alt útiles y sin frases SEO inventadas. No forzar indexación de páginas incompletas. Semántica, teclado y contraste WCAG AA. Menú/accordion con comportamiento accesible, fotos con dimensiones para evitar CLS.

### 19. Pendientes reales que NO deben bloquear el prototipo

- Logos institucionales definitivos transparentes en SVG/PNG oficial.
- Fotografía hero apaisada y vertical, fotos reales de reuniones, jóvenes, niños, ayuda social y edificio, y autorizaciones de personas/menores.
- Nombre e imagen del pastor **si se decide mostrar liderazgo**.
- URL exacta de Google Maps.
- Instagram, Facebook, YouTube, correo, WhatsApp y responsables de contacto.
- Copys/lemas y declaración doctrinal ampliada aprobados por autoridades.
- Dominio final y decisión de hosting.
- Eventos reales, si en el futuro se incorpora agenda.

El sitio debe funcionar localmente sin simular estos datos. Reportalos en `PENDIENTES_PUBLICACION.md` sin convertirlos en enlaces falsos o secciones vacías rotas.

### 20. Entrega y control de gastos de razonamiento

Implementá sin pedir aprobaciones entre cada etapa. No generes múltiples alternativas visuales ni informes narrativos extensos. Primero leé este prompt; después mirá las referencias relevantes, **sin procesar ocho videos completos si las capturas ya resuelven la pregunta**. Usá herramientas del navegador y capturas solo para cerrar diferencias de diseño concretas. No uses subagentes para trabajos triviales. Si una tarea no puede ejecutarse, informá la limitación exacta, no la finjas.

**Criterios de aceptación:** implementación anterior resguardada y reemplazada; cinco rutas navegables; emblema madre único en header; bordó reemplaza cian; tipografía editorial y escala inspiradas de forma verificable; hero y composición Nosotros revisados en desktop/mobile; historia y doctrina correctas; horarios correctos; enlaces externos solo verificados; sin datos falsos ni módulos rotos; mobile desde 360px sin overflow; interacciones accesibles; build exitoso; comparación visual real o limitación explícita.

**Respuesta final:** resumen breve de cambios, stack/fuentes reales, rutas, tests ejecutados con resultado, dos capturas mobile/desktop si disponibles, diferencias visuales aún detectadas, pendientes reales, comandos de arranque. No deploy ni push.

**EJECUTÁ LA RECONSTRUCCIÓN COMPLETA AHORA.**
