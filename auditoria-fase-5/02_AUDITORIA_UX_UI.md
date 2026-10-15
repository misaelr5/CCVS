# UX/UI, responsive y movimiento

Consulta y pruebas: **15/10/2026**. Se abrió la salida compilada en Chromium, no solamente el código. Las capturas nuevas reflejan HEAD `7395d42`. Capturas legibles con reduced motion y carga de imágenes diferidas forzada **solo en el navegador de QA**; movimiento probado aparte por E2E.

Después se detectaron cambios concurrentes de “Ministerios” a “Reuniones”. Se conservaron y verificaron aparte; ver `evidencia/cierre.json` y capturas `reuniones-cierre-*`. El análisis siguiente identifica las rutas por su nombre al inicio para corresponder con las capturas principales.

## Cobertura visual

Se generaron capturas completas de las seis rutas a **360×800, 390×844, 430×932, 768×1024 y 1440×900**, más 12 capturas de primer viewport a 390/1440 y menú en siete anchos. Se verificó geometría también a **375 y 1024**. Cero desbordamientos en las 42 combinaciones. Ver [capturas](evidencia/capturas/) y [mediciones DOM](evidencia/rutas.json).

La revisión editorial se apoya especialmente en las capturas completas 390/1440; el barrido de los otros tamaños detecta recortes y cambios de composición. No se probó dispositivo físico ni Safari. No se declara que las imágenes tengan aprobaciones de uso por haberlas visto renderizadas.

## Análisis por página

| Página | Conservar | Problema/oportunidad observable | Propuesta puntual |
|---|---|---|---|
| Inicio | Logo madre, bordó, contraste sans/serif, fotografías reales, collage y horarios grandes | Primer viewport móvil prioriza credo y video; horario/dirección no aparecen allí. Reunión principal se presenta en dos secciones y vuelve en lista. Portada completa desktop mide ~6948 px de alto | Añadir una línea práctica/CTA de visita al hero o al header móvil; reducir repetición informativa antes de recortar secciones aprobadas |
| Nosotros | Portada editorial, cronología y acordeón de cinco creencias | A 1440, título de historia invade imagen de cruz: letras negras sobre ropa/sombra pierden lectura. Pertenencia a Comunidad Cristiana aparece tarde | Ajustar solo solapamiento/contraste del título de historia; llevar una frase institucional al intro si se aprueba |
| Ministerios | Anclas internas, horarios junto a niños/jóvenes, composición coherente | Galería de tres fotos juveniles alarga mucho ese bloque; no hay Instagram contextual allí. Varios textos describen poco qué ocurre o cómo participar | Un enlace juvenil directo y una frase real por actividad. Evaluar reducir altura/agrupación de galería sin rehacer diseño |
| Visitarnos | Domingo y dirección visibles temprano; cuatro horarios claros | Falta destino Maps; reserva grande explica un pendiente interno. “Tu primera visita” no responde logística concreta | Verificar pin antes de habilitar botón; sustituir reserva por orientación real aprobada; FAQ breve basada en datos |
| Links | Botones amplios, destinos explícitos, identidad correcta; no carga video | Intro/logo/flecha ocupan bastante espacio: primeros botones empiezan cerca de y=433 a 390 px, redes inferiores requieren scroll. No hay acceso explícito a Inicio en este hub | Compactar verticalmente encabezado; añadir “Volver al sitio” discreto si hace falta. Mantener prioridad visita/horarios |
| Términos | Aviso de borrador evidente, lectura estructurada | Página sirve un documento deliberadamente incompleto. Flecha decorativa tiene poco valor aquí | Aprobar identificación/contacto/privacidad antes de publicación definitiva. No convertir el borrador en texto legal supuesto |

Evidencia de código: `EditorialHero.astro:6`, `global.css:155` (CTA móvil oculto), `global.css:562` (solapamiento historia), `MinistryFeature.astro:11–18`, `visitanos.astro:9–11`, `links.astro:11`, `legal.ts:5–13`.

## Recorridos

