# CCVS — transición lateral limpia

Pedido del 15/10/2026: barrido de izquierda a derecha, sin recortes y con continuidad visual. Cambios locales; sin push ni deploy.

## Implementado

- Desplazamiento continuo de **380 ms**, con desaceleración suave. La página nueva entra desde la izquierda y la anterior sale a la derecha. Al retroceder se invierte el sentido.
- Header separado y estable entre páginas que lo contienen. Links conserva su composición compacta.
- Fondo claro institucional durante toda la transición; ambas páginas permanecen opacas y se desplazan juntas. Se eliminaron las máscaras y el intervalo central vacío del barrido anterior.
- Durante navegación interna el contenido llega asentado: los títulos/fotos no suman otra entrada a la transición de página. La primera carga y los reveals posteriores al scroll conservan su comportamiento.
- Reduced motion, navegación desde arriba, anclas, teclado, menú y fallback sin View Transition API conservados.

## Causa y arquitectura

El efecto anterior ocultaba el snapshot root, movía solamente main con recortes, exponía un fondo bordó y combinaba el cambio de página con la entrada de títulos. Ahora el snapshot cubre el viewport completo, incluido el footer, y el header tiene su grupo estable. Esto también evita interpolar la geometría de un main muy alto hacia otro corto.

Se reutilizó [View Transitions de Astro](https://docs.astro.build/en/guides/view-transitions/) y CSS nativo, sin nuevas dependencias. `ui.ts` sigue el ciclo de vida de la transición para evitar entradas superpuestas; libera la referencia tanto al completar como al cancelar.

Archivos de producto: `src/layouts/BaseLayout.astro`, reglas de transición de `src/styles/global.css` y `src/scripts/ui.ts`. Se conservaron los cambios concurrentes de contenidos, reuniones, fotos y tarjetas.

## Validación

- Typecheck: **56 archivos, cero errores, warnings o hints**. Los respaldos de QA se guardan como texto para que no sean interpretados como componentes del proyecto; se limpiaron imports sin uso de un script auxiliar de la auditoría.
- Build aislado: seis páginas, 64 derivados de imágenes. Verificación estática: 177 enlaces/anclas y 58 recursos válidos en el build estándar de esta revisión.
- Pruebas nuevas en 390×844 y 1440×900: snapshots opacos, sin clip-path, bordes contiguos en cinco instantes de la animación, header estable, forward/back/forward y título sin animación superpuesta.
- Suite final: **80 pruebas aprobadas** en 1,5 minutos; resultados en `qa-artifacts/transicion-lateral/tests-final.log`. Capturas de frames y grabaciones reales de navegación en esa misma carpeta.
- Una corrida sobre dist compartido coincidió con su regeneración por otra tarea. Se repitió sobre build independiente servido en 127.0.0.1:4333. La prueba de historial ahora espera el contenido de Inicio antes de avanzar: la dirección del navegador puede actualizarse antes de que Astro cambie el DOM. No se añadieron esperas temporales para ocultar fallos.

## Límites y siguiente paso

Verificación visual y automatizada en Chromium; Safari/iPhone físico pendiente. La percepción final del ritmo requiere revisión del usuario en el preview. No se ejecutó otra optimización de SEO/contenidos ni se implementó el roadmap de auditoría.

Concepto útil: **una sola animación debe gobernar el cambio de página**. Las entradas de elementos sirven en carga/scroll; superponerlas al movimiento global puede generar saltos perceptivos aunque cada efecto funcione por separado.
