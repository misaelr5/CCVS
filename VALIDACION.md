# Validación de la entrega — 14 de octubre de 2026

## Probado

- Node.js 24.15.0 y npm 11.12.1.
- `npm install`: instalación correcta y lockfile generado.
- `npm run check`: 24 archivos, cero errores, advertencias o hints en la ejecución final.
- `npm run build`: generación estática correcta de las cinco páginas requeridas y página 404; cinco derivados WebP de los logos.
- `npm run verify:static`: cinco rutas, 82 enlaces internos/anclas y 20 referencias a recursos comprobadas. Imágenes con alt/dimensiones, header con logo madre exclusivo, un h1 por página, metadatos, JSON-LD válido y horarios del brief.
- Ausencia de fotos/capturas de `referencias/` en `dist/`. La carpeta también está ignorada por Git.
- Sitemap y canonical con `SITE_URL` de prueba aislado; después se reconstruyó sin esa variable. La salida final no contiene un dominio ficticio ni sitemap sin dominio.
- Servidor local: HTTP 200 para `/`, `/nosotros/`, `/ministerios/`, `/visitanos/` y `/links/`.
- `npm audit --omit=dev`: cero vulnerabilidades reportadas. La instalación también reportó cero para el conjunto de dependencias.

## No probado

- Layout, contraste medido, navegación de teclado real y comportamiento del menú en navegador: la herramienta de navegador no tenía superficies disponibles (`listBrowsers` vacío).
- Tamaños 360/375/390/430/768/1024/1440, zoom y reducción de movimiento en navegador.
- Core Web Vitals, navegación en dispositivos físicos y recortes con fotos finales.
- Despliegue, DNS y encabezados HTTP en producción. No se desplegó.

## Supuestos y límites

- Datos del brief tratados como información facilitada, sujetos a aprobación institucional antes de publicar.
- Dirección sin pin, logos provisionales y composiciones editoriales sin fotos propias.
- Encabezados en `_headers` requieren soporte del proveedor; no equivalen a una comprobación HTTP de producción.
- El build y el análisis estático no prueban por sí solos accesibilidad ni ausencia de desbordes responsive.
