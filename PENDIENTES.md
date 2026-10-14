# Checklist — qué falta para publicación de CCVS

## Imprescindibles (contenido y aprobación)
- [x] Jerarquía de logos definida: **en header solo Comunidad Cristiana**, CCVS limpio en secciones secundarias y CCVS texturizado solo decorativo.
- [x] Acento bordó aproximado `#631918`; sin cian.
- [x] Historia, creencias y horarios preliminares proporcionados.
- [ ] **Logos definitivos**: SVG o PNG transparente de alta calidad; confirmar el bordó exacto.
- [ ] **Fotos propias**: mínimo 8–12 autorizadas, al menos 2 horizontales y 2 verticales; no publicar menores sin permisos.
- [ ] Confirmar horarios y dirección exacta antes de poner el sitio en producción.
- [ ] Obtener pin exacto y URL de Google Maps.
- [ ] Obtener WhatsApp, email y redes oficiales. Si faltan, ocultar esos botones.
- [ ] Confirmar nombre y cargo de pastor/liderazgo y autorizar biografía/foto antes de incorporarlos.
- [ ] Aprobación de historia y doctrina por responsables de la iglesia; misión/visión solo si se facilita texto oficial.

## Segunda etapa / operación
- [ ] Elegir dominio y titular de la cuenta de alojamiento/dominio.
- [ ] Designar responsable de actualizar horarios, ministerios y predicaciones.
- [ ] Facilitar enlaces de YouTube/predicaciones, si se desea una sección multimedia.
- [ ] Decidir formularios, peticiones de oración o donaciones; validar privacidad y consentimiento antes de habilitar.
- [ ] Decidir si se requiere CMS; en MVP se usa archivo local tipado.

## QA indispensable
- [ ] 360, 375, 390, 430, 768 y 1440 px: sin scroll horizontal ni texto cortado.
- [ ] Header con logo madre en ambas versiones, sin CCVS en el header.
- [ ] Rutas `/`, `/nosotros`, `/ministerios`, `/visitanos`, `/links` funcionan.
- [ ] Menú mobile usable por teclado, teclado Escape y cierre al navegar; foco visible.
- [ ] Acordeón accesible; botones sin links ficticios ni formularios simulados.
- [ ] Imágenes locales optimizadas, `alt`, carga prioritaria del hero y lazy en resto.
- [ ] Contraste AA, `prefers-reduced-motion`, prueba de navegación sin JavaScript cuando aplique.
- [ ] `npm run check`, `npm run build` y QA visual real (si la herramienta permite navegador).
- [ ] Metas SEO, Open Graph, sitemap/canonical cuando exista dominio real.
- [ ] Aprobación institucional antes de publicar.
