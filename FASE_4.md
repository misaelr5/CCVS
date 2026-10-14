# CCVS — FASE 4 COMPLETA
## Editorial Redesign + Creative Collage + Motion Design + iOS Transitions

### 0. MISIÓN Y CONTEXTO

Actuá como un desarrollador frontend senior especializado en dirección de arte digital, diseño editorial experimental, motion design, animaciones web, interfaces mobile-first y experiencias interactivas de alta calidad.

Estamos desarrollando el sitio de **Comunidad Cristiana Villa Sarmiento (CCVS)**.

Proyecto local: `D:\CCVS`

Stack actual:
- Astro
- TypeScript
- Tailwind CSS 4
- Archivo + Bodoni Moda
- Generación estática

La reconstrucción V3 ya fue realizada y el resultado visual me gusta considerablemente más que las versiones anteriores.

Codex informó que la versión anterior cuenta con cinco rutas, build y typecheck correctos, pruebas responsive y verificaciones de accesibilidad.

**ESTA FASE NO ES UNA RECONSTRUCCIÓN. ES UNA EVOLUCIÓN VISUAL Y FUNCIONAL DE LA V3 APROBADA.**

Quiero llevar la experiencia hacia un diseño más editorial, creativo, fotográfico e interactivo, manteniendo la identidad de Passion City Church como referencia principal.

Referencias:

https://passioncitychurch.com/

https://passioncitychurch.com/us/

El objetivo es combinar:

1. El diseño editorial de Passion City.
2. Fotografía auténtica de nuestra congregación.
3. Collage visual contemporáneo.
4. Elementos gráficos dibujados.
5. Animaciones progresivas al scroll.
6. Navegaciones fluidas inspiradas en iOS.
7. Una experiencia mobile especialmente cuidada.

No quiero una landing corporativa convencional.

No quiero que parezca una plantilla SaaS.

Quiero una página con carácter visual, identidad cristiana, fotografía, personalidad y movimiento.

### Restricciones iniciales

- NO reconstruir todo el proyecto.
- NO reemplazar las fuentes actuales.
- NO modificar la identidad institucional aprobada.
- NO reorganizar los módulos inferiores de Inicio que ya funcionan.
- NO cambiar el diseño de Nosotros, Ministerios o Visitarnos salvo ajustes necesarios para esta fase.
- NO instalar librerías innecesarias.
- NO hacer push ni deploy.
- NO implementar analíticas todavía.

Antes de trabajar, inspeccioná el proyecto y creá un respaldo mediante Git, sin sobrescribir cambios no confirmados.

---

# 1. IDENTIDAD VISUAL

Mantener la jerarquía institucional aprobada.

### Logo original

El emblema de Comunidad Cristiana con cruz blanca y paloma roja es la identidad madre.

En el header, tanto desktop como mobile, debe aparecer únicamente este emblema.

No reemplazarlo.

### Logo CCVS

El logo limpio de letras bordó es la identidad local secundaria.

Puede aparecer en Nosotros, bloques institucionales y footer.

### Logo texturizado

Utilizarlo solamente como recurso gráfico decorativo cuando corresponda.

### Colores

Mantener:

- Bordó institucional: `#631918`
- Hover bordó: `#812725`
- Negro: `#111111`
- Blanco cálido: `#F7F6F3`
- Gris cálido: `#E8E5E1`
- Blanco: `#FFFFFF`

La estética debe mantenerse predominantemente blanca y negra, con el bordó como color de acento.

No introducir cian.

Las nuevas marcas gráficas, flechas y resaltados deben integrarse a esta paleta.

---

# 2. REORGANIZACIÓN COMPLETA DE LA SECCIÓN SUPERIOR DE INICIO

## Problema actual

La sección que contiene:

- "La fe se vive en comunidad."
- "Crecer en la fe. Compartir la vida."
- Presentación institucional.
- CTA "Conocé nuestra iglesia".
- Destacado del domingo.
- Lista de reuniones.

Está demasiado dispersa y los elementos no forman composiciones editoriales claras.

Anteriormente se propuso resolverla con dos módulos tipo tarjetas.