| Persona / tarea | Recorrido actual | Fricción | Prioridad |
|---|---|---|---|
| Nuevo visitante: horario + llegar | Desktop: Visitarnos, 1 clic. Móvil: abrir menú + Visitarnos, 2 acciones, o scroll hasta CTA de Inicio | Se obtiene horario/dirección pero no instrucciones Maps | P1 |
| Joven: actividad + Instagram | Menú > Ministerios > ancla Jóvenes; luego menú/footer/redes o Links | Horario sí está junto al grupo; Instagram está separado. Desde menú son dos acciones para abrir página y otra para ancla | P2 |
| Miembro: horarios/ministerios | Menú tiene accesos directos; Inicio también lista cuatro horarios | Header no fijo: al bajar mucho, volver al menú requiere subir. Footer ofrece alternativa | P2, no obliga a header sticky |
| Desde Instagram a Links | Visita u Horarios: 1 clic; Instagram/Facebook/YouTube: 1 clic tras scroll | El espacio superior retrasa destinos; enlace a ubicación ausente | P2/P1 Maps |
| Celular con red limitada | Contenido existe en HTML; enlaces no están deshabilitados esperando animación | Video comienza automáticamente con movimiento normal; red/CPU compiten con primera carga | P1 performance |

Los clics describen los enlaces reales y el menú, no un estudio con participantes. Falta comprobar tareas con personas nuevas de la comunidad.

## Animaciones: evaluación

El sistema es coherente y usa herramientas nativas. No encontré navegación bloqueada hasta terminar una animación. Sí hay duraciones acumuladas mayores a las que sugiere “menú de 400 ms”: panel 400 ms, enlaces desde 100 ms con incrementos de 60 ms, y redes al final. Con ocho enlaces, redes terminan alrededor de **880 ms** (`ui.ts:75–87`). Los títulos duran **950 ms**, otros elementos **680 ms + stagger**, con hasta doce elementos (`:131`, `:161`). Es una decisión editorial revisable, no una falla técnica automática.

| Clasificación | Movimiento | Decisión |
|---|---|---|
| Conservar | Menú en tarjeta, sin fade del panel, sin bloqueo de body | Es requisito aprobado; Escape, foco y scroll funcionan |
| Conservar | Transformación hamburguesa/X y feedback de botones | Consistentes y comprensibles |
| Conservar | Entradas de fotos/collage, una vez por visita a la página | Aportan jerarquía; contenido visible sin JS |
| Conservar | Reduced motion, pausa del video fuera de pantalla, cleanup por navegación | Correcta base progresiva |
| Optimizar | Redes al final de secuencia y entrada de Links | Acortar stagger para que destinos prácticos se lean antes; no animar todas las filas por obligación |
| Optimizar | Transición global 650 ms y títulos 950 ms | Probar secuencia total con usuarios móviles; no sumar más capas |
| Optimizar | Galería juvenil y marcas al scroll | Mantener solo donde acompañen información; evitar repetición equivalente en todas las secciones |
| Eliminar selectivamente | Flecha decorativa en legal; duplicación de movimiento sin función | P3, después de navegación y contenido |
| Nuevas | Ninguna necesaria | Solo feedback para un estado real futuro, sin añadir efectos como meta |

`BaseLayout:14–15` define transiciones forward/back de 650 ms; `ui.ts:169–181` lleva navegación sin hash al inicio por pedido vigente. **Conservar el retroceso arriba** aunque difiera de la restauración habitual del navegador; no reportarlo como bug. Los hashes conservan destino. Fallback sin View Transition API probado.

## Ciclo de vida

`cleanup()` aborta listeners y desconecta observer; video y scroll registran cancelación al mismo AbortSignal. La marca de body impide inicialización repetida (`ui.ts:20–27`); los módulos globales se ejecutan una vez. E2E cubre navegación repetida, apertura rápida y reinicio. **No hay evidencia de acumulación funcional de listeners**; no se realizó perfil de heap de larga duración ni una prueba de horas de navegación.

Footer: conservar color, marca CCVS de fondo, enlaces y prioridad del logo madre. No volver a la composición documentada en fases antiguas si el código actual la reemplazó. Las reservas de foto ya no son el problema general: actualmente hay material propio incorporado; revisar permisos y selección, no pedir todas las fotos de nuevo.
