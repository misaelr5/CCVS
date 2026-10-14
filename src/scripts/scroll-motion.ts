// Solo se actualizan marcas decorativas cercanas al viewport; nunca el texto.
export function initializeScrollMotion(signal: AbortSignal, reducedMotion: boolean) {
 const objects = [...document.querySelectorAll<HTMLElement | SVGSVGElement>('main [data-scroll-object], main svg.editorial-mark')]
  .filter(element => element.matches('[data-scroll-object]') || !element.closest('[data-scroll-object]'));
 objects.forEach(element => element.style.removeProperty('transform'));
 if (reducedMotion || !('IntersectionObserver' in window)) return;

 const visible = new Set<HTMLElement | SVGSVGElement>();
 let frame = 0;
 const update = () => {
  frame = 0;
  // Leer primero la geometría y escribir después evita layouts por cada objeto.
  const positions = [...visible].map(element => {
   const bounds = element.parentElement!.getBoundingClientRect();
   const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - bounds.top - bounds.height / 2) / innerHeight));
   return { element, progress };
  });
  positions.forEach(({ element, progress }) => {
   element.style.transform = `translate3d(0, ${(-progress * 24).toFixed(2)}px, 0) rotate(${(progress * 8).toFixed(2)}deg)`;
  });
 };
 const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   const element = entry.target as HTMLElement | SVGSVGElement;
   if (entry.isIntersecting) visible.add(element);
   else visible.delete(element);
  });
  schedule();
 }, { rootMargin:'100px' });
 objects.forEach(element => observer.observe(element));
 window.addEventListener('scroll', schedule, { passive:true, signal });
 window.addEventListener('resize', schedule, { passive:true, signal });
 signal.addEventListener('abort', () => { observer.disconnect(); cancelAnimationFrame(frame); }, { once:true });
}
