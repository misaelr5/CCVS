# Auditoría integral de textos — CCVS

Revisión editorial local del 14 de octubre de 2026. Alcance: las seis rutas Astro, `src/data/`, header, menú, footer, tarjetas, collages, CTA, metadatos y textos alternativos. La vista móvil y la de escritorio comparten el mismo contenido. No hay testimonios, preguntas frecuentes ni formularios en el proyecto actual.

## Criterio y fuentes

Los datos de la congregación proceden de `BRIEF_IGLESIA.md`: identidad, creencias informadas, historia, actividades, dirección y horarios. El pedido de esta auditoría aporta el enfoque cristocéntrico y de discipulado; no se presenta como una misión o declaración doctrinal oficial. Los pasajes se cotejaron en **Reina-Valera 1960 (RVR1960)**. Las frases publicadas en la web son redacciones originales inspiradas en esos textos; ninguna se presenta entre comillas como cita bíblica literal. Los títulos y la interpretación editorial requieren aprobación pastoral antes de considerarse voz institucional definitiva.

Referencias verificadas: [Juan 14:6](https://www.biblegateway.com/passage/?search=Juan+14%3A6&version=RVR1960), [Hechos 2:42–47](https://www.biblegateway.com/passage/?search=Hechos+2%3A42-47&version=RVR1960), [Colosenses 1:16–18](https://www.biblegateway.com/passage/?search=Colosenses+1%3A16-18&version=RVR1960), [Colosenses 3:16](https://www.biblegateway.com/passage/?search=Colosenses+3%3A16&version=RVR1960), [Efesios 2:19–22](https://www.biblegateway.com/passage/?search=Efesios+2%3A19-22&version=RVR1960), [Mateo 28:19–20](https://www.biblegateway.com/passage/?search=Mateo+28%3A19-20&version=RVR1960) y [Mateo 6:33](https://www.biblegateway.com/passage/?search=Mateo+6%3A33&version=RVR1960). No se citaron ni se atribuyeron enseñanzas específicas a *Puerta, Camino y Meta* porque no se dispone de una edición verificable.

## Inventario y diagnóstico

Escala: **alta/media/baja** indica calidad editorial, relevancia bíblica y claridad; **confirmada/editorial/pendiente** indica el respaldo doctrinal o institucional; **alta/media/baja** en repetición y prioridad indica cuánto se repite o urge revisar.

| Ruta y fuente visible | Calidad | Biblia | Claridad | Respaldo | Repetición | Prioridad | Diagnóstico |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Global · `SiteHeader.astro`, `links.ts` | Alta | Baja | Alta | Confirmada | Baja | Baja | Navegación funcional; conserva nombres y destinos. |
| Inicio · `EditorialHero.astro`, `site.ts` | Media | Media | Media | Editorial | Alta | Alta | “Comunidad/fe/Jesús” nombraba temas, pero explicaba poco sobre Cristo. |
| Inicio · controles de `HeroVideo.astro` | Alta | No aplica | Alta | Funcional | Baja | Baja | “Activar sonido” y “Reproducir video” describen acciones; se conservan. |
| Inicio · collage de bienvenida | Baja | Baja | Media | Editorial | Alta | Alta | “Vida”, “fe” y “comunidad” se repetían sin describir enseñanza, oración o comunión. |
| Inicio · reunión principal y horarios | Alta | Baja | Alta | Confirmada | Media | Media | Horarios útiles; CTA y título podían invitar con más precisión. |
| Inicio · banner fotográfico | Baja | Baja | Media | Editorial | Alta | Alta | “Compartimos la vida” era intercambiable con cualquier organización. |
| Inicio · historia y servicio | Media | Media | Alta | Confirmada | Media | Media | Hechos locales sólidos; títulos poco específicos. |
| Inicio · tarjetas de niños y jóvenes | Alta | Baja | Alta | Confirmada | Baja | Baja | Nombres y horarios claros; el marco editorial requería más intención. |
| Inicio · invitación final | Media | Baja | Alta | Editorial | Media | Media | Invitaba a visitar, sin explicar para qué se reúne la iglesia. |
| Nosotros · `AboutCover.astro` | Media | Media | Media | Editorial | Alta | Alta | Repetía “una comunidad/una fe/una vida”; se reforzó el papel de Jesús y la Palabra. |
| Nosotros · historia | Alta | Media | Alta | Confirmada | Media | Media | Cronología respaldada; algunos títulos eran intercambiables. |
| Nosotros · `BeliefsAccordion.astro`, `beliefs.ts` | Alta | Alta | Alta | Confirmada en brief, pendiente de aprobación pastoral | Baja | Baja | Las cinco creencias informadas se conservan sin ampliar doctrina. |
| Nosotros · identidad local | Media | Baja | Alta | Confirmada/editorial | Media | Media | El texto anterior explicaba logos y no la fe vivida por la congregación. |
| Ministerios · `ministerios.astro`, `MinistryFeature.astro`, `ministries.ts` | Media | Media | Media | Confirmada/editorial | Alta | Alta | Kicker repetido en cada bloque y títulos “compartir/crecer/vida” poco concretos. |
| Visitarnos · `visitanos.astro`, `schedule.ts` | Alta | Baja | Alta | Confirmada/editorial | Media | Media | Se conservaron los datos; se explicó con más calidez la primera visita. |
| Links · `links.astro`, `links.ts` | Alta | Baja | Alta | Confirmada/editorial | Media | Media | Destinos funcionales; introducción demasiado genérica. |
| Footer · `SiteFooter.astro` | Alta | Baja | Alta | Confirmada/editorial | Media | Media | Identidad y contacto claros; CTA podía nombrar la reunión. |
| Legal · `terminos-y-condiciones.astro`, `legal.ts` | Alta para su función | No aplica | Alta | Pendiente de revisión jurídica | Baja | Baja | Se mantiene su tono informativo; requiere revisión institucional y jurídica. |
| Metadatos · `BaseLayout.astro` y descripciones de rutas | Media | Baja | Alta | Confirmada/editorial | Media | Media | Se ajustaron títulos y descripciones de las rutas editoriales. |
| Alt de fotos · `site.ts`, `PhotoSection.astro` | Alta | No aplica | Alta | Fotos locales, permisos pendientes | Baja | Baja | Se conservaron descripciones de imágenes; no se añadieron afirmaciones doctrinales a las fotos. |

## Propuesta y decisión por texto

| Ubicación y archivo | Original | Problema | Propuesto / aplicado | Justificación editorial o bíblica | Referencia |
| --- | --- | --- | --- | --- | --- |
| Inicio, hero · `site.ts` | “Una comunidad. Una misma fe. Jesús en el centro.” | Tres lemas sin explicar la relación con Jesús. | “Jesucristo, el camino al Padre.” | Presenta a Cristo antes que a la marca; paráfrasis, no cita literal. | Juan 14:6 |
| Inicio, intro hero · `site.ts` | “Nos reunimos para compartir la fe, crecer espiritualmente y servir…” | Lista abstracta. | “Jesús nos llama a seguirlo. … aprender su Palabra, orar y acompañarnos en la fe.” | Nombra prácticas y ofrece una invitación comprensible. | Juan 14:6; Hechos 2:42 |
| Inicio, CTA hero · `EditorialHero.astro` | “Conocenos” → `/nosotros/` | Destino amplio para un llamado sobre Jesús. | “Conocé nuestra fe” → `/nosotros/#creencias` | Promesa y destino coinciden. | — |
| Inicio, video · `HeroVideo.astro` | Controles de sonido y reproducción. | Son etiquetas de accesibilidad funcionales, no mensajes editoriales. | Sin modificación. | Mantienen clara la acción disponible. | — |
| Inicio, collage · `index.astro` | “La fe se vive en comunidad.” | Genérico y repetido. | “En Cristo, crecemos juntos.” | Sitúa el crecimiento en Cristo. | Hechos 2:42; Efesios 2:19–22 |
| Inicio, collage serif · `index.astro` | “Crecer en la fe. Compartir la vida.” | Repite conceptos sin acciones. | “Aprender su Palabra. Caminar en la fe.” | Relaciona comunidad con enseñanza bíblica. | Hechos 2:42 |
| Inicio, collage párrafo · `index.astro` | “Pertenecemos a Comunidad Cristiana…” | Empieza por la institución y usa verbos generales. | “Desde 2005… comparte el evangelio… nos reunimos para orar…” | Conserva el dato histórico y especifica la actividad. | Hechos 2:42 como inspiración |
| Inicio, CTA collage · `index.astro` | “Conocé nuestra iglesia” | Impreciso. | “Conocé nuestra historia y fe” | Describe el contenido de `/nosotros/`. | — |
| Inicio, reunión · `index.astro` | “NOS ENCONTRAMOS” | No explica la finalidad. | “ADORACIÓN Y COMUNIÓN” | Conecta la reunión con prácticas declaradas en el brief. | Hechos 2:42–47 |
| Inicio, CTA reunión · `index.astro` | “Planeá tu visita” | Suena a producto turístico. | “Sumate a la reunión” | Invitación directa y natural. | — |
| Inicio, banner · `index.astro` | “Compartimos la vida.” | Frase intercambiable con cualquier marca. | “Cristo, cabeza de la iglesia · Colosenses 1:18” | La foto congregacional se lee a la luz de la centralidad de Cristo. | Colosenses 1:18 |
| Inicio, agenda · `index.astro` | “Nos encontramos.” | Repite el tema de reunión. | “Reuniones para orar y crecer en la fe.” | Explica el contenido de la sección sin cambiar horarios. | — |
| Inicio, historia · `index.astro` | “Nuestra comunidad.” | Título genérico. | “Una historia de oración y fe.” | Anticipa el hecho de 2005 y el destino de la CTA. | — |
| Inicio, tarjetas · `index.astro` | “Compartir la fe. En cada encuentro.” | Abstracción repetida. | “La fe se comparte. De una generación a otra.” | Presenta las tarjetas de niños y jóvenes como actividades para distintas edades. | — |
| Inicio, servicio · `index.astro` | “Servir cerca.” | Ambiguo. | “Fe que se hace servicio.” | Une evangelio y actividades sociales confirmadas. | — |
| Inicio, invitación · `index.astro` | “Villa Sarmiento. Te esperamos.” | La finalidad de la visita queda implícita. | “Nos reunimos para adorar a Dios. Hay lugar para vos.” | Invitación pastoral sin urgencia artificial. | — |
| Nosotros, portada · `site.ts` | “Una comunidad. Una fe en Jesucristo. Una vida para servir.” | Tres fórmulas paralelas y repetidas. | “Jesús nos reúne. Su Palabra nos guía. Su amor nos mueve a servir.” | Secuencia fe, Escrituras y servicio; propuesta editorial pendiente de aprobación. | Efesios 2:19–22 como inspiración |
| Nosotros, intro · `site.ts` | “Una congregación que busca compartir el evangelio…” | Poco concreta y similar al hero. | “Creemos en Jesucristo y buscamos crecer en el conocimiento de las Escrituras, la oración y el servicio…” | Articula la vida congregacional con prácticas informadas. | — |
| Nosotros, historia · `nosotros.astro`, `history.ts` | “La fe nos reunió. La historia continúa.” | Repite fe e historia sin hechos. | “La oración nos reunió. El evangelio nos sigue convocando.” | Une el inicio documentado con la actividad actual. | — |
| Nosotros, identidad · `nosotros.astro` | Párrafo centrado en emblemas. | Describe la marca, no la fe. | “Nos reunimos para seguir a Jesucristo, aprender su Palabra y servir…” | Los logos quedan visibles mientras el texto habla de la congregación. | — |
| Nosotros, creencias · `beliefs.ts` | Cinco creencias y orientación doctrinal informada. | Requieren aval pastoral, pero no muestran el problema de copy genérico. | Sin modificación. | No corresponde ampliar o reformular doctrina sin aprobación. | Pendiente pastoral |
| Ministerios, hero · `ministerios.astro` | “Compartir la fe. Servir a los demás.” | Amplio y repetido. | “Crecer en Cristo. Servir al prójimo.” | Presenta discipulado y servicio como ejes. | Mateo 28:19–20 como inspiración |
| Ministerios, intro · `ministerios.astro` | “Espacios para crecer espiritualmente, encontrarnos…” | Léxico de landing genérica. | “Compartimos la fe mediante la oración, el estudio de la Biblia y el servicio…” | Usa actividades respaldadas por el brief. | Mateo 28:19–20 |
| Ministerios, kicker · `MinistryFeature.astro` | “Actividades de la comunidad” en cinco bloques. | Repetición que no aporta contexto. | Se elimina el kicker repetido. | Cada H2 identifica su actividad. | — |
| Ministerios, niños/jóvenes · `ministries.ts` | Introductores casi tautológicos. | Repetían el título. | Se describen acompañamiento y crecimiento en la fe. | Distingue a los grupos sin inventar horarios ni programas. | — |
| Ministerios, vida de fe · `ministries.ts` | “Crecer en la fe.” | Título genérico. | “Oración y Palabra.” | Nombra las actividades del bloque. | Colosenses 3:16 como marco, sin cita en página |
| Ministerios, servicio · `ministries.ts` | “Servir a nuestra comunidad.” | Repite lenguaje institucional. | “Servir al prójimo.” | Expresión concreta de ayuda y evangelismo. | — |
| Ministerios, encuentros · `ministries.ts` | “Compartir la vida.” | Frase vaga. | “Caminar juntos en la fe.” | Se relaciona con encuentros para matrimonios, varones y mujeres. | — |
| Ministerios, CTA de bloques · `MinistryFeature.astro` | “Horarios y visita” para todos. | Los bloques sin horario confirmado parecían prometer uno. | “Ver horarios y visita” si hay horario; “Cómo visitarnos” si no. | Mantiene destinos honestos. | — |
| Visitarnos, portada · `visitanos.astro` | “Nos encontramos. En Villa Sarmiento.” | Localiza, pero no explica el sentido de la reunión. | “Nos reunimos. Para buscar a Dios.” | Paráfrasis espiritual acompañada por fuente visible. | Mateo 6:33 |
| Visitarnos, primera visita · `visitanos.astro` | “Podés acercarte… consultar sobre las actividades…” | Tono administrativo. | “Podés venir… conocernos… consultar sobre los espacios para orar, estudiar la Biblia…” | Cercanía y expectativas concretas, sin inventar el programa del domingo. | — |
| Visitarnos, ubicación · `visitanos.astro` | “Acercate. Compartamos un encuentro.” | Dos imperativos vagos. | “Nos reunimos en Villa Sarmiento.” | Ubicación clara y útil. | — |
| Links, intro · `links.astro` | “Conocé nuestra comunidad, sus encuentros y actividades.” | Repite navegación. | “Queremos compartir con vos nuestra fe en Jesucristo. Elegí por dónde empezar.” | Conecta el índice con la invitación del sitio. | — |
| Footer, CTA · `SiteFooter.astro` | “Planeá tu visita” | Lenguaje turístico. | “Vení a una reunión” | Llamado directo al destino `/visitanos/`. | — |
| Header/menú/links y horarios · `SiteHeader.astro`, `links.ts`, `schedule.ts` | Etiquetas y datos concretos. | No requieren reescritura espiritual. | Sin modificación. | La navegación debe seguir siendo clara; horarios no se alteran. | — |
| Borrador legal · `legal.ts` | Texto informativo y aviso de revisión. | No es copy evangelístico. | Sin modificación. | Una revisión editorial no reemplaza la jurídica. | Pendiente jurídico |

## Pendientes de validación

1. **Aprobación pastoral:** confirmar que el encuadre de discipulado, las paráfrasis y la nueva voz editorial representan a esta congregación. Las cinco creencias de `beliefs.ts` continúan como resumen informado, no declaración doctrinal aprobada.
2. **Fuentes de Comunidad Cristiana:** revisar *Puerta, Camino y Meta* y cualquier declaración oficial cuando se faciliten las ediciones. No se incorporó ninguna cita ni doctrina atribuida a esos textos.
3. **Publicación institucional:** el sitio continúa con `noindex, nofollow` y `site.publicationApproved = false`. Deben aprobarse el contenido, las fotografías, los permisos y el borrador legal antes de levantar esa restricción.

No se cambió la identidad visual, los horarios, las actividades ni los enlaces externos. El CTA principal ahora lleva directamente a la sección de creencias dentro de «Nosotros»; el resto de la navegación conserva sus destinos. Las referencias bíblicas son enlaces para revisión; el sitio no publica texto bíblico literal de una edición protegida.