**ESA PROPUESTA QUEDA DESCARTADA.**

No quiero dos cajas una al lado de la otra.

Quiero bloques editoriales abiertos, grandes fotografías, tipografía protagonista y composiciones alternadas.

La nueva estructura será:

### BLOQUE 1 — FOTO IZQUIERDA / TEXTO DERECHA

Composición desktop en dos columnas.

**Lado izquierdo:**

Una fotografía grande de la comunidad.

- Imagen real cuando esté disponible.
- Aspect ratio editorial aproximado de 4:5 o 5:6.
- Esquinas suavemente redondeadas.
- Encuadre cuidado.
- Espacio preparado para sustituir fácilmente la imagen.
- No utilizar fotografía de Passion City como contenido propio.

**Lado derecho:**

Mover el título original a esta columna.

Contenido, en este orden:

1. "La fe se vive en comunidad."
2. "Crecer en la fe. Compartir la vida."
3. Párrafo institucional.
4. "Conocé nuestra iglesia".

El título "La fe se vive en comunidad." debe permanecer grande, pesado y en Archivo.

La frase "Crecer en la fe. Compartir la vida." debe mantener Bodoni Moda, con una presencia editorial importante.

No convertir ambas frases en títulos pequeños.

El texto introductorio y el CTA deben permanecer visualmente asociados.

### Dirección de arte

- Fotografía a la izquierda.
- Tipografía grande a la derecha.
- Buena proporción entre columnas.
- Espacios negativos controlados.
- Sin grandes huecos innecesarios.
- No utilizar un contenedor de tarjeta alrededor de todo.
- Mantener la estética de Passion City.
- Preparar espacio para una flecha gráfica o pequeña marca editorial que conecte visualmente la fotografía y el contenido.

No colocar decoraciones encima de texto importante.

### BLOQUE 2 — REUNIÓN PRINCIPAL

Debajo del primer bloque, invertir la composición.

**Lado izquierdo:**

Contenido editorial:

- Eyebrow: "NOS ENCONTRAMOS".
- Título: "Reunión principal".
- Día protagonista: "DOMINGO".
- Horario: "19:30 hs".
- CTA: "Planeá tu visita".

El horario debe ser muy visible.

Se puede combinar Archivo con Bodoni Moda para destacar el día o la hora, según encaje mejor con la referencia.

No utilizar una tarjeta roja genérica como elemento principal.

Quiero una composición editorial abierta.

**Lado derecho:**

Una fotografía grande relacionada con una reunión o culto.

- Fotografía real.
- Relación de aspecto cuidada.
- Contenedor de imagen editorial.
- Puede admitir un pequeño elemento de collage.
- El protagonismo sigue siendo la fotografía.

### BLOQUE 3 — BANNER FOTOGRÁFICO

Debajo de la reunión principal, incorporar un banner horizontal ancho.

Quiero un bloque fotográfico con impacto visual.

Puede mostrar:

- Congregación durante una reunión.
- Alabanza.
- Comunidad reunida.
- Actividad espiritual.

Cuando tengamos fotografías oficiales, elegir una que funcione bien horizontalmente.

El banner debe:

- Ocupar un ancho importante.
- Tener altura controlada.
- Mantener buena resolución.
- Ser responsive.
- Utilizar `object-fit: cover`.
- Permitir ajustar el encuadre.
- No incluir textos extensos.

Puede incorporar una marca gráfica pequeña o una anotación editorial si mejora el diseño.

No recargarlo.

### BLOQUE 4 — TODOS LOS HORARIOS

Debajo del banner, crear una sección editorial de horarios.

Título propuesto:

"Nos encontramos."

Mostrar todos:

- Domingo — Reunión principal — 19:30 hs.
- Miércoles — Oración — 21:00 hs.
- Sábado — Jóvenes — 21:00 hs.
- Sábado — Niños — 16:30 hs.

### Diseño de horarios

- Filas de ancho amplio.
- Separadores finos.
- Día alineado a la izquierda.
- Actividad claramente visible.
- Horario alineado a la derecha.
- Tipografía legible.
- Mucho orden visual.
- Sin tarjetas individuales.
- Sin iconos innecesarios.

