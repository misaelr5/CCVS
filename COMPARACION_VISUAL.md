# Comparación visual V3

## Evidencia y método

Referencia principal: capturas de la portada global de Passion City y `/us/`, incluidas en `referencias/`. Se leyeron ambas URLs primarias, sin tomar la web DC como referencia de píxeles.

Se identificaron los ocho videos con un fotograma por archivo; son grabaciones de escritorio. No se procesaron completos ni se atribuyó a ese muestreo una verificación de timing o del menú móvil. Los estados mobile se estudiaron en `mobile_referencia_4_estados.jpg`.

Capturas locales reales con Chromium: 390×844 y 1440×900, fuentes cargadas. Primera pasada en `qa-artifacts/etapa-a/`, ajustes en `etapa-a-corregida/` y `etapa-a-segunda/`, capturas finales de todas las páginas en `qa-artifacts/final/`.

Comparativas lado a lado en `qa-artifacts/comparativas/`: inicio/nosotros, mobile/desktop. Se conserva la proporción de cada imagen al presentar la comparación; las fuentes no tienen todas el mismo viewport. No se calcula un porcentaje de similitud ni se afirma identidad píxel a píxel.

## Cinco desajustes y correcciones

| Observación inicial | Corrección y resultado |
| --- | --- |
| Hero mobile excesivamente alto respecto al bloque de referencia | Alto de 600 a 575 px a 390; ancho 342 px, márgenes de 24 px. Crop vertical independiente preparado. |
| Titular desktop con cuatro líneas por ancho insuficiente | Área de texto de 596 a 676 px; copy con tres frases, sin br por breakpoint; final tres líneas desktop y cuatro mobile. |
| NOSOTROS invadía el espacio de la imagen | Archivo con eje de ancho; tamaño desktop de 118 a 108 px, tracking explícito y ancho 80%. Mobile 60.06 px, adaptado a una palabra mucho más larga que US. |
| Imagen de Nosotros demasiado grande a la derecha | A 1440: pasó de x=590.4, ancho=777.6 y alto=510 a x=531.2, ancho=660.8 y alto=492. Contenedor asimétrico de 1120 px. |
| Declaración serif demasiado alta y con demasiados saltos | Tamaño desktop 57.6 px y columna acotada; cinco líneas finales. Mobile: 44.07 px y cinco líneas. Intro independiente; imagen antes del texto como en la captura mobile. |

Además se corrigió una transferencia de texto UTF-8 que había producido caracteres mal codificados. La inspección del HTML compilado ahora rechaza ese problema.

## Sistema aplicado al resto

Header compacto con emblema madre y menú; portada de inicio con texto blanco y CTA bordó; titulares sans pesados y serif de alto contraste; fotografías reservadas con radios discretos; bloques alternados; doctrina numerada; footer por columnas con texto grande.

Las capturas finales de Ministerios, Visitarnos, Links, menú y acordeón se revisaron en mobile y desktop. La revisión automatizada cubrió los siete anchos pedidos. Al contrastar el footer con la referencia, el texto grande se cambió de blanco a bordó para corregir el contraste detectado por axe.

## Diferencias que siguen presentes

- Faltan las fotografías auténticas: el prototipo tiene reservas neutras. No se puede juzgar fidelidad fotográfica, rostros, recorte definitivo o contraste sobre fotos inexistentes.
- Archivo/Bodoni Moda no son GT America/Saol. El peso, ancho, tracking y geometría se ajustaron, pero las formas de letras y el contraste no son idénticos.
- El idioma y la longitud del contenido CCVS cambian los saltos de línea y alturas. No se copiaron mensajes de Passion ni se forzó el texto a un lema ajeno.
- El menú modal es una adaptación funcional probada. No se verificó el timing exacto del menú original en los videos.
- El footer usa bordó para legibilidad; no reproduce el texto blanco de contraste bajo de la captura.
- Las medidas mobile se basan en Chromium emulado, no en Safari/iPhone físicos.

## Archivos de revisión

- `qa-artifacts/final/inicio-390.png`
- `qa-artifacts/final/inicio-1440.png`
- `qa-artifacts/final/nosotros-390.png`
- `qa-artifacts/final/nosotros-1440.png`
- Capturas completas de las cinco rutas, menú y creencias en la misma carpeta.
- `qa-artifacts/final/measurements.json`: medidas del DOM local.
