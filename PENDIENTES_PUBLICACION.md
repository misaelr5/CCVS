# Pendientes de publicación — V3

## Aprobación y material propio

- [ ] Aprobar el copy editorial provisional; no constituye un lema o misión oficial.
- [ ] Aprobar historia y doctrina conforme a V3, especialmente la cronología del terreno.
- [ ] Reconfirmar los cuatro horarios y la dirección para producción.
- [ ] Recibir fotos originales autorizadas: hero horizontal/vertical, reuniones, jóvenes, niños, servicio y edificio. Confirmar permisos de personas y menores.
- [ ] Recibir logos institucionales finales transparentes y confirmar bordó exacto.
- [x] Recibir Instagram Jóvenes CCVS, Facebook y YouTube; incorporar las URLs proporcionadas y comprobar HTTP 200.
- [ ] Validar el pin del enlace de Google proporcionado. La ficha fue bloqueada por control antirobot; no se habilita Maps todavía.
- [ ] Confirmar email/WhatsApp institucional; no se inventan contactos.
- [ ] Incorporar liderazgo solo si se decide hacerlo y llegan datos aprobados.

## Operación

- [ ] Elegir dominio, alojamiento y titular de cuentas.
- [ ] Definir responsable de actualización.
- [x] Commit y push de V3 autorizados por el usuario el 14 de octubre de 2026.
- [ ] Autorizar explícitamente el despliegue: subir el repositorio no publica el sitio.
- [ ] Configurar SITE_URL con dominio real; canonical, og:url y sitemap dependen de él.
- [ ] Agregar imagen Open Graph propia aprobada.
- [ ] Después de aprobación institucional, cambiar publicationApproved a true. Mientras tanto hay noindex y robots Disallow.
- [ ] Adaptar encabezados HTTP y errores al proveedor elegido.
- [ ] Decidir analítica solo si se necesita; actualmente no hay trackers.

## QA con material final

- [ ] Revisar fotos y object-position en 360/375/390/430/768/1024/1440.
- [ ] Revalidar contraste y texto sobre fotografías.
- [ ] Probar dispositivos reales (incluyendo Safari/iPhone), zoom 200% y lector de pantalla.
- [ ] Revisar y aprobar el borrador `/terminos-y-condiciones/` antes de producción.
- [ ] Incorporar fotografías nuevas de bienvenida, reunión, banner y capas de collage según `FASE_4_RESULTADO.md`.
- [ ] Medir Core Web Vitals/Lighthouse con fotos finales y alojamiento real.
- [ ] Revisar diferencias tipográficas con responsables; si se facilita GT America/Saol con licencia, evaluar su integración.
- [ ] Verificar rutas públicas, dominio, sitemap, robots y headers después del despliegue autorizado.

## Hecho en esta entrega

- [x] Respaldo externo completo y rama de la versión anterior.
- [x] Cinco rutas reconstruidas; datos tipados separados.
- [x] Comparación visual en dos pasadas de Inicio/Nosotros, capturas finales de todas las páginas.
- [x] Emblema madre exclusivo en header, bordó y fuentes locales.
- [x] Pruebas de siete anchos sin overflow horizontal.
- [x] Menú: teclado, Escape, foco, bloqueo/restauración de scroll y navegación.
- [x] Acordeón: teclado y estados ARIA; contenido disponible sin JavaScript.
- [x] Astro check, build, enlaces estáticos, auditoría de dependencias y 40 pruebas en Chromium.
- [x] Axe sin infracciones detectadas en criterios WCAG A/AA evaluados en cinco rutas a 390/1440.