Puede repetirse el domingo aunque aparezca anteriormente como reunión destacada: aquí funciona como parte de la agenda completa.

### Restricción fundamental

**LOS MÓDULOS POSTERIORES A ESTA SECCIÓN SE CONSERVAN.**

No cambiar su estructura ni su composición.

Solo agregarles animaciones o detalles gráficos cuando estén justificados.

---

# 3. MOBILE — COMPOSICIÓN EDITORIAL

La versión mobile debe diseñarse intencionalmente.

No limitarse a aplicar una columna automática al diseño desktop.

Para la nueva sección de Inicio, utilizar este orden preferente:

### Primer bloque

1. Fotografía de la comunidad.
2. "La fe se vive en comunidad."
3. Frase serif editorial.
4. Presentación institucional.
5. CTA "Conocé nuestra iglesia".

### Segundo bloque

1. "Nos encontramos".
2. Reunión principal.
3. Domingo.
4. 19:30 hs.
5. CTA para visitar.
6. Fotografía de la reunión.

### Tercer bloque

Banner horizontal.

El banner debe mantener una proporción adaptada al celular para que la imagen no resulte excesivamente baja.

### Cuarto bloque

Lista completa de horarios.

### Requisitos mobile

- Buenas jerarquías tipográficas.
- Fotografías grandes y bien encuadradas.
- Márgenes consistentes.
- Separaciones moderadas.
- Sin espacios vacíos excesivos.
- Botones táctiles cómodos.
- Sin scroll horizontal.
- Sin textos cortados.
- Sin decoraciones que interfieran en la lectura.

Revisar especialmente 360, 375, 390 y 430 px.

El resultado debe sentirse como un diseño editorial creado para celular, no como el desktop reducido.

---

# 4. SISTEMA CREATIVO DE COLLAGE

Quiero incorporar una nueva capa de dirección artística.

**Esta parte es importante: quiero collage real, no simplemente tarjetas con una rotación de dos grados.**

La web debe adquirir ciertos elementos gráficos contemporáneos asociados a comunicación juvenil, worship y diseño editorial cristiano.

Quiero incluir:

- Flechas dibujadas.
- Cruces tipo X.
- Trazos manuales.
- Círculos imperfectos.
- Subrayados.
- Palabras resaltadas.
- Marcas gráficas.
- Etiquetas editoriales.
- Composiciones fotográficas superpuestas.
- Recortes y fotografías con diferentes proporciones.
- Pequeñas anotaciones.
- Elementos tipo scrapbook.

### 4.1 Flechas

Crear flechas SVG originales, con apariencia dibujada.

Variantes:

- Flecha curva.
- Flecha horizontal.
- Flecha diagonal.
- Flecha larga de dirección.

Aplicarlas selectivamente para:

- Relacionar fotografía y texto.
- Señalar un CTA.
- Marcar una sección.
- Conectar elementos de un collage.

No colocar flechas aleatoriamente.

### 4.2 Cruces y marcas X

Incorporar pequeñas X gráficas, dibujadas mediante SVG o CSS.

Deben ser recursos de composición.

No confundir las X decorativas con el símbolo institucional de la cruz cristiana.

### 4.3 Resaltados

Crear componentes de resaltado para palabras.

Variantes:

- Subrayado irregular.
- Trazo tipo marcador.
- Círculo dibujado alrededor de una palabra.
- Fondo coloreado selectivo.
- Línea decorativa.

Aplicarlos a palabras o frases importantes, sin modificar la doctrina.

Ejemplos posibles:

- Comunidad.
- Fe.
- Jesús.
- Juntos.
- Servir.

Utilizar el bordó como acento principal.

### 4.4 Collage fotográfico real

Crear composiciones con varias fotografías.

Ejemplos:

- Una foto grande.
- Una segunda foto parcialmente superpuesta.
- Una tercera imagen más pequeña con desplazamiento visual.
- Una flecha que conecta dos fotografías.
- Una etiqueta editorial.
- Un resaltado o anotación.

Permitir:

