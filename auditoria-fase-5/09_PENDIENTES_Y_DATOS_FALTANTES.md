# Pendientes y datos faltantes

Fecha: **15/10/2026**. Diferenciar dato faltante, aprobación pendiente y verificación técnica. Nada de esta lista se completó con información supuesta.

| Necesidad | Lo conocido | Qué falta / responsable recomendado | Bloquea |
|---|---|---|---|
| Identidad pública | Comunidad Cristiana Villa Sarmiento; pertenencia a Comunidad Cristiana | Ratificar denominación editorial/jurídica y relación institucional; referentes locales | Lanzamiento/legales |
| Dirección | Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina | Confirmar acceso y pin. Hay homónimos en Córdoba y Buenos Aires; no completar CP/departamento automáticamente | Cómo llegar, SEO local |
| Mapa/ficha pública | Enlace suministrado deriva hacia búsqueda Google con nombre y `kgmid=/g/11g2w747g4` | Destino bloqueado por desafío anti-bot. Revisar ficha en sesión humana: nombre, categoría, dirección, horarios, fotos, web, propiedad/administración | Integración Maps; no demuestra inexistencia de ficha |
| Contacto | Facebook, YouTube e Instagram juvenil suministrados | Correo/teléfono/WhatsApp autorizado y persona que atiende, si se quieren publicar | Consulta directa; no hace falta inventarlos |
| Horarios | Cuatro horarios coinciden con pedido y código | Responsable de actualización, vigencia y excepciones; distinguir reuniones de apertura del salón | Confianza operativa/Maps |
| Historia | 2005 Esther Mercado; salón alquilado 2008–2012; terreno municipal; pastor 2015 | Cronología de donación/construcción y afirmación de autonomía; validación pastoral | Texto institucional final |
| Doctrina y copy | Orientación informada y textos actuales | Aprobar cinco creencias, frases editoriales y referencias bíblicas; edición bíblica solo si habrá citas literales | Publicación institucional |
| Fotografías/video | Ya hay archivos reales en producción local y portada pública | Titularidad y consentimiento/permisos de publicación, especialmente personas menores; seleccionar exterior útil para llegada | Revisión de publicación, no volver a reemplazar por reservas |
| Logos | Emblema madre y CCVS provisionales disponibles | Originales oficiales/calidad/transparencia y autorización; no recolorear | Favicon/OG definitivos |
| Primera visita | Hora y dirección | Duración, acceso, recepción, edades, accesibilidad, organización infantil, contacto | FAQ útil |
| Servicio comunitario | Actividades enumeradas | Cuáles siguen activas, modalidad, requisitos y responsable; no publicar fechas supuestas | Contenido de ayuda |
| Dominio | Alias Vercel de revisión funciona | Dominio oficial aprobado, titular/custodia/DNS y SITE_URL para build | Canonical, sitemap, identidad estable |
| Legal/privacidad | Borrador visible; sin analítica/formularios | Entidad/responsable/contacto, revisión de imágenes y política acorde al tratamiento real | Lanzamiento definitivo |
| Search Console | Sin acceso/verificación de propiedad en esta auditoría | Configurar después del dominio y autorización; consulta de cobertura, URLs y rendimiento | Confirmar indexación real, no auditar HTML |
| Analítica | No hay tracker incorporado | Elegir objetivo, proveedor, minimización, privacidad y responsables antes de integrar | Medición de clics, no funcionamiento del sitio |
| Producción vs Git | HEAD local y alias con metadatos/video comprobados | No se obtuvo manifest remoto de fuente actual; revisar historial de despliegue antes del próximo release | Afirmar igualdad exacta de archivos |

## Pruebas pendientes

- Safari/WebKit, Firefox y teléfonos reales; no cubiertos por la suite Chromium actual.
- VoiceOver/NVDA y prueba con personas nuevas; axe no sustituye lectura asistida.
- Contraste de texto sobre **todos** los fotogramas del video y fotografías tras cualquier recorte.
- Auditoría completa de WCAG 2.2 AA, zoom 200/400 %, espaciado de texto y orientación; no declarar certificación.
- Datos de campo CrUX/RUM y percentil 75 de LCP/INP/CLS. No existen en la evidencia disponible.
- Lighthouse en entorno disponible acordado, sin instalar herramientas en esta fase; laboratorio CDP realizado y descrito aparte.
- Validar schema final con dominio/logo definitivos; resultados del borrador en `04_AUDITORIA_SEO_LOCAL.md`.
- Propiedad y vigencia de redes: los enlaces provienen del usuario; no se verificó control administrativo ni se enviaron mensajes.
- Rendimiento cuantitativo y accesibilidad completos de sitios referentes; no medidos ni puntuados.

## Hechos que no deben inferirse

No deducir que la iglesia está en Villa Dolores por la cercanía, que atiende toda Traslasierra, que una URL compartida acredita propiedad de Google Business Profile, que el reconocimiento pastoral produce autonomía jurídica, o que una foto incorporada prueba consentimiento. Tampoco que `Disallow: /` proporciona privacidad: el sitio público puede abrirse y compartirse.

La auditoría creó exclusivamente esta carpeta. Build regeneró `dist/` y `.astro/`, y Playwright escribió `test-results/`, todos ignorados por Git. La primera captura auxiliar se detuvo por uso de contexto de axe, se corrigió **solo el script de auditoría** y se completó. No se alteró el código del producto ni se aplicaron arreglos automáticos.

Al cierre Git muestra además seis archivos modificados por trabajo concurrente fuera de esta auditoría (README, links, Inicio, Reuniones, ministries y site). Se preservaron y documentaron en `evidencia/cambios-concurrentes.diff`; no atribuirlos a correcciones de Fase 5. Las etiquetas de la ruta actual se verificaron aparte; la foto posterior de Oración y Palabra no quedó incluida en ese chequeo. Las pruebas principales permanecen vinculadas al build inicial.
