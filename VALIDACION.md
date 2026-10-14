# Validación V3 — 14 de octubre de 2026

## Probado

- Node.js 24.15.0, npm 11.12.1, Astro 7.3.8.
- `npm run check`: cero errores, advertencias y hints.
- `npm run build`: cinco páginas estáticas; seis derivados WebP de logos.
- `npm run verify:static`: cinco rutas, 134 enlaces/anclas y 20 referencias a recursos. Datos estructurados, metadatos, horarios, identidad madre, ancla creencias y orden del terreno conforme a V3.
- `npm run test:e2e`: **40 pruebas pasaron**, con Chromium y un worker sobre preview de producción. Incluyen cinco rutas a 360, 375, 390, 430, 768, 1024 y 1440 px; sin overflow horizontal ni errores JavaScript detectados.
- Axe sobre cinco rutas a 390/1440: sin infracciones reportadas en reglas WCAG 2 A/AA y 2.1 AA ejecutadas. No equivale a certificación de accesibilidad.
- Menú a 390/1440: abrir, Tab/Shift+Tab, Escape, foco al cierre, bloqueo/restauración del scroll y navegación al fragmento creencias.
- Acordeón con Enter/Space y coherencia entre aria-expanded y panel.
- Navegación y doctrina disponibles con JavaScript desactivado; orden de portada Nosotros en mobile y reducción de movimiento.
- `npm audit`: cero vulnerabilidades reportadas.
- Capturas reales 390×844 y 1440×900 de todas las rutas, completas y viewport, menú y doctrina. Revisión visual y dos pasadas de ajustes en Inicio/Nosotros. Ver COMPARACION_VISUAL.md.
- Material ajeno ausente de la salida web; referencias, videos y capturas de QA excluidos de Git.
- Prototipo con noindex/robots Disallow; URLs canónicas y sitemap dependen de dominio confirmado.
- Prueba aislada con un dominio reservado de test: sitemap XML válido con cinco rutas y canonical de Nosotros. Se restauró el entorno y se recompiló sin dominio de prueba.

## Problemas encontrados y corregidos

La primera prueba detectó contraste bajo del texto grande del footer y una restauración diferida del scroll al cerrar el menú. Se cambió el texto a bordó y se hizo el desbloqueo sincrónico e idempotente al cerrar, incluso con Escape. La suite completa pasó después de esas correcciones.

Se corrigieron ancho del título desktop, rótulo Nosotros, proporción de su imagen, escala serif y alto del hero mobile. Las observaciones y límites están registrados en COMPARACION_VISUAL.md.

## No probado / límites

- Fotografías, recortes y legibilidad sobre imágenes finales: no se recibieron fotos propias.
- Safari, Firefox, teléfonos físicos, zoom 200% y lector de pantalla.
- Métricas Lighthouse/Core Web Vitals: no se ejecutaron ni se atribuyen puntuaciones.
- Igualdad píxel a píxel: contenido, fuentes y fotos difieren; la comparación fue visual y geométrica, sin porcentaje de similitud.
- Timing exacto del menú de referencia: no observado en los fotogramas usados.
- Hosting, DNS o headers en producción: no hubo push ni deploy.
- Aprobación institucional del contenido: pendiente.

## Respaldo

Rama backup/antes-v3-20261014 y copia D:\CCVS-respaldos\antes-v3-con-pack-completo con 65 archivos, manifest SHA-256 y bundle Git verificado. La versión anterior se conserva en el historial Git; después de la reconstrucción el usuario autorizó commit y push de V3 a main, sin despliegue.

## Fase 4 — validación posterior

La V3 se conserva en backup/antes-fase4-20261014. Detalle vigente en FASE_4_RESULTADO.md.

- Astro check y build correctos; seis páginas estáticas.
- 52 pruebas aprobadas: rutas en siete anchos, navegación forward/back/forward, navegación repetida, fallback sin API, motion y teclado.
- Axe sobre las seis rutas a 390/1440, en estado final con reduced motion: sin infracciones reportadas en reglas A/AA evaluadas. El motion se verifica por separado.
- Análisis estático: 168 enlaces/anclas y 30 referencias a recursos.
- Código de los módulos inferiores de Inicio idéntico al commit V3.
- Capturas antes/después y por bloque en qa-artifacts/antes-fase4 y qa-artifacts/fase4.
- Instagram, Facebook y YouTube respondieron HTTP 200. El nombre de destino de Google coincide, pero la ficha/pin no se pudo validar por un bloqueo antirobot; Maps queda pendiente.
- No se agregaron dependencias, trackers, formularios ni datos institucionales ficticios.
- Términos es un borrador; fotos propias, revisión jurídica/institucional e iPhone físico siguen pendientes.
- Correcciones durante QA: inicialización del menú en carga completa sin API, manejo de cancelación normal de ViewTransition.ready y auditoría sobre el estado final en vez de fotogramas intermedios.