- Rotaciones sutiles.
- Superposición controlada.
- Diferentes relaciones de aspecto.
- Máscaras y recortes.
- Marcos delgados.
- Composiciones asimétricas.

No todas las fotografías deben estar perfectamente alineadas.

Sin embargo, mantener un sistema visual coherente.

### 4.5 Secciones con estética worship

Utilizar este lenguaje en secciones que puedan beneficiarse:

- Jóvenes.
- Alabanza y reuniones.
- Comunidad.
- Ministerios.
- Actividades.
- Algunos bloques del Inicio.

El estilo puede combinar:

- Fotografía auténtica.
- Tipografía sans pesada.
- Serif editorial.
- Marcas dibujadas.
- Collage fotográfico.
- Pequeñas anotaciones.

No crear una nueva página de Worship ni afirmar que existe un ministerio con ese nombre si no está confirmado.

### 4.6 Identidad cristiana

Mantener un enfoque respetuoso e institucional.

No transformar la web en un póster caótico ni utilizar símbolos arbitrarios con significados religiosos inventados.

### Intensidad visual

El collage debe ser una capa complementaria.

No quiero que todas las secciones tengan:

- Flechas.
- X.
- Fotografías rotadas.
- Resaltados.
- Anotaciones.

Distribuir estos recursos estratégicamente.

Crear contraste entre secciones visualmente intensas y otras minimalistas.

### Implementación técnica

Crear componentes o utilidades reutilizables para:

- Flechas SVG.
- Marcas decorativas.
- Resaltados.
- Composición collage.
- Anotaciones.

Usar SVG, CSS y recursos originales.

No descargar packs gráficos comerciales sin licencia.

No usar imágenes ajenas como fotografías de la congregación.

---

# 5. ANIMACIONES DEL COLLAGE

Quiero que los elementos gráficos también tengan movimiento.

Pero las animaciones deben sentirse profesionales, fluidas y editoriales.

### Flechas

Al entrar en pantalla:

- La línea puede dibujarse progresivamente.
- Utilizar SVG stroke-dasharray y stroke-dashoffset cuando corresponda.
- Duración aproximada de 500–900 ms.
- Una sola reproducción.

### Resaltados

Animación tipo marcador:

- La línea o el resaltado aparece de izquierda a derecha.
- Duración breve.
- Sin tapar el texto.
- Sin modificar el layout.

### Marcas X

- Aparición con ligera escala.
- Opacidad progresiva.
- Rotación mínima opcional.

### Fotografías de collage

Animar por capas:

1. Aparece la fotografía principal.
2. Entra suavemente la fotografía secundaria.
3. Se revela una marca o flecha.
4. Aparece una anotación.

Los elementos deben formar una secuencia, no activarse todos simultáneamente.

### Restricciones

- No utilizar efectos exagerados.
- No implementar movimiento continuo innecesario.
- No saturar la GPU.
- Evitar filtros pesados.
- Evitar animar propiedades que provoquen relayout.
- Preferir transform y opacity.
- Respetar reduced motion.

---

# 6. ANIMACIONES AL SCROLL

Implementar un sistema de revelado progresivo y reutilizable.

Priorizar CSS + IntersectionObserver.

Utilizar GSAP solo cuando exista una razón técnica o visual concreta.

### Section Reveal

Para grandes secciones:

- Opacidad 0 → 1.
- Traslación Y de aproximadamente 20–30 px.
- Duración 650–850 ms.
- Easing suave.
- Reproducción una sola vez.

### Stagger Reveal

Para títulos, párrafos, CTAs y pequeños grupos:

- Desfase de 80–140 ms.
- Animaciones coherentes.
- No dividir todos los textos por palabras o letras.

### Image Reveal

Para fotografías:

- Opacidad progresiva.
- Movimiento vertical sutil.
- Escala opcional de 1.025 → 1.
- Duración aproximada 700–900 ms.

### Module Reveal

Para grupos editoriales:

- Entrada progresiva de los módulos.
- Separación temporal pequeña.
- Sin cambios en la geometría final.

### Hero

Mantener la presentación actual si funciona bien.

Se puede mejorar la entrada inicial de título, subtítulo y CTA, pero sin modificar el diseño aprobado.

### Rendimiento y estabilidad

- No ocultar contenido si JavaScript falla.
- Inicializar observadores correctamente.
- Liberar listeners cuando sea necesario.
- No repetir animaciones indiscriminadamente.
- No introducir CLS.
- No bloquear el scroll.
- No animar grandes cantidades de elementos simultáneamente.
- Priorizar rendimiento mobile.

---

# 7. VIEW TRANSITIONS ESTILO iPHONE

Quiero una navegación suave entre páginas, inspirada en las transiciones push y back de iOS.

### Tecnología

Primero comprobá la versión actual de Astro.

Consultá la API vigente de View Transitions y `ClientRouter`.

https://docs.astro.build/en/guides/view-transitions/

Utilizá las funcionalidades nativas de Astro cuando sean suficientes.

No incorporar React ni bibliotecas externas de navegación.

### Navegación hacia adelante

Ejemplo:

Inicio → Nosotros.

Comportamiento:

- La página actual se desplaza suavemente hacia la izquierda.
- La siguiente entra desde la derecha.
- Opacidad controlada.
- Sensación de continuidad.
- Sin parpadeos ni pantalla blanca.

Duración orientativa: 300–400 ms.

### Navegación hacia atrás

Ejemplo:

Nosotros → Inicio mediante historial.

- La página actual se mueve hacia la derecha.
- La página anterior reaparece desde la izquierda.
- La transición utiliza una dirección opuesta a la navegación forward.

Comprobar los mecanismos oficiales disponibles para conocer la dirección de navegación.

No inventar una gestión manual de historial si Astro ya ofrece una solución.

### Elementos persistentes

Evaluar persistencia o transiciones compartidas para:

- Emblema institucional.
- Header.
- Navegación compartida.

Utilizar `transition:name` y `transition:persist` solamente cuando tengan sentido y sean compatibles con la versión instalada.

### Menú mobile

Al seleccionar un enlace:

1. Cerrar el menú.
2. Liberar cualquier bloqueo de scroll.
3. Navegar.
4. Ejecutar la transición.
5. Restaurar el foco de manera apropiada.
6. Dejar la página en la posición correcta.

### Navegación y scroll

Probar:

- Enlaces internos.
- Navegación desde footer.
- Botón atrás.
- Botón adelante.
- Recarga directa.
- Fragmentos.
- Navegación desde `/links`.

No implementar un gesto swipe-back propio que interfiera con los gestos nativos del navegador.

### Compatibilidad con animaciones

Si utilizás `ClientRouter`, asegurar que IntersectionObserver y demás scripts se inicialicen después de cada navegación.

Considerar el evento `astro:page-load` y el ciclo de vida de navegación vigente.

No acumular listeners, observadores ni instancias de animación.

### Accesibilidad

Si `prefers-reduced-motion: reduce`, desactivar los desplazamientos animados y mantener navegación funcional.

Si el navegador no soporta la API, utilizar navegación normal.

---

# 8. FOOTER — CCVS GIGANTE

Actualmente existe un wordmark textual gigante que dice "Comunidad Cristiana".

Reemplazarlo por:

**CCVS**

### Diseño

- Archivo con peso elevado.
- Mayúsculas.
- Tamaño responsive mediante clamp().
- Tracking compacto.
- Gran presencia visual.
- Anchura cuidadosamente ajustada.
- Sin overflow.
- Manteniendo el diseño actual del footer.

Puede incorporar un pequeño detalle gráfico editorial si no afecta la legibilidad.

El cambio es tipográfico.

No reemplazar el emblema institucional.

El header debe seguir mostrando solamente el emblema original de Comunidad Cristiana.

---

# 9. REDES SOCIALES OFICIALES

Incorporar estos enlaces reales en el sitio.

### Instagram

https://www.instagram.com/jovenesccvs/

Etiqueta:

"Instagram — Jóvenes CCVS"

Es una cuenta de jóvenes. No identificarla incorrectamente como Instagram general de toda la congregación.

### Facebook

https://www.facebook.com/comunidadcristiana.villasarmiento/

