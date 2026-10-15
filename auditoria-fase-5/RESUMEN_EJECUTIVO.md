# CCVS — Resumen ejecutivo de Fase 5

**15/10/2026 · Diagnóstico provisional: 72/100 (banda 68–78).** La web tiene una base visual y técnica sólida. El avance recomendado es completar información, lectura y descubrimiento; **conservar el sitio aprobado**. La nota mide preparación institucional y no es Lighthouse ni certificación WCAG.

## Cinco fortalezas

1. Identidad coherente: logo madre, CCVS secundario, bordó y Archivo/Bodoni.
2. Astro estático con HTML útil, datos tipados y JavaScript pequeño: ~9 kB gzip en los dos bundles.
3. Fotografías reales, horarios claros y seis rutas funcionales.
4. Menú, teclado, acordeón, fallback y reduced motion probados.
5. Buena base de QA: **78 pruebas aprobadas**, 42 combinaciones ruta/ancho sin overflow; doce análisis axe sin infracciones automáticas reportadas.

## Diez problemas de mayor importancia

1. **Llegada incompleta:** Maps sigue deshabilitado; falta confirmar pin/ficha pública.
2. **Hero móvil pesado:** video de 8,44 MB; LCP local mediano **3,06 s**, superior al objetivo orientativo de 2,5 s.
3. **Legibilidad:** el título de historia en Nosotros cruza una zona oscura de la foto a 1440.
4. **Descubrimiento bloqueado:** noindex y robots son deliberados para revisión; deben coordinarse al lanzamiento aprobado.
5. **URL institucional pendiente:** sin dominio aprobado/canonical/sitemap en la versión medida.
6. **Contenido sin aprobación final:** legales, copy/doctrina y permisos de medios necesitan validación.
7. **Historia demasiado específica:** ratificar donación/construcción y afirmación de autonomía en 2015.
8. **Visita móvil poco inmediata:** CTA del header oculto; primer viewport no ofrece horario.
9. **Primera visita genérica:** falta logística confirmada; Jóvenes tampoco tiene Instagram junto a su bloque.
10. **Identidad al compartir incompleta:** faltan favicon e imagen OG autorizados.

No se detectó P0 confirmado. Los bloqueos de lanzamiento no autorizan cambiar el estado de revisión durante esta auditoría.

## Cinco mejoras de mayor impacto

1. Confirmar ubicación y completar **horario + dirección + cómo llegar**.
2. Resolver el cruce de texto/foto y facilitar acceso de visita en móvil.
3. Ajustar estrategia de video y volver a medir conservando poster/controles.
4. Aprobar datos/textos/medios y preparar dominio, canonical, sitemap e indexación coordinada.
5. Añadir FAQ breve real y enlaces contextuales a las redes.

## SEO local y GEO

**Tres oportunidades SEO local:** nombre/localidad consistentes para evitar homónimos; pin/ficha verificables con dirección y reuniones correctas; página de visita que responda búsquedas prácticas. No hay datos de volumen ni posiciones que permitan prometer tráfico. No afirmar sede en Villa Dolores o cobertura de toda Traslasierra.

**Tres oportunidades GEO:** definición institucional directa; respuestas prácticas aprobadas; historia/actividades originales y actuales con enlaces claros. **Ya existe Church en JSON-LD.** La ampliación conservadora pasó Schema.org Validator sin errores/advertencias; detalle y límite de Google en el informe SEO. `llms.txt` no es prioridad ni requisito para Google ([guía oficial](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## Benchmark y qué conservar

[Benchmark completo](03_BENCHMARK_IGLESIAS.md): Passion City, VOUS, Belonging, Elevation, TOMATULUGAR, Rey de Reyes, Catedral de la Fe y referencias cordobesas CCF/La Misión/Cita con la Vida. Cita tuvo un límite SSL y no se evaluó visualmente. No se atribuyen rankings ni métricas externas no medidas.

**Passion** confirma el valor de la composición ya adoptada; **VOUS, Rey y La Misión** aportan recorridos de visita; **Belonging/Elevation**, preguntas prácticas. Algunas referencias introducen popups, banners o navegación mucho más extensa: no conviene trasladar esa complejidad a CCVS.

Conservar paleta, fuentes, jerarquía de logos, fotografías autorizadas, componentes Astro, menú en tarjeta sin fades, footer, horarios centralizados, contenido sin JS y retroceso desde arriba solicitado. No añadir CMS/backend o más animaciones por cantidad.

## Orden de implementación y datos necesarios

**A:** lectura, visita móvil, precisión histórica y piloto de video. **B:** pin/identidad/dominio/schema/SEO local. **C:** Links, redes contextuales y ritmo editorial. **D:** revisión institucional/legal, QA completo y preparación de publicación. [Matriz de 24 hallazgos y criterios de aceptación](08_ROADMAP_PRIORIZADO.md).

Faltan: pin/ficha validada, contacto autorizado si se desea, cronología ratificada, información de primera visita, permisos/aprobaciones y dominio oficial. Pendientes técnicos: Safari/teléfono/lector de pantalla, revisión manual WCAG y métricas de campo. **INP real no medido; Lighthouse no disponible localmente.** Search Console primero; analítica de clics solo después de elegir herramienta y revisar privacidad. No se instaló seguimiento.

**Siguiente fase propuesta:** aprobar un lote acotado de Fase A y reunir los datos de ubicación. La auditoría termina aquí, sin ejecutar el roadmap, push ni deploy.

## Alcance y estado de la evidencia

Build, pruebas y capturas principales corresponden a la base inicial `7395d42`. Durante la auditoría aparecieron ediciones concurrentes ajenas a este trabajo: “Ministerios” pasó a “Reuniones”, junto con textos relacionados y README; la URL `/ministerios/` permanece. Las etiquetas se revalidaron en siete anchos sin overflow. Después se incorporó una foto de Oración y Palabra, fuera de ese chequeo. Se preservaron todas esas ediciones y no se les atribuyen las 78 pruebas iniciales. Ver [nota de evidencia](evidencia/LEEME.md).

Solo se escribieron documentos y evidencias de auditoría desde este trabajo. No se modificaron archivos de producción ni se enviaron cambios al remoto.
