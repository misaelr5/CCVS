# Video de portada

La portada reproduce el video local en bucle y sin sonido al entrar. El visitante puede activar/silenciar el sonido y pausar/reanudar desde botones accesibles. Al salir del viewport, ocultar la pestaña o navegar, la reproducción se pausa y se silencia. Al volver a Inicio se inicializa sin sonido. Con movimiento reducido no se descarga el MP4 hasta que la persona pulse reproducir.

## Material y preparación

- Original local: `src/assets/videos/IMG_2757.MOV`, 259.811.070 bytes, 70,335 segundos, 3840×2160 HEVC de 10 bits, HLG/BT.2020. Se conserva intacto.
- Escritorio: `public/media/portada-ccvs.mp4`, 14.839.646 bytes, 1280×720 H.264, audio AAC estéreo.
- Celular: `public/media/portada-ccvs-mobile.mp4`, 8.441.049 bytes, 960×540 H.264, audio AAC estéreo.
- Imagen de respaldo: `src/assets/photos/portada-video.jpg`, extraída a los dos segundos y optimizada a WebP por Astro.
- Conversión HLG a SDR/BT.709, MP4 con `faststart` y metadatos privados eliminados. Se conserva la duración completa.

Preparación reproducible con FFmpeg disponible localmente:

```powershell
./scripts/prepare-hero-video.ps1 -Ffmpeg 'C:/ruta/ffmpeg.exe'
```

FFmpeg es una herramienta de preparación, no una dependencia del sitio. Se obtuvo una compilación portable de Gyan enlazada desde el sitio oficial de FFmpeg y se verificó el SHA-256 publicado. El original y los MOV/HEIC de la carpeta de fotos están excluidos de la subida a Vercel; el sitio utiliza únicamente los MP4 preparados y las imágenes importadas. No se hizo deploy.

## Implementación

`HeroVideo.astro` contiene el poster, el video y los botones. `hero-video.ts` usa los eventos nativos del reproductor, IntersectionObserver y el mismo AbortSignal que el ciclo de navegación de Astro. La página conserva el poster y el contenido si falla la reproducción, se bloquea autoplay o JavaScript está desactivado. Los textos actuales de la portada se conservaron.

Referencias: [HTML video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), [autoplay y activación del usuario](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay), [FFmpeg y compilaciones para Windows](https://ffmpeg.org/download.html).

## Validación

- Typecheck, build y verificación estática de recursos, incluidos ambos videos y poster.
- Seis pruebas específicas en `tests/hero-video.spec.ts`: reproducción silenciada en mobile/desktop, sonido con teclado, pausa, salida del viewport, navegación atrás/adelante, reduced motion, error de descarga y contenido sin JavaScript.
- Layout revisado a 360/375/390/430/768/1024/1440 px, sin scroll horizontal.
- Capturas de 390×844 y 1440×900 al inicio, a los 30 y a los 60 segundos en `qa-artifacts/fotos/portada-video-*`.
- Axe sin infracciones en las reglas A/AA evaluadas sobre la portada a 390 y 1440 px; no equivale a certificación.

Las pruebas de interacción se ejecutan en Chromium. La salida por parlantes y la reproducción en Safari/iPhone físicos requieren revisión en esos dispositivos. No existe script independiente de lint en este proyecto.

La revisión automática bloqueó la limpieza de `qa-artifacts/video-tools`. La compilación portable y su ZIP permanecen allí, excluidos de Git y del despliegue. No son necesarios para reproducir la portada.
