# SEO técnico, local y datos estructurados

Consulta: **15/10/2026**. Fuentes técnicas: [Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [ranking local de Google](https://support.google.com/business/answer/7091), [Church](https://schema.org/Church), [logo](https://schema.org/logo), [sameAs](https://schema.org/sameAs). Código, HTML y DOM contrastados con [rutas.json](evidencia/rutas.json) y [publico.json](evidencia/publico.json).

## SEO técnico

| Verificación | Resultado actual | Tratamiento recomendado |
|---|---|---|
| HTML y enlaces | SSG real, contenido textual y enlaces `<a href>` presentes; sin JS se leen doctrina/horarios | Conservar arquitectura |
| Idioma/viewport | `lang="es-AR"`, viewport correcto | Conservar |
| Title | Seis títulos distintos y marca institucional añadida por layout | Revisar descriptividad de Ministerios/Visitarnos; no hay longitud mágica obligatoria |
| Description | Seis descriptions específicas de página | Conservar base y afinar localización/propósito sin repetición artificial |
| H1–H6 | Un H1 por ruta; secciones H2/H3. En Ministerios hay H2 de grupo y H2 de bloques | Jerarquía interpretable; posible mejora editorial, no bloqueo de indexación |
| Robots | Todas las páginas públicas `noindex, nofollow`; robots público `Disallow: /` | **Deliberado para revisión.** Requiere transición de lanzamiento coordinada, no retirar ahora |
| Canonical/og:url | Ausentes en build local y alias público, porque no hay SITE_URL configurado para estos resultados | Completar con dominio aprobado y verificar HTML del build final |
| Sitemap | Generador manual existe; no se generó y público responde 404 | Activarlo con SITE_URL; cinco rutas informativas. Legal puede excluirse deliberadamente |
| @astrojs/sitemap | No instalado | No es requisito: sitemap manual válido basta para este tamaño |
| OG | title, description, type, locale y site_name presentes | Falta `og:image` y URL estable |
| Twitter/X cards | No hay etiquetas específicas | Opcional cuando se apruebe una imagen social; prioridad menor que mapa/indexación |
| Favicon | No hay `<link rel=icon>` ni archivo dedicado observado | Preparar con logo autorizado; no sustituir header |
| URLs/errores | Seis rutas 200; ruta inventada 404; `/visitanos` acaba en `/visitanos/` | Personalizar 404 como mejora P2; probar cadena HTTP completa al lanzamiento |
| Legales | Borrador visible y enlazado | No indexar/promover como documento definitivo sin revisión |
| Recursos privados | Referencias fuera de imports de producción; verificación estática pasa | Mantener exclusiones; no incluir esta auditoría en el despliegue |

Evidencias: `BaseLayout.astro:11–21`, `site.ts:120`, `robots.txt.ts:3`, `[sitemap].xml.ts:3–8`, `astro.config.mjs:4–10`, `vercel.json:1–24`. No se encontraron páginas informativas vacías ni contenido principal dependiente de hidratación compleja. Con JS el acordeón colapsa la respuesta; sin JS permanece disponible. No es una ocultación accidental.

**Distinción importante:** bloquear rastreo no es lo mismo que impedir indexación. `noindex` necesita ser leído por el crawler; `Disallow` puede impedir esa lectura. Un prototipo público no se vuelve privado con robots. Al lanzamiento hay que permitir rastreo y quitar noindex en conjunto, manteniendo la protección que corresponda al entorno de revisión. No se evaluó Search Console ni se afirma estado de indexación de cada URL.

## Títulos propuestos, sin aplicar

El layout ya agrega `| Comunidad Cristiana Villa Sarmiento`. Evitar duplicar ese nombre en el título específico.

La columna actual refleja el build inicial auditado. Al cierre, una edición concurrente ya cambió el título de `/ministerios/` a **Reuniones**, con description de reuniones/espacios; se verificó en `evidencia/cierre.json`. No se propone revertir esa decisión de nomenclatura.

| Ruta | Parte específica actual | Parte sugerida |
|---|---|---|
| `/` | Jesucristo, el camino al Padre | Iglesia cristiana en Villa Sarmiento, Córdoba — sujeto a aprobación editorial |
| `/nosotros/` | Nuestra fe en Jesucristo | Nuestra historia y fe |
| `/ministerios/` | Oración, Palabra y servicio | Ministerios y actividades |
| `/visitanos/` | Vení a una reunión | Horarios y cómo llegar — cuando se complete el mapa |
| `/links/` | Enlaces de la congregación | Redes y enlaces |
| Legal | Términos y condiciones — borrador | Mantener borrador hasta aprobación |

Esto no obliga a cambiar H1 o identidad visual. Google puede construir otros title links/snippets; no se promete controlar exactamente el resultado.

## Investigación de presencia local

Consultas exploratorias: nombre completo, iglesia cristiana/evangélica en Villa Sarmiento Córdoba, horarios de culto, jóvenes cristianos, Maps y búsqueda del alias. Son una muestra no geolocalizada a una persona de la localidad, **sin volúmenes de búsqueda ni posición media**.

- Aparecen resultados de terceros con el nombre/dirección de CCVS. [Ejemplo de directorio](https://parroquiadelcarmenvcp.com.ar/iglesia/comunidad-cristiana-villa-sarmiento/). **Solo evidencia de presencia/confusión pública**, no fuente autorizada de horarios, reseñas o doctrina. Otro directorio la agrupa bajo [“horarios de misa”](https://sanfransolanobv.com.ar/misas/comunidad-cristiana-villa-sarmiento/), etiqueta que no corresponde trasladar a una congregación evangélica.
- Las consultas genéricas también devuelven Villa Sarmiento de Buenos Aires. La [Iglesia Metodista identifica explícitamente ese homónimo](https://iglesiametodista.org.ar/villa-sarmiento-espera-tu-testimonio-para-la-celebracion-del-80-aniversario/). La ubicación provincial debe ser clara en texto y metadata.
- La búsqueda del alias no aportó un resultado oficial inequívoco en la muestra. Eso **no prueba ausencia absoluta del índice** ni permite medir ranking. El bloqueo actual explica que no debamos esperar descubrimiento orgánico normal.
- El enlace suministrado `https://share.google/72tcJRTtkSLqOezwT` redirige a una búsqueda de marca con `kgmid=/g/11g2w747g4`; Google mostró un desafío anti-bot. Es un **indicio de una entidad local**, no una ficha plenamente auditada. No se resolvió CAPTCHA ni se cambió ninguna cuenta.

### Google Business Profile: resultado de verificación

| Dato de la ficha | Estado |
|---|---|
| Existencia pública inequívoca y pin | No confirmados visualmente; enlace con identificador de entidad disponible |
| Nombre | Nombre de CCVS presente en consulta de destino; no ratificado como rótulo final de ficha |
| Categoría/dirección/horarios | No verificables en la ficha durante esta sesión |
| Fotografías/web asociada | No verificables |
| Propiedad/verificación administrativa | Sin información; no se presume acceso |

No afirmar “no tiene ficha”. Pedir revisión humana del enlace y exportar/capturar campos reales antes de corregir web o ficha. No se creó ni reclamó perfil. Horarios de reunión no equivalen automáticamente a horarios generales de apertura del edificio.

## Relevancia de consultas

| Hipótesis | Evaluación | Contenido apropiado |
|---|---|---|
| Comunidad Cristiana Villa Sarmiento | Alta relevancia de marca | Inicio, Nosotros y redes coherentes |
| Iglesia cristiana en Villa Sarmiento Córdoba | Alta relevancia local, desambigua | Intro institucional + dirección real |
| Iglesia evangélica Villa Sarmiento | Relevante con Córdoba explícito; evitar homónimos | Identidad aprobada, sin repetir término en todos los títulos |
| Horarios de culto Villa Sarmiento | Intención práctica plausible, consulta ambigua | Horarios de reunión visibles; no cambiar terminología por SEO sin aprobación |
| Reuniones cristianas Villa Sarmiento | Relevante como intención | Visitarnos y tabla de horarios |
| Jóvenes cristianos Villa Sarmiento | Relevante al grupo real; demanda desconocida | Ancla Jóvenes, sábado 21:00 e Instagram juvenil |
| Iglesia cerca de Villa Dolores | Solo hipótesis secundaria | Confirmar contexto/cercanía local antes de redactar; no declarar sede en Villa Dolores |
| Iglesias cristianas en Traslasierra | Contexto regional posible, demanda/alcance no probados | Confirmar descripción regional; no crear páginas por ciudad ni afirmar cobertura de servicios |

No hubo Keyword Planner, Trends local fiable ni datos de Search Console; interés **no cuantificado**. Evaluar luego consultas reales e intenciones, no fabricar un listado de volúmenes.

## Ficha única de identidad propuesta

Nombre: **Comunidad Cristiana Villa Sarmiento**. Abreviatura: **CCVS**. Pertenencia informada: **Comunidad Cristiana**. Dirección: **Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina**. Reuniones: domingo 19:30 principal; miércoles 21:00 oración; sábado 21:00 jóvenes; sábado 16:30 niños.

Redes suministradas: [Facebook institucional](https://www.facebook.com/comunidadcristiana.villasarmiento/), [YouTube institucional](https://www.youtube.com/@comunidadcristianavillasar9819/videos), [Instagram de Jóvenes](https://www.instagram.com/jovenesccvs/). Sitio definitivo, contacto, CP, coordenadas y pin: **pendientes**. Alias de revisión: `https://ccvs-sigma.vercel.app/`, no asumir dominio oficial permanente.

La implementación futura debería derivar toda repetición de esta ficha, sin añadir un CMS. Fecha de revisión y responsable pueden mantenerse internamente para horarios; no simular actualizaciones automáticas.

## JSON-LD: ya existe Church

`BaseLayout.astro:12` genera **Church + PostalAddress**, verificado también en DOM de las seis rutas. Church hereda de PlaceOfWorship/CivicStructure/Place; no es un subtipo directo de Organization. No recomendar “añadir schema inexistente”. Ampliar solo con información útil y visible.

| Propiedad/tipo | Uso correcto para CCVS |
|---|---|
| name/address | Ya presentes y coherentes con contenido visible |
| description | Añadir definición breve aprobada, no un eslogan nuevo |
| url / @id | Esperar dominio oficial; ID estable distingue entidad de página |
| logo/image | Propiedades aplicables a Place; elegir archivos autorizados y URL pública definitiva |
| sameAs | Facebook/YouTube institucionales suministrados; confirmar destino. Instagram juvenil describe un grupo: no equipararlo automáticamente a toda la iglesia |
| geo | Omitir hasta verificar coordenadas del salón, no del centro de la localidad |
| event | Solo encuentro concreto con fecha/condiciones confirmadas; no inventar calendario desde horarios semanales |
| openingHours | No convertir hora de culto en rango de apertura |
| Organization | Nodo separado si se necesita representar la congregación como organización y relacionarla con el lugar; no inventar personería/parentOrganization legal |
| WebSite/WebPage | Opcionales con URL aprobada; no crean por sí solos autoridad ni posicionamiento |
| BreadcrumbList | No hay breadcrumbs visibles ni jerarquía profunda que justifiquen añadirlos ahora |
| FAQPage | Solo preguntas/respuestas reales visibles. Google retiró el rich result FAQ; no prometerlo ([cambio oficial](https://developers.google.com/search/updates)) |

Propuesta conservadora guardada en [schema-propuesto.json](evidencia/schema-propuesto.json): añade description y dos sameAs, sin URL ficticia, coordenadas, contacto, eventos, reseñas o autoridades. No se inyectó en el sitio.

### Validación del borrador

[Schema.org Validator](https://validator.schema.org/): ejecutado en modo fragmento HTML/JSON-LD; **Church reconocido, cero errores y cero advertencias**. Evidencia: [resultado](evidencia/schema-validacion.json), [captura](evidencia/schema-schema.png). El snippet de prueba incluye nombre, descripción y dirección visibles; las redes deben seguir visibles como ya ocurre en el sitio.

[Google Rich Results Test](https://search.google.com/test/rich-results): se envió el fragmento en modo código, pero el servicio devolvió **“Something went wrong / Log in and try again”**. **No se obtuvo resultado de elegibilidad.** Evidencia en `evidencia/schema-validacion.json` y `schema-google.png`. Church puede ser semánticamente válido sin producir un rich result elegible. La validación final con dominio/activos definitivos y HTML completo sigue pendiente.