Etiqueta:

"Facebook — Comunidad Cristiana Villa Sarmiento"

### YouTube

https://www.youtube.com/@comunidadcristianavillasar9819/videos

Etiqueta:

"YouTube — Comunidad Cristiana Villa Sarmiento"

### Google Maps

https://share.google/72tcJRTtkSLqOezwT

Comprobar si el enlace abre correctamente la ubicación deseada.

Si no puede validarse, documentarlo como pendiente, sin inventar coordenadas.

### Incorporación

Agregar enlaces en:

- Footer.
- `/links`.
- `/visitanos`, para ubicación.

Utilizar iconos reconocibles y accesibles.

Conservar una única fuente de verdad para URLs, etiquetas y destinos en los datos del sitio.

Para enlaces externos, usar atributos de seguridad apropiados.

No agregar WhatsApp porque todavía no tenemos un número oficial confirmado.

---

# 10. REDISEÑO DE `/links`

Actualizar la página existente conservando su identidad visual.

La página debe funcionar como un Linktree propio.

### Identidad superior

Emblema original de Comunidad Cristiana.

Nombre:

Comunidad Cristiana Villa Sarmiento.

Descripción breve institucional.

### Enlaces principales

Orden recomendado:

1. Visitá nuestra iglesia.
2. Horarios de reuniones.
3. Cómo llegar — Google Maps.
4. Instagram — Jóvenes CCVS.
5. Facebook — Comunidad Cristiana Villa Sarmiento.
6. YouTube — Videos y predicaciones.
7. Conocé nuestra historia.
8. Ministerios.

No repetir enlaces innecesariamente.

### Diseño

- Mobile-first.
- Botones amplios.
- Tipografía cuidada.
- Espaciado equilibrado.
- Bordó como acento.
- Estados hover y focus.
- Animaciones suaves de aparición.
- Sin efectos que compliquen la navegación.

Los enlaces internos deben utilizar las View Transitions del sitio.

Los externos deben funcionar como enlaces normales.

---

# 11. PÁGINA DE TÉRMINOS Y CONDICIONES

Crear la ruta:

`/terminos-y-condiciones`

Diseñar utilizando el layout institucional existente.

### Contenido

Redactar un texto base claro en español argentino que incluya:

1. Identificación del sitio.
2. Finalidad informativa e institucional.
3. Uso permitido del contenido.
4. Propiedad de fotografías, logotipos y textos.
5. Enlaces externos.
6. Actualización de horarios y actividades.
7. Limitaciones razonables del servicio.
8. Contacto institucional cuando se confirme.
9. Fecha de actualización.

No copiar los términos de Passion City.

No inventar CUIT, razón social, correo, domicilio legal ni datos jurídicos.

No utilizar cláusulas abusivas.

Esta página debe quedar marcada como borrador pendiente de revisión institucional y jurídica antes de publicarse definitivamente.

### Footer

Agregar enlace hacia la nueva ruta.

### Privacidad

No implementar analíticas ni herramientas de seguimiento en esta fase.

Dejar documentada la futura necesidad de una política de privacidad adaptada a las tecnologías que efectivamente se utilicen.

---

# 12. ANIMACIONES EN SECCIONES EXISTENTES

La web actual tiene bloques inferiores que visualmente me gustan.

**No quiero que los rediseñes.**

Sin embargo, sí quiero darles movimiento.

Aplicar selectivamente:

- Section reveals.
- Entrada progresiva de fotografías.
- Stagger de encabezados y CTAs.
- Microinteracciones.
- Flechas y marcas decorativas cuando encajen.
- Animaciones específicas de collage en las secciones elegidas.

Evitar modificar:

- Anchuras.
- Tipografías.
- Jerarquía.
- Orden de contenido.
- Composición.
- Espaciados aprobados.

Si alguna decoración requiere alterar de forma importante un componente, descartá la decoración.

La fidelidad al diseño aprobado tiene prioridad.

---

# 13. ESTRATEGIA DE DIRECCIÓN ARTÍSTICA

Para que la web no se vea sobrecargada, aplicar una distribución visual intencional.

