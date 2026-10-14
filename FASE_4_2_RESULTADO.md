# Fase 4.2 — menú, redes y motion

Implementada sobre Fase 4, sin reconstruir el sitio ni incorporar dependencias. Respaldo Git: `backup/antes-fase4-2-20261014`, commit `2f4712f`.

## Cambios

- `SocialLinks.astro`: un mismo componente para los tres iconos SVG del menú y footer. URLs actuales conservadas, aria-label específico, title, target seguro y áreas táctiles de 44 px. Links conserva textos descriptivos.
- `SiteHeader.astro`: tres grupos de navegación; después, separador, dirección, Seguinos y fila horizontal de redes. Ya no hay una cuarta columna de textos sociales grandes.
- La hamburguesa y el cierre usan tres líneas. El control visible dentro del diálogo ocupa el mismo lugar del botón del header; ambos cambian de tres líneas a X mediante transform/opacity. El header conserva exclusivamente el emblema madre.
- Apertura del panel: 360 ms. Títulos progresivos y enlaces con stagger de 60 ms; redes al final de la secuencia. Cierre: 320 ms, X a líneas, retorno de foco y liberación de scroll al finalizar.
- Al elegir un enlace o preparar navegación Astro, el cierre/desbloqueo es inmediato para no transportar un modal abierto al siguiente documento. Escape y Tab/Shift+Tab conservan su comportamiento.
- Todas las páginas tienen entrada propia: hero de Inicio, portada asimétrica de Nosotros, encabezados de Ministerios y Visitarnos, logo/lista de Links y portada/capítulos de Términos. Títulos desde abajo, fotos laterales horizontalmente en desktop, listas con stagger y collage por capas.
- Se mantienen View Transitions y reduced motion. Inicialización por documento, handlers con AbortController y limpieza de observadores. Una segunda inicialización en el mismo body no cancela la entrada inicial.
- Microinteracciones de iconos de 200 ms: negro a bordó, desplazamiento de 2 px y feedback táctil. Reduced motion elimina desplazamientos.

El contenido es visible sin JavaScript; no se usan estilos iniciales permanentes de ocultación. El menú permite scroll interno en pantallas pequeñas. No se alteraron las páginas, textos, fuentes, logos ni las composiciones fuera de estos ajustes.

## Validación real

- Astro check: 39 archivos, cero errores, advertencias o hints.
- Build: seis rutas estáticas correctas.
- Playwright: **63 pruebas aprobadas**.
- Las seis rutas se comprobaron a 360/375/390/430/768/1024/1440, sin desbordes horizontales detectados.
- Menú abierto en 360×640, 390 y 1440: redes después del último enlace, iconos horizontales, áreas táctiles, acceso por scroll, foco, Escape y animación de cierre.
- Axe sobre páginas en estado final y menú con stagger finalizado: sin infracciones detectadas en los criterios A/AA evaluados.
- Forward/back/forward, navegaciones repetidas, fallback sin API, listeners sin efectos duplicados, entrada de h1 en las seis rutas, una sola reproducción y reduced motion.
- Análisis estático: 168 enlaces internos/anclas y 36 referencias a recursos.
- Capturas antes/después en `qa-artifacts/antes-fase4-2/` y `qa-artifacts/fase4-2/`. Menú revisado a 390×844 y 1440×900; footer con iconos revisado en ambos.

No se ejecutó Lighthouse ni se probó un iPhone/Safari físico. Las fotografías reales, el pin del mapa y las aprobaciones institucionales/jurídicas siguen pendientes como en Fase 4.

Los cambios permanecen locales. No se hizo push ni deploy en esta fase.
