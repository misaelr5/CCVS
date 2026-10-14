# CCVS — tarjeta de navegación, entradas, scroll y footer

Pedido vigente del 14/10/2026, posterior a Fase 4.2. Se conserva la base editorial y todo el trabajo pendiente; este pedido cambia expresamente el comportamiento del menú y la composición del footer.

## Implementado

- Menú en tarjeta anclada al header, con recorte y movimiento de 400 ms al abrir y 300 ms al cerrar. Sin animar opacidad del panel o sus enlaces, sin backdrop, body fijo ni cambio de geometría de la página. En mobile tiene scroll interno y las redes quedan después de los enlaces.
- Hamburguesa/X, etiquetas ARIA actualizadas, Escape, cierre desde el botón y al pulsar fuera. La página sigue interactiva; Tab puede salir del menú y lo cierra. Se conserva el scroll incluso cuando el foco nativo de `dialog.show()` intenta moverlo. Cada reapertura inicia el scroll interno de la tarjeta arriba.
- Navegación desde arriba, incluyendo retroceso/avance y cargas completas sin View Transition API. Los destinos explícitos con `#historia`, `#creencias`, `#horarios` o un ministerio conservan el salto a su sección.
- Entrada de títulos por recorte y movimiento, con 950 ms y stagger del resto del contenido. Se evita recortar el desborde tipográfico intencional de Nosotros durante la entrada. Las transiciones globales existentes de Astro se conservan.
- Objetos editoriales originales que responden al scroll en Inicio, Nosotros, Ministerios, Visitarnos, Links y Términos. También se mueven las marcas existentes de los collages. Desplazamiento máximo de 24 px y rotación máxima de 8 grados, sin mover texto ni interceptar el scroll.
- Footer organizado por identidad, iglesia, participación y visita/redes. Logo madre prioritario, CCVS limpio pequeño y CCVS tipográfico como fondo SVG tenue, fuera del flujo y sin recibir interacción.

## Arquitectura y soluciones reutilizadas

Astro ClientRouter, HTML dialog no modal, Web Animations, IntersectionObserver, listeners pasivos y requestAnimationFrame. `ScrollAccent.astro` comparte los dibujos originales de `EditorialMark.astro`; `scroll-motion.ts` solo actualiza objetos próximos al viewport. Se leen geometrías antes de escribir estilos y se cancelan listeners, observers y animaciones al cambiar de página. No se incorporan dependencias.

El contenido está visible sin esperar JavaScript. Reduced motion cancela las entradas y deja las marcas estáticas. Navegación y doctrina siguen disponibles sin JavaScript.

Documentación consultada: [ciclo de navegación y scroll de Astro](https://docs.astro.build/en/guides/view-transitions/#astroafter-swap), [dialog.show() no modal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show).

## Validación ejecutada

- `npm run check`: 42 archivos, cero errores, warnings o hints.
- `npm run build`: seis páginas estáticas.
- `npm run verify:static`: 173 enlaces internos/anclas y 36 recursos válidos.
- `npm run test:e2e`: **72 pruebas aprobadas**. Rutas en 360/375/390/430/768/1024/1440, menú pequeño 360×640, teclado, foco, apertura rápida repetida, scroll preservado, navegación forward/back, fallback sin API, reinicio de entradas y objetos en las seis rutas, reduced motion y contenido sin JavaScript.
- Axe sin infracciones reportadas en las reglas A/AA evaluadas sobre las seis rutas a 390/1440 y menú a 360/390/1440. No equivale a certificación.
- `git diff --check` correcto. No existe script de lint separado.

## Comparación visual

Capturas anteriores en `qa-artifacts/antes-menu-tarjeta/`; posteriores y fotogramas de motion en `qa-artifacts/menu-tarjeta/`. Revisión visual de tarjeta desktop/mobile, redes al final, portada de las seis páginas, entrada y footer. Correcciones durante QA: salto de foco nativo, recorte lateral del título Nosotros y espera de fin de la transición de la hamburguesa en el test.

| Captura de footer | Anterior | Actual |
| --- | ---: | ---: |
| 390 px | 1113 px de alto | 708 px de alto |
| 1440 px | 997 px de alto | 440 px de alto |

## Respaldo y límites

Respaldo de los cambios locales anteriores en `D:\CCVS-respaldos\antes-menu-tarjeta-20261014`: 84 archivos, manifest SHA-256 y bundle Git verificado. Dependencias y artefactos generados no se duplicaron. Las referencias y videos continúan excluidos del repositorio público.

Los ajustes se entregaron inicialmente locales. El usuario autorizó después publicarlos en Vercel: ver `DESPLIEGUE_VERCEL.md`. Siguen pendientes de commit y push. No se probaron dispositivos físicos, Safari ni métricas Lighthouse. Se abrió posteriormente el sitio local en el navegador Zen del usuario; las pruebas automatizadas continúan en Chromium. Fotografías propias, logos definitivos y aprobación institucional continúan pendientes.

## Próximo paso y conceptos útiles

Revisar la sensación del menú y de las entradas en el celular antes de aprobar estos ajustes.

1. Un diálogo no modal permite mantener la página operativa; un modal introduce una barrera de interacción y normalmente bloquea el fondo.
2. Animar transformaciones evita desplazar el layout; agrupar lecturas y escrituras reduce trabajo de renderizado.
3. Con navegación cliente, cada cambio de página requiere inicializar su comportamiento y limpiar el anterior para no acumular eventos.
