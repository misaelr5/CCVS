# Kit de arranque — Comunidad Cristiana Villa Sarmiento

**Listo para entregarse a Codex.** Este ZIP es una guía de implementación con referencias visuales y los tres logos provisionales. **Todavía no es la web programada:** Codex la generará.

## Contenido
- `PROMPT_CODEX.md` — consigna integral para ejecutar.
- `IDENTIDAD_VISUAL.md` — jerarquía institucional y paleta **ya confirmadas**.
- `BRIEF_IGLESIA.md` — datos reales (historia, creencias, horarios).
- `DISENO_REFERENCIA.md` — análisis editorial, desktop y mobile.
- `PENDIENTES.md` — checklist del proyecto.
- `AGENTS.md` — restricciones persistentes para el agente.
- `identidad/` — imágenes del usuario. Son **provisionales**; se reemplazarán por SVG/PNG transparentes.
- `referencias/` — capturas derivadas de videos del usuario de Passion City. **Solo estudio interno, no assets web.**

## Cómo arrancar en Windows + VS Code + Codex
1. Creá una carpeta vacía llamada `cc-villa-sarmiento`.
2. Extraé el ZIP **dentro** de esa carpeta, manteniendo la estructura.
3. Abrí esa carpeta en VS Code y entrá a Codex con acceso al workspace.
4. Modelo recomendado: **GPT-6.1 Sol, razonamiento Medium**, si está disponible. Para máxima calidad y mayor consumo, Astra Medium; para retoques menores, Luna Low.
5. Pegá exactamente este mensaje corto:

   **Leé `PROMPT_CODEX.md` y ejecutá la implementación completa dentro de este proyecto. Respetá `AGENTS.md`, `IDENTIDAD_VISUAL.md`, `BRIEF_IGLESIA.md`, `DISENO_REFERENCIA.md` y `PENDIENTES.md`; usá las imágenes locales de referencia. No hagas push ni deploy.**

6. Al terminar, revisá la app local en mobile y escritorio. Sumá fotos reales, logos finales y enlaces aprobados antes de publicar.

## Importante
- Los emblemas originales tienen jerarquía institucional. En header va **solo el logo madre de Comunidad Cristiana**.
- El acento UI es **bordó #631918**, no cian.
- No copiar fotos, logos, textos ni código de Passion City.
- Las decisiones de diseño faltantes deben resolverse con defaults reversibles y dejarse en un checklist; no hay que inventar información pública.
