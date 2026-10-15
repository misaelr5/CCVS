# Evidencia y reproducción

Fecha: **15/10/2026**, zona de trabajo America/Montevideo (UTC−03). Las marcas UTC de Playwright se conservan en el JSON.

## Versiones y modificaciones concurrentes

La sesión comenzó con Git limpio, `main` en `7395d42`. Se inspeccionó ese código, se ejecutaron check/build/static y 78 E2E y se produjo la matriz principal de capturas. Laboratorio final: tres repeticiones por ruta/perfil, después de la suite y primer benchmark, sobre ese build inicial.

Durante la redacción aparecieron cambios ajenos a esta auditoría en `README.md`, `src/data/links.ts`, `src/pages/index.astro` y `src/pages/ministerios.astro`. Se detectó cambio de etiqueta de navegación “Ministerios” a “Reuniones”, texto de Inicio y título/description/encabezado de la ruta. También se regeneró dist fuera del build inicial. Más tarde cambiaron `src/data/ministries.ts` y `src/data/site.ts` para incorporar una foto específica de Oración y Palabra. Se conservaron los seis archivos sin modificar ni revertir.

`cambios-concurrentes.diff` registra la diferencia observada. `cierre.json` comprueba la ruta actual `/ministerios/` en siete anchos: 200, título Reuniones, encabezado Nos reunimos:, sin overflow ni textos fuera del ancho. Hay dos capturas de cierre. **No se presenta la suite de 78 pruebas como una suite ejecutada después de esas ediciones.** Los hallazgos de Maps, video, historia, indexabilidad y estructura compartida no dependen de ese cambio de etiqueta. La nota es provisional por esas y otras limitaciones descritas.

La nueva foto de Oración y Palabra se incorporó después de ese chequeo acotado de etiquetas: no se atribuye revisión visual ni performance a esa foto. Las referencias de líneas de los informes corresponden al commit inicial; `site.ts` ganó líneas por esa edición posterior. `manifest-cierre.json` registra hashes actuales para distinguir las versiones.

La consulta pública corresponde al momento registrado en headers: no acredita que el alias sea idéntico archivo por archivo a HEAD o al estado final del workspace. No se consultó configuración privada de Vercel ni se publicaron cambios.

## Inventario

| Archivo | Contenido |
|---|---|
| `rutas.json` | 42 combinaciones de seis rutas × siete anchos; estado, títulos, schema en DOM, geometría, enlaces, axe/incomplete |
| `capturas/` | 30 páginas completas en cinco viewports, 12 primeras pantallas, siete menús; dos capturas adicionales de cierre |
| `playwright.json` | Reporte nativo: 78 aprobadas, cero fallos/flaky/omitidas, 105 s |
| `npm-audit.json` | Auditoría de dependencias: cero vulnerabilidades conocidas en ese momento |
| `laboratorio.json` | Doce ejecuciones finales, detalle de red/CPU/ventana/LCP/CLS/TTFB local y recursos |
| `captura.log` | Primera exploración de laboratorio; coexistió con otras pruebas y **no es el resultado final** |
| `laboratorio.log` | Resumen de las doce ejecuciones finales |
| `externos.json` | URLs oficiales, metadata, destinos y límites del benchmark; se omitió reproducción de cuerpos completos de páginas ajenas |
| `benchmark/` | Veinte capturas de diez páginas externas — incluye Passion US, excluye Cita que falló SSL — en desktop/mobile |
| `publico.json` | Respuestas del alias público, robots, sitemap, 404 y enlace suministrado de Maps; datos de red/sesión del desafío Google eliminados |
| `schema-propuesto.json` | Propuesta semántica, no aplicada; sin dominio inventado |
| `schema-validacion.json` | Schema.org: Church, 0 errores/advertencias. Google: error de servicio y petición de inicio de sesión; sin resultado de elegibilidad |
| `schema-schema.png`, `schema-google.png` | Evidencia visual de los dos validadores |
| `cierre.json` | Revisión acotada de cambios concurrentes de etiqueta/cabecera |

Los archivos de contacto son mosaicos para inspección; las capturas originales son la evidencia de mayor resolución. Screenshots externos son material de estudio local: **no publicarlos ni incorporarlos como activos de CCVS**. La auditoría permanece fuera del despliegue mediante la lista permitida de `.vercelignore`; no se cambió esa configuración.

## Comandos ejecutados

Desde `D:\CCVS`, sin instalaciones ni cambios de configuración:

```powershell
npm run check
npm run build
npm run verify:static
npm run test:e2e -- --reporter=json
npm audit --json
```

Resultado de check: 48 archivos, 0 errores/warnings/hints. Build: seis páginas y 62 derivados de imagen. Static: 177 enlaces/anclas y 58 recursos válidos. No existe script de lint.

Se levantó preview en 127.0.0.1:4322 para la salida compilada. Scripts auxiliares dentro de esta carpeta: `auditar.mjs`, `externos.mjs`, `validar-schema.mjs`, `cierre.mjs`. Playwright/axe provienen de las dependencias ya instaladas. No se inspeccionó node_modules de forma recursiva ni se reinstalaron herramientas.

```powershell
# Requiere build y preview correspondientes a la versión que se desea medir.
node auditoria-fase-5/evidencia/auditar.mjs
# Solo laboratorio, tres repeticiones por perfil/ruta:
node auditoria-fase-5/evidencia/auditar.mjs --lab
```

Reejecutar sobrescribe artefactos: preservar una copia si se quiere comparar versiones. Las mediciones manuales de tamaño de bundles están documentadas en el informe 06; no hay Lighthouse instalado. No se asignaron puntajes Lighthouse.

Efectos de pruebas: `dist/`, `.astro/` y `test-results/` regenerados, ignorados por Git. La primera captura auxiliar se corrigió para usar `browser.newContext()`, requisito de axe; solo cambió el script de evidencia. El validador Google requirió ajustar selectores de su interfaz y finalmente respondió error de servicio. No se tomaron esos intentos como errores del sitio.

## Cómo leer las conclusiones

**Comprobado:** estado de código/build/HTTP/DOM en el momento indicado y resultados automatizados. **Observado visualmente:** capturas e interacción en Chromium. **Inferido:** ventajas de propuestas futuras o intención de usuario. **Pendiente:** ficha de Maps completa, acceso a cuentas, permisos institucionales, campo/INP, lectores reales, Safari/dispositivos y certificación WCAG. La banda de puntuación no es un intervalo estadístico.