### Inicio

Nivel creativo: alto.

- Composiciones fotográficas.
- Flechas.
- Collage puntual.
- Resaltados.
- Animaciones por módulos.

### Nosotros

Nivel creativo: medio.

- Composición editorial.
- Una o dos intervenciones gráficas.
- Fotografías con movimiento sutil.
- Tipografía como protagonista.

### Ministerios

Nivel creativo: alto.

- Fotografía.
- Collage.
- Pequeñas marcas gráficas.
- Composiciones asociadas a jóvenes, comunidad y servicio.

### Visitarnos

Nivel creativo: bajo.

Priorizar claridad, horarios, dirección y navegación.

### Links

Nivel creativo: bajo a medio.

Priorizar velocidad, identidad y facilidad de uso.

### Footer

Nivel creativo: medio.

Wordmark CCVS gigante y detalles gráficos moderados.

---

# 14. RECURSOS FOTOGRÁFICOS

No generar una galería ficticia.

No utilizar imágenes de Passion City como fotografías propias.

Priorizar recursos reales disponibles en el repositorio.

Si faltan imágenes:

- Mantener placeholders editoriales.
- Definir proporciones.
- Preparar nombres de archivo claros.
- Documentar imágenes pendientes.
- Evitar bloques vacíos excesivamente grandes.

### Recursos pendientes específicos

- Foto vertical para primer bloque editorial.
- Foto de culto para segundo bloque.
- Banner horizontal.
- Fotos de jóvenes.
- Fotos de comunidad.
- Fotos de ayuda social.

Crear una lista que indique dónde se utiliza cada recurso, qué proporción conviene y si hace falta una variante mobile.

No publicar fotografías de menores sin las autorizaciones correspondientes.

---

# 15. RENDIMIENTO

Las mejoras visuales no deben degradar significativamente la experiencia.

### Requisitos

- Animar principalmente transform y opacity.
- Evitar cambios de layout durante animaciones.
- Reducir animaciones en mobile cuando sea conveniente.
- Evitar filtros y sombras pesadas.
- Usar imágenes optimizadas.
- No cargar recursos grandes innecesariamente.
- Evitar librerías de animación duplicadas.
- No introducir animaciones permanentes sin justificación.
- Implementar reduced motion.

Si una animación perjudica notablemente el rendimiento, simplificarla.

---

# 16. QA OBLIGATORIO

Revisar como mínimo:

### Desktop

1440 × 900.

### Mobile

390 × 844.

### Otros anchos

360, 375, 430, 768 y 1024 px.

### Comprobaciones visuales

- Nueva estructura de Inicio.
- Fotografía izquierda / texto derecha.
- Reunión izquierda / fotografía derecha.
- Banner horizontal.
- Horarios completos.
- Espaciados.
- Legibilidad.
- Collage.
- Flechas.
- Resaltados.
- Ausencia de desbordamientos.
- Secciones inferiores preservadas.
- Wordmark CCVS.

### Comprobaciones funcionales

- Menú desktop.
- Menú mobile.
- Enlaces internos.
- Enlaces externos.
- Google Maps.
- `/links`.
- Términos y condiciones.
- View Transitions forward/back.
- Historial del navegador.
- Reduced motion.
- Scroll.
- Ausencia de listeners duplicados.

### Comprobaciones técnicas

- Astro check.
- Build.
- Lint, si está configurado.
- Pruebas existentes.
- Accesibilidad.
- Errores de consola.
- Navegación entre todas las rutas.

Realizá capturas comparativas antes y después de los cambios principales si el entorno lo permite.

No afirmes que ejecutaste pruebas que no pudiste realizar.

---

# 17. ORDEN DE IMPLEMENTACIÓN

Ejecutar en este orden:

**FASE A — Respaldo**

Guardar estado actual y revisar únicamente los componentes relevantes.

**FASE B — Reorganización Inicio**

Implementar la nueva composición editorial de cuatro bloques.

**FASE C — Sistema de collage**

Crear flechas, marcas, resaltados y composiciones fotográficas reutilizables.

**FASE D — Motion Design**

