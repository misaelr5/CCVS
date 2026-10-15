/** A single lifecycle per Astro page: never leave media playing after navigation. */
export function initializeHeroVideo(signal: AbortSignal, reducedMotion: boolean) {
 const frame = document.querySelector<HTMLElement>('[data-hero-video]');
 const video = frame?.querySelector('video');
 const controls = document.querySelector<HTMLElement>('[data-video-controls]');
 const sound = controls?.querySelector<HTMLButtonElement>('[data-video-sound]');
 const playback = controls?.querySelector<HTMLButtonElement>('[data-video-play]');
 const status = document.querySelector<HTMLElement>('[data-video-status]');
 if (!frame || !video || !controls || !sound || !playback) return;
 let userPaused = reducedMotion;
 let failed = false;
 const initialRect = frame.getBoundingClientRect();
 let inView = initialRect.bottom > 0 && initialRect.top < innerHeight;
 video.muted = true;
 video.defaultMuted = true;
 controls.hidden = false;
 const sync = () => {
  sound.querySelector('span')!.textContent = video.muted ? 'Activar sonido' : 'Silenciar';
  sound.dataset.soundOn = String(!video.muted);
  playback.querySelector('span')!.textContent = video.paused ? 'Reproducir video' : 'Pausar video';
 };
 const load = () => {
  if (video.getAttribute('src')) return;
  video.src = (matchMedia('(max-width: 700px)').matches ? video.dataset.videoMobile : video.dataset.videoSrc) ?? '';
 };
 const play = (manual = false) => {
  if (failed || signal.aborted) return;
  load();
  void video.play().then(() => { if (signal.aborted) video.pause(); }).catch(() => {
   if (manual && status && !signal.aborted) status.textContent = 'No se pudo iniciar el video. Intentá reproducirlo nuevamente.';
   sync();
  });
 };
 const quietPause = () => { video.pause(); video.muted = true; sync(); };
 sound.addEventListener('click', () => {
  if (status) status.textContent = '';
  video.muted = !video.muted;
  if (!video.muted && video.paused) { userPaused = false; play(true); }
  sync();
 }, { signal });
 playback.addEventListener('click', () => {
  if (status) status.textContent = '';
  if (video.paused) { userPaused = false; play(true); }
  else { userPaused = true; video.pause(); }
 }, { signal });
 for (const event of ['play', 'pause', 'volumechange']) video.addEventListener(event, sync, { signal });
 video.addEventListener('loadeddata', () => { frame.classList.add('is-ready'); }, { signal });
 video.addEventListener('error', () => {
  failed = true;
  quietPause();
  frame.classList.remove('is-ready');
  controls.hidden = true;
  if (status) status.textContent = 'El video no está disponible. Se muestra una imagen de nuestra comunidad.';
 }, { signal });
 const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  inView = entries[0].isIntersecting;
  if (!inView) quietPause();
  else if (!userPaused && !document.hidden) play();
 }, { threshold: 0.01 }) : null;
 observer?.observe(frame);
 document.addEventListener('visibilitychange', () => {
  if (document.hidden) quietPause();
  else if (inView && !userPaused) play();
 }, { signal });
 signal.addEventListener('abort', () => {
  observer?.disconnect();
  quietPause();
  video.removeAttribute('src');
  video.load();
  frame.classList.remove('is-ready');
 }, { once: true });
 sync();
 if (!reducedMotion && !document.hidden && inView) play();
}
