# Pendientes de publicación

La implementación local y la publicación del repositorio público no equivalen a aprobación del sitio institucional ni despliegue.

## Contenido indispensable

- [ ] Aprobar textos editoriales, historia y creencias con responsables de la iglesia.
- [ ] Reconfirmar los cuatro horarios y la dirección antes de publicar.
- [ ] Recibir logos oficiales SVG/PNG transparente y confirmar bordó exacto.
- [ ] Recibir fotos propias autorizadas (8–12, incluyendo horizontales y verticales). Confirmar permisos de imagen, especialmente de menores.
- [ ] Cargar pin exacto y URL oficial de Google Maps si se desea el mapa.
- [ ] Confirmar WhatsApp, email y redes. Actualmente no hay botones externos ni contactos inventados.
- [ ] Incorporar liderazgo únicamente si se facilitan nombre, cargo y material aprobado. La página actual no requiere ese bloque.

## Operación

- [ ] Elegir dominio, alojamiento y titular de las cuentas.
- [ ] Definir responsable de cambios de contenido.
- [ ] Configurar `SITE_URL`: habilita canonical, `og:url` y sitemap con el dominio real.
- [ ] Agregar imagen Open Graph aprobada; no se publica una imagen institucional no autorizada.
- [ ] Configurar encabezados HTTP y página de error según proveedor.
- [ ] Evaluar analítica y consentimiento si se solicitan; actualmente no se rastrea a visitantes.
- [ ] Autorizar el despliegue del sitio. La autorización de GitHub no incluye hosting.

## QA visual pendiente

No había un navegador conectado en la sesión de implementación. No marcar estas pruebas como realizadas a partir de una lectura de CSS.

- [ ] Revisar `/` y `/nosotros/` a 390 y 1440 px.
- [ ] Revisar todas las rutas a 360, 375, 390, 430, 768, 1024 y 1440 px: sin desbordes ni texto cortado.
- [ ] Verificar header: logo madre exclusivo y legible en móvil y escritorio.
- [ ] Menú: abrir/cerrar, Tab/Shift+Tab, Escape, retorno de foco, cierre al navegar y al pasar a escritorio.
- [ ] Acordeón: abrir/cerrar con teclado; enlaces de `/links/` navegables.
- [ ] Navegar con JavaScript desactivado (menú nativo y acordeón).
- [ ] Revisar contraste AA, zoom 200%, foco visible y reducción de movimiento.
- [ ] Revisar recortes y rendimiento con fotos finales; medir Core Web Vitals en el sitio final.

## Validación reproducible

```powershell
npm ci
npm run check
npm run build
npm run preview
```

Las verificaciones concretas de esta entrega se registran en `VALIDACION.md`.