Implementar animaciones al scroll y animaciones gráficas.

**FASE E — View Transitions**

Incorporar navegación estilo iOS.

**FASE F — Identidad y enlaces**

Actualizar footer, redes, Google Maps y `/links`.

**FASE G — Página legal**

Crear términos y condiciones.

**FASE H — QA**

Revisar responsive, accesibilidad, rendimiento y funcionamiento.

Podés gestionar estas fases internamente sin pedirme confirmación entre ellas.

---

# 18. OPTIMIZACIÓN DE TOKENS

Estamos utilizando GPT-6.1 Sol Medium.

Quiero eficiencia.

- No releas todo el prompt maestro V3.
- No reconstruyas componentes sin necesidad.
- No investigues tecnologías ajenas al trabajo.
- No generes tres variantes de la misma sección.
- No crees informes extensos por cada cambio.
- No instales librerías innecesarias.
- No agregues animaciones a ciegas.
- Reutilizá el código existente cuando esté bien construido.
- Concentrate en los componentes afectados.
- Compará capturas antes de modificar geometrías.
- No proceses videos enteros si las capturas resuelven la duda.
- No crees contenido institucional ficticio.

Buscá un resultado visualmente ambicioso, pero con una implementación técnica sencilla.

---

# 19. CRITERIOS DE ACEPTACIÓN

El trabajo estará terminado cuando:

- [ ] Se conserve el diseño V3 aprobado.
- [ ] El primer bloque tenga fotografía izquierda y texto derecha.
- [ ] El segundo bloque tenga reunión principal izquierda y foto derecha.
- [ ] Exista el banner fotográfico horizontal.
- [ ] Los horarios completos aparezcan debajo del banner.
- [ ] La versión mobile tenga una composición propia.
- [ ] Los módulos inferiores sigan intactos visualmente.
- [ ] Existan recursos editoriales de collage.
- [ ] Existan flechas originales.
- [ ] Existan marcas X y trazos.
- [ ] Existan resaltados de texto.
- [ ] Existan collages fotográficos donde correspondan.
- [ ] Las animaciones de entrada funcionen.
- [ ] Los elementos de collage tengan movimiento sutil.
- [ ] La navegación utilice transiciones inspiradas en iOS.
- [ ] Avance y retroceso tengan direcciones coherentes.
- [ ] El footer muestre CCVS gigante.
- [ ] El header conserve el emblema original.
- [ ] Instagram, Facebook y YouTube estén enlazados.
- [ ] Google Maps esté incorporado o pendiente de validación.
- [ ] `/links` incluya redes y ubicación.
- [ ] Exista `/terminos-y-condiciones`.
- [ ] Las animaciones respeten reduced motion.
- [ ] No exista scroll horizontal.
- [ ] No haya degradaciones importantes de rendimiento.
- [ ] Todas las rutas funcionen.
- [ ] Typecheck y build terminen correctamente.
- [ ] Las pruebas relevantes estén verificadas.

---

# 20. ENTREGA FINAL

Al finalizar, informame únicamente:

1. Resumen de cambios.
2. Componentes modificados.
3. Cómo quedó Inicio en desktop y mobile.
4. Recursos de collage incorporados.
5. Animaciones implementadas.
6. Funcionamiento de View Transitions.
7. Redes sociales y Google Maps.
8. Footer y página de términos.
9. Resultados de pruebas.
10. Fotografías y datos todavía pendientes.

No hagas push.

No hagas deploy.

No agregues analíticas todavía.

## OBJETIVO FINAL

Quiero una web que combine la elegancia editorial de Passion City Church con una identidad visual moderna, fotográfica y creativa.

Debe sentirse como una experiencia digital de una comunidad cristiana contemporánea.

Quiero grandes fotografías, una tipografía excelente, composiciones alternadas, collage real, flechas, resaltados, animaciones suaves y una navegación fluida inspirada en iOS.

Pero por encima de todo debe conservar claridad, legibilidad, respeto por la identidad institucional y excelente funcionamiento mobile.

**No rediseñes lo que ya funciona. Elevá su calidad visual.**

Comenzá la implementación completa de la Fase 4.
