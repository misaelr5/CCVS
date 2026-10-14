# CCVS — FASE 4.2: AJUSTES ADICIONALES DE MENÚ, REDES Y ANIMACIONES

Estos requisitos se incorporan a la Fase 4.2 anterior. No reemplaces los cambios ya solicitados ni reconstruyas componentes que funcionan.

## 1. Animaciones en todas las páginas

Quiero que todas las páginas y secciones tengan un sistema de animación consistente, no solamente Inicio y Nosotros.

Aplicar a:

- Inicio.
- Nosotros.
- Ministerios.
- Visitarnos.
- Links.
- Términos y condiciones.

Cada página debe tener una animación de entrada propia, adaptada a su composición.

Incorporar movimientos en diferentes direcciones según la posición de los elementos:

- Títulos que aparecen desde abajo.
- Fotografías laterales que se revelan horizontalmente.
- Bloques que aparecen progresivamente.
- Listas con stagger.
- Collages que aparecen por capas.
- Enlaces con microinteracciones.

Conservar las View Transitions globales estilo iOS y asegurar que las animaciones vuelvan a inicializarse correctamente después de navegar entre páginas.

No realizar animaciones excesivas ni perjudicar el rendimiento mobile.

## 2. Animación del botón hamburguesa

El botón de opciones ubicado junto a "Visitarnos" debe tener una animación de apertura y cierre.

Estado inicial:
- Icono de tres líneas.
- Bordes y colores institucionales actuales.

Al abrir:
1. Las líneas se transforman suavemente en una X.
2. Se despliega el menú con una transición fluida.
3. Aparecen los enlaces progresivamente.
4. Las redes sociales aparecen al final de la secuencia.

Al cerrar:
1. El contenido desaparece suavemente.
2. El panel se cierra.
3. La X vuelve a convertirse en tres líneas.

Usar una duración aproximada de 300–450 ms.

No cambiar innecesariamente el tamaño, posición ni estilo del botón actual.

Garantizar accesibilidad con `aria-expanded`, `aria-controls`, Escape y navegación por teclado.

## 3. Animación del menú completo

El menú que contiene:

**La iglesia**
- Inicio.
- Nosotros.
- Historia.
- Qué creemos.

**Participá**
- Ministerios.
- Horarios.
- Visitarnos.

**Conectate**
- Todos los enlaces.

Debe abrirse de forma moderna y fluida.

### Animación propuesta

1. El panel aparece mediante una transición suave.
2. Los títulos de cada categoría se revelan.
3. Los enlaces aparecen con un stagger de 50–90 ms.
4. Las redes sociales se revelan al final.

Los enlaces pueden utilizar un movimiento vertical inicial de 12–20 px y una transición de opacidad.

Conservar la composición editorial y las fuentes actuales.

En mobile, reorganizar el contenido verticalmente para que sea fácil de leer y navegar, permitiendo scroll dentro del menú si fuera necesario.

No bloquear ni recortar elementos del menú en pantallas pequeñas.

## 4. Redes sociales — Iconos en lugar de textos gigantes

Actualmente las tres redes aparecen como enlaces tipográficos enormes.

Quiero sustituir esa presentación por iconos reconocibles.

Redes:

**Instagram — Jóvenes CCVS**
https://www.instagram.com/jovenesccvs/

**Facebook — Comunidad Cristiana Villa Sarmiento**
https://www.facebook.com/comunidadcristiana.villasarmiento/

**YouTube — Comunidad Cristiana Villa Sarmiento**
https://www.youtube.com/@comunidadcristianavillasar9819/videos

### Diseño

- Utilizar iconos SVG reconocibles de Instagram, Facebook y YouTube.
- Mantener proporciones coherentes.
- Aplicar una estética minimalista.
- Utilizar negro como color base y bordó institucional para hover/focus.
- Incorporar transiciones discretas.
- No mostrar los nombres completos como títulos gigantes.
- Mantener etiquetas accesibles mediante `aria-label` o texto oculto visualmente.
- No utilizar emojis como iconos.

## 5. Posición de las redes — AL FINAL DEL MENÚ

**Esta es una instrucción de diseño obligatoria.**

Las tres redes sociales deben aparecer al final de todo el contenido del menú desplegable.

Orden visual:

1. La iglesia.
2. Participá.
3. Conectate.
4. Separador visual discreto.
5. Redes sociales.

Debajo de los enlaces principales, agregar una sección pequeña:

**Seguinos**

Y debajo, una fila horizontal de iconos:

Instagram | Facebook | YouTube

No colocar las redes antes de los enlaces principales ni en una columna que compita con la navegación.

### Desktop

Los iconos deben quedar al final de la composición, preferentemente en la zona inferior del menú, con espacio suficiente respecto de las columnas de navegación.

### Mobile

Los iconos deben quedar después del último enlace de navegación, alineados horizontalmente.

No deben ocupar demasiado alto.

Si la pantalla es pequeña, el usuario debe poder desplazarse para llegar a ellos.

No fijarlos encima del contenido.

## 6. Redes sociales del footer

Aplicar el mismo sistema visual de iconos al footer para mantener coherencia.

- Instagram.
- Facebook.
- YouTube.

Los tres deben compartir tamaños, estilo y microinteracciones.

Conservar los enlaces actuales.

Si actualmente existen textos descriptivos extensos, reemplazarlos por una presentación más compacta con iconos, sin perder accesibilidad.

La página `/links` puede mantener los nombres descriptivos junto a los iconos, porque allí la prioridad es identificar claramente cada destino.

## 7. Microinteracciones

Agregar:

- Hover sutil en iconos.
- Cambio de negro a bordó.
- Pequeño desplazamiento o escala.
- Feedback táctil.
- Transición de 180–250 ms.

No utilizar efectos exagerados ni rotaciones grandes.

## 8. Validación

Comprobar:

- Apertura y cierre del botón hamburguesa.
- Transformación de tres líneas a X.
- Animación progresiva del menú.
- Orden correcto de enlaces y redes.
- Redes al final en desktop y mobile.
- Enlaces externos funcionales.
- Iconos accesibles.
- Transiciones de todas las páginas.
- Compatibilidad con reduced motion.
- Ausencia de scroll horizontal.
- Funcionamiento después de varias navegaciones con Astro.
- Build y typecheck correctos.

No modificar el diseño aprobado fuera de estos ajustes.

No hacer push ni deploy.

**Resultado esperado:** un menú editorial con apertura fluida, enlaces animados, redes sociales compactas y ubicadas al final, y un sistema de animaciones consistente en todas las páginas.