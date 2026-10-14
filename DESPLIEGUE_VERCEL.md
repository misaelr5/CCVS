# CCVS — publicación en Vercel

El usuario autorizó expresamente el despliegue el **14/10/2026** con el pedido «exportalo en vercel». Esta autorización reemplazó la restricción anterior de mantener los ajustes solamente locales para este despliegue.

## Publicado y verificado

- URL estable: **https://ccvs-sigma.vercel.app/**
- Proyecto: `misaellovespias-projects/ccvs`.
- Deployment: `dpl_3TkcCjjRxt82xFEByXuNfHXPKGxY`.
- URL de esta versión: https://ccvs-hpgqz21va-misaellovespias-projects.vercel.app/
- Inspección: https://vercel.com/misaellovespias-projects/ccvs/3TkcCjjRxt82xFEByXuNfHXPKGxY
- Estado remoto confirmado: **READY**, target **production**. Vercel confirmó también el alias `ccvs-misaellovespias-projects.vercel.app`.

La publicación incluye los ajustes actuales de menú en tarjeta, entradas, objetos al scroll, redes compactas y CCVS de fondo en el footer.

## Configuración

Sitio Astro estático, sin adapter de servidor ni nuevas dependencias. `vercel.json` define Astro, `dist`, `npm ci`, verificaciones antes del build y URLs con barra final. Se configuran `X-Content-Type-Options`, `Referrer-Policy` y `X-Frame-Options`.

`.vercelignore` usa una lista de archivos y directorios permitidos. La revisión `vercel deploy --dry --json` confirmó **44 archivos**, incluidos todos los componentes/scripts actuales. No se subieron referencias, videos, prompts, documentos del pack, capturas, tests ni archivos de entorno. `.env.local` y `.vercel/` están ignorados en Git. La CLI generó el vínculo y la credencial OIDC local; no se incorporan al código ni a la publicación.

Se reutilizó Vercel CLI 59.11.2. El servicio ejecutó el build con su CLI 62.7.0; proyecto configurado con Node 24.x. Documentación: [Astro estático en Vercel](https://vercel.com/docs/frameworks/frontend/astro), [exclusiones de subida](https://vercel.com/docs/deployments/vercel-ignore).

## Validación

- Typecheck local: 42 archivos, cero errores/advertencias/hints.
- Build local de seis páginas y verificación de 173 enlaces internos/anclas y 36 recursos.
- **72 pruebas E2E aprobadas** antes del deploy. Se corrigió una comprobación intermitente: el test ahora espera el evento asíncrono de cambio a reduced motion antes de comprobar estilos y animaciones.
- Build remoto y checks completados; instalación remota informó cero vulnerabilidades.
- URL estable consultada sin sesión: seis rutas con HTTP 200 en **390×844 y 1440×900**, sin overflow horizontal ni errores de JavaScript/recursos.
- Menú no modal, redes al final, CCVS de fondo, objetos al scroll y títulos con entrada comprobados en la versión pública.
- Navegación hacia Nosotros y retroceso desde una posición desplazada: ambas empiezan arriba.
- Headers de seguridad verificados en respuestas públicas. `robots.txt` mantiene `Disallow: /`; las seis páginas conservan `noindex, nofollow`.
- Intentos de acceder públicamente a referencias, videos, prompt y `.env.local`: HTTP 404.
- Capturas y evidencia en `qa-artifacts/vercel-deploy/`, excluidas de Git y de la subida.

La herramienta web de búsqueda no pudo abrir el dominio recién creado; la verificación pública se ejecutó directamente con Chromium y peticiones HTTP, sin credenciales.

## Relación con Git

Despliegue manual desde la versión local actual. **No se hizo commit ni push** y no se conectó el repositorio para despliegues automáticos. `origin/main` continúa en `2f4712f7d68cdc95d0db76988bb35b7d0f2a22b1`; ese commit es la base, no representa todos los archivos publicados.

Manifest SHA-256 de los archivos enviados: `qa-artifacts/vercel-deploy/source-manifest.json`. Hash del conjunto: `7c1837f035d959c99f70e02e9769282d89d98b51c81f4fdb5700bb1ed1d4e001`. El comando de deploy adjuntó este hash y el estado `local-uncommitted` como metadata. Los cambios posteriores en estos documentos no forman parte del bundle porque los Markdown del pack están excluidos.

## Pendientes

Es una versión pública para revisión, todavía sin indexación. Continúan pendientes fotos propias, logos definitivos, aprobación institucional/jurídica y dominio oficial. La prueba física de mobile y Safari no se ejecutó. El rango de Node en `package.json` permite mayores futuras; conviene revisar la compatibilidad antes de actualizar el runtime del proyecto.

Próximo paso: revisar el sitio publicado en un celular y guardar estos cambios en Git cuando el usuario lo solicite. Concepto útil: deploy publica una copia concreta de archivos; commit/push guardan y sincronizan su historial. Son operaciones independientes.
