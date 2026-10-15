# GEO / buscadores con IA

Fecha de consulta: **15/10/2026**. Diagnóstico: el sitio contiene información local interpretable; su problema principal para descubrimiento es el estado de revisión y la falta de algunos datos prácticos, no la ausencia de un formato especial para IA.

Fuentes primarias: [funciones de IA en Google Search](https://developers.google.com/search/docs/appearance/ai-features), [guía oficial de optimización](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [informe generativo en Search Console](https://support.google.com/webmasters/answer/16984139). La síntesis de ambas guías se limita a sus recomendaciones aplicables: HTML útil, SEO básico, datos coherentes, contenido original y accesibilidad; no asegura inclusión, citas ni primeras posiciones.

## Preguntas y respuestas actuales

| Pregunta | ¿Se responde? | Evidencia / oportunidad |
|---|---|---|
| ¿Qué es CCVS? | Sí, pero definición institucional más clara debajo de la portada | `site.ts:127`, `nosotros.astro:14`; añadir “congregación local de Comunidad Cristiana” temprano |
| ¿Dónde queda? | Sí, dirección en HTML | `site.ts:47`, Visitarnos/footer. Falta guía de llegada/pin |
| ¿A qué comunidad pertenece? | Sí | `nosotros.astro:14`; no afirmar estructura jurídica adicional |
| ¿Qué cree? | Sí | Cinco creencias y orientación, acordeón con contenido en HTML; aprobación pastoral pendiente |
| ¿Cuándo se reúne? | Sí | `schedule.ts:3–6`; cuatro horarios claros |
| ¿Tiene jóvenes? | Sí | `ministerios/#jovenes`, sábado 21:00; enlazar Instagram allí |
| ¿Qué actividades realiza? | Sí | Datos `ministries.ts`; falta modalidad/participación real en varias |
| ¿Cómo visitarla? | Parcialmente | Dirección y hora sí; Maps/logística/contacto directo pendientes |
| ¿Cómo conocer su historia? | Sí | Historia con ancla; revisar cronología/afirmación de autonomía |
| ¿Cuáles son sus redes? | Sí | Menú, footer y Links; Instagram está rotulado como juvenil |

No se interrogó a múltiples asistentes para atribuir una tasa de citas; no se midió visibilidad de marca en ChatGPT/Gemini/Perplexity. Un resultado generado en una sesión tampoco sería garantía estable.

## Qué está documentado y qué es hipótesis

**Documentado por Google:** se mantienen los fundamentos SEO; las páginas deben poder ser indexadas y mostradas con fragmentos; la información importante debe existir como texto y el marcado debe coincidir con ella. No existen garantías de inclusión. Los enlaces internos y contenido útil ayudan al descubrimiento y comprensión.

**Inferencia aplicable a CCVS:** una definición de identidad directa y reunir horario/dirección/visita reduce ambigüedad tanto para personas como para sistemas. Mejorar esa claridad es valioso aunque no produzca un cambio observable en citas de IA.

**Hipótesis no demostrada:** que un schema adicional, una cantidad fija de palabras, una fecha nueva o una FAQ aumente porcentualmente las citas. No se usan porcentajes de estudios generales como pronóstico para esta congregación. No crear estadísticas, biografías, citas o menciones externas para simular autoridad.

## llms.txt y rastreadores

La guía oficial de Google indica que **no utiliza llms.txt para mejorar visibilidad o ranking** y no requiere archivos de texto/Markdown especiales. En este sitio de seis páginas, mantener un duplicado de la información introduce riesgo de horarios desactualizados sin beneficio demostrado. **No implementarlo.** Solo reconsiderar si un consumidor concreto y verificable lo necesita.

No equiparar bots de entrenamiento con bots de búsqueda/recuperación. Esta auditoría no recomienda desbloquear indiscriminadamente cualquier user-agent ni copia reglas genéricas para GPTBot/Google-Extended. Primero definir política institucional y revisar documentación de cada proveedor si surge una necesidad. El bloqueo general actual corresponde a revisión; no se cambia aquí.

## Tres mejoras prioritarias

1. **Identidad consistente:** párrafo breve en Nosotros/Inicio que una nombre, pertenencia y localidad; fuente única de dirección/horarios/redes. Ya existe Church básico: extenderlo con prudencia, no multiplicar entidades.
2. **Responder la primera visita:** FAQ corta con duración/acceso/niños/accesibilidad/contacto únicamente tras confirmar respuestas. Formato visible semántico; no hace falta marcar FAQ para que sea útil.
3. **Originalidad local:** historia ratificada, actividades vigentes, fotos autorizadas y canales contextuales. Usar anclas existentes; no producir artículos bíblicos genéricos o páginas por ciudades ajenas.

## Oportunidades de contenido

| Oportunidad | Dónde encaja | Información necesaria | Prioridad |
|---|---|---|---|
| Qué esperar en una reunión | Visitarnos, 4–6 respuestas cortas | Duración, recepción, niños y acceso reales | P1–P2 |
| Nuestra historia | Mejorar cronología existente | Donación, construcción y significado de 2015 | P1 |
| Qué creemos | Acordeón existente | Aprobación pastoral, sin reescritura doctrinal automática | P1 editorial |
| Reuniones y horarios | Mantener tabla actual | Responsable y excepciones | P1 mantenimiento |
| Jóvenes | Ancla existente, no nueva ruta obligatoria | Participación real y vínculo Instagram confirmado | P2 |
| Servicio comunitario | Bloque de Ministerios | Actividades vigentes, modalidad y canal | P2 |

## Medición futura

Revisar Search Console después de dominio/indexación autorizados: cobertura, consultas locales y páginas de entrada. La documentación oficial consultada **ya describe un informe de rendimiento generativo**; puede no mostrarse con impresiones insuficientes. No se accedió a una propiedad CCVS ni se confirma disponibilidad de datos para ella. Esto corrige la idea antigua de que Search Console nunca ofrece información específica de funciones generativas.

Si más adelante se registran referencias desde asistentes, usar datos agregados, sin rastrear personas ni formular promesas de atribución completa. Una visita desde una IA, una impresión en Search y una consulta pastoral son hechos distintos. La prioridad actual es que la persona pueda entender y visitar la iglesia.
