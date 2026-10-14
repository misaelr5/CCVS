# Fase 4 — resultado y validación

## Implementación

Se conserva la base V3, fuentes Archivo/Bodoni Moda, emblema madre y paleta. Rama local de respaldo: `backup/antes-fase4-20261014`, commit `3e0d577`.

Inicio: collage vertical a la izquierda y contenido a la derecha; debajo, domingo 19:30 a la izquierda e imagen a la derecha; banner ancho; filas completas de horarios. En mobile: collage, texto, destacado dominical, imagen, banner y horarios. El hero permanece igual.

El código de los módulos inferiores, desde “Nuestra comunidad”, se comparó contra el commit V3 y permanece idéntico. Se aplica revelado sin cambiar su geometría final. Nosotros y Visitarnos conservan su diseño; Jóvenes recibe un collage dentro del área fotográfica existente de Ministerios.

Componentes principales: `EditorialMark`, `Highlight`, `PhotoCollage`, `SocialIcon`; actualizados Inicio, `MinistryFeature`, footer, links, layout y scripts de interacción.

## Collage y motion

Tres capas con proporciones distintas, recortes, superposición, marcos, cinta editorial, anotación, X y flecha dibujada. Hay variantes originales de flechas curva, horizontal, diagonal y larga, círculo y resaltados. No se usaron las imágenes ajenas adjuntas como contenido del sitio.

Las fotografías no existen todavía: las capas son reservas identificadas. La composición queda lista para fotografías propias, pero no se presenta como un collage fotográfico terminado.

Reveals de una sola reproducción por carga de página, Web Animations API + IntersectionObserver, transform/opacity, stagger de 100 ms y trazo SVG de 750 ms. No se agregó ninguna dependencia. El contenido es visible por defecto; si JavaScript no funciona, permanece accesible. Reduced motion evita desplazamientos y dibujo animado.

## Navegación

ClientRouter nativo de Astro: pares forward/back de 350 ms, header con nombre compartido, sin persistir menús abiertos ni gestionar historial manualmente. `fallback="none"` usa navegación completa si falta la API.

La inicialización se realiza en carga normal y `astro:page-load`. Cada navegación libera observadores y handlers con AbortController. El menú se cierra y desbloquea antes de preparar/sustituir la página.

Se corrigió el rechazo AbortError de `ViewTransition.ready` cuando una navegación rápida cancela una transición anterior. Otras causas siguen reportándose. También se verificó el menú sin la API.

Referencia técnica: [View Transitions de Astro](https://docs.astro.build/en/guides/view-transitions/).

## Redes y mapa

Las URLs facilitadas de Instagram Jóvenes CCVS, Facebook de la congregación y YouTube respondieron HTTP 200 en la comprobación. Se incorporan con iconos originales, rel seguro y pestaña nueva. Esto verifica respuesta HTTP, no propiedad de las cuentas, que proviene de la información del usuario.

El enlace `https://share.google/72tcJRTtkSLqOezwT` redirige a una búsqueda con “COMUNIDAD CRISTIANA VILLA SARMIENTO”. La ficha fue bloqueada por control antirobot, por lo que no se verificó pin/dirección. Se conserva `suppliedMapUrl` en datos y `mapUrl=null`: no aparece un botón de Maps todavía. No se inventaron coordenadas ni se agregó WhatsApp.

## Footer y términos

Wordmark CCVS grande, emblema madre primero y logo local después; redes y enlace a `/terminos-y-condiciones/`.

La nueva página tiene nueve secciones y fecha 14 de octubre de 2026. Está marcada como borrador pendiente de revisión institucional y jurídica, sin inventar datos legales ni contacto. Se consultó como referencia de propiedad intelectual [la información oficial argentina](https://www.argentina.gob.ar/node/159536). No se añadió analítica ni formulario; la política de privacidad deberá adaptarse a las tecnologías futuras.

El sitio mantiene noindex y robots Disallow. El borrador legal queda fuera del sitemap de las rutas institucionales.

## Verificado

- Astro check: 0 errores, advertencias y hints.
- Build: 6 páginas estáticas.
- Análisis estático: 168 enlaces/anclas internos y 30 referencias a recursos.
- Playwright: **52 pruebas aprobadas**.
- Seis rutas en 360/375/390/430/768/1024/1440, sin overflow detectado.
- Axe en 390/1440 con reduced motion para inspeccionar el estado final: sin infracciones en las reglas WCAG A/AA evaluadas.
- Pruebas separadas de animación, una sola reproducción y reduced motion.
- Forward/back/forward, navegación repetida, footer, fragments, enlaces desde Links, menú después de navegación y fallback sin API.
- Menú con teclado, Escape, foco y restauración de scroll; acordeón y versión sin JavaScript.
- Capturas antes de los cambios en `qa-artifacts/antes-fase4/` y después en `qa-artifacts/fase4/`, con vistas de 390×844 y 1440×900, páginas completas y bloques de Inicio.

No se midió Lighthouse/Core Web Vitals ni se verificó Safari/iOS físico. La sensación visual inspirada en iOS no equivale a una prueba en un iPhone.

## Fotografías pendientes

| Dato en site.photos | Uso | Proporción recomendada | Variante mobile |
| --- | --- | --- | --- |
| welcome | Collage principal, bloque 1 | 4:5 | Recomendable |
| collageSecondary | Capa secundaria | 4:5 | Opcional |
| collageDetail | Recorte de detalle | 1:1 | Opcional |
| gathering | Domingo, bloque 2 | 5:6 | Recorte 1.1:1 |
| banner | Banner comunitario | 3.8:1 | 1.7:1 |
| youth | Collage Jóvenes | 4:3 | Recorte 1.05:1 |
| community / service | Módulos inferiores existentes | 4:3 | Recomendable |
| hero / about | Portadas V3 | Según contenedores existentes | Recomendable |

Revalidar consentimiento y permisos, especialmente de menores; recorte, resolución, contraste y rendimiento con fotos finales. Logos oficiales, aprobación del copy/doctrina/legal, mapa y dominio siguen pendientes.

## Comandos

```powershell
npm run dev
npm run check
npm run build
npm run verify:static
npm run test:e2e
npm run capture -- fase4
```

Commit y push autorizados explícitamente por el usuario después de la consigna adjunta. No deploy.
