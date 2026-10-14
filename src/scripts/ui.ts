let pageController: AbortController | undefined;
let observer: IntersectionObserver | undefined;
let restoreMenu: (() => void) | undefined;
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
// La cancelación de una transición rechaza ready aunque el cambio de página sea válido.
// Consumir únicamente AbortError; otros fallos siguen reportándose.
const nativeTransition = document.startViewTransition?.bind(document);
if (nativeTransition) {
 document.startViewTransition = (callback) => {
  const transition = nativeTransition(callback);
  void transition.ready.catch((error: unknown) => {
   if (!(error instanceof DOMException && error.name === 'AbortError')) console.error('Error al preparar la transición visual', error);
  });
  return transition;
 };
}
function cleanup() { restoreMenu?.(); restoreMenu = undefined; pageController?.abort(); observer?.disconnect(); observer = undefined; }

function initialize() {
 cleanup();
 pageController = new AbortController();
 const { signal } = pageController;
 const dialog = document.querySelector<HTMLDialogElement>('#navigation-dialog');
 const open = document.querySelector<HTMLButtonElement>('.menu-open');
 const closeButton = document.querySelector<HTMLButtonElement>('.menu-close');
 if (dialog && open && closeButton) {
  let scrollPosition = 0, locked = false;
  const prior = { position:'', top:'', width:'' };
  const restore = () => {
   if (!locked) return; locked = false;
   document.body.style.position = prior.position; document.body.style.top = prior.top; document.body.style.width = prior.width;
   window.scrollTo(0, scrollPosition); open.setAttribute('aria-expanded','false'); open.focus({preventScroll:true});
  };
  const close = () => { if (dialog.open) dialog.close(); restore(); };
  restoreMenu = close;
  open.addEventListener('click', () => {
   if (dialog.open) return;
   scrollPosition = scrollY; prior.position = document.body.style.position; prior.top = document.body.style.top; prior.width = document.body.style.width;
   dialog.showModal(); locked = true; open.setAttribute('aria-expanded','true');
   document.body.style.position = 'fixed'; document.body.style.top = `-${scrollPosition}px`; document.body.style.width = '100%'; closeButton.focus();
  }, {signal});
  closeButton.addEventListener('click',close,{signal});
  dialog.addEventListener('close',restore,{signal});
  dialog.addEventListener('cancel',event => {event.preventDefault();close();},{signal});
  dialog.addEventListener('click', event => {if(event.target === dialog || (event.target instanceof Element && event.target.closest('a'))) close();},{signal});
  dialog.addEventListener('keydown',event => {
   if(event.key !== 'Tab') return;
   const items = [...dialog.querySelectorAll<HTMLAnchorElement|HTMLButtonElement>('a,button')], first=items[0], last=items[items.length-1];
   if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
  },{signal});
 }
 document.querySelectorAll<HTMLButtonElement>('.belief-trigger').forEach(button => {
  const panel=document.getElementById(button.getAttribute('aria-controls')??''); if(!panel) return;
  button.setAttribute('aria-expanded','false'); panel.hidden=true;
  const symbol=button.querySelector('.belief-symbol'); if(symbol)symbol.textContent='+';
  button.addEventListener('click',()=>{
   const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));panel.hidden=expanded;
   if(symbol)symbol.textContent=expanded?'+':'−';
  },{signal});
 });
 // Visibles por defecto: si el script/observer falla, nada queda oculto.
 const targets = [...document.querySelectorAll<HTMLElement>('main > section:not(.editorial-hero), [data-reveal]')];
 if (!motion.matches && 'IntersectionObserver' in window) {
  observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const element=entry.target as HTMLElement; observer?.unobserve(element);
    if(element.dataset.revealed)return; element.dataset.revealed='true'; element.classList.add('is-revealed');
    const layered=element.matches('[data-reveal="collage"]');
    const children=layered? [...element.querySelectorAll<HTMLElement>('[data-layer]')] : [...element.querySelectorAll<HTMLElement>(':scope > h2, :scope > p, :scope > .text-image-copy, :scope > .photo-frame')];
    const items=children.length?children:[element];
    items.slice(0,6).forEach((item,index)=> {
     const animation=item.animate([{opacity:0,translate:'0 24px'},{opacity:1,translate:'0 0'}],{duration:750,delay:index*100,easing:'cubic-bezier(.22,1,.36,1)'});
     signal.addEventListener('abort',()=>animation.cancel(),{once:true});
    });
   });
  },{threshold:0.08,rootMargin:'0px 0px -20px 0px'});
  targets.forEach(target=> { if(!target.dataset.revealed)observer?.observe(target); });
 }
 document.documentElement.dataset.uiReady='true';
}
document.addEventListener('astro:page-load',initialize);
document.addEventListener('astro:before-preparation',()=>restoreMenu?.());
document.addEventListener('astro:before-swap',cleanup);
motion.addEventListener('change',initialize);
initialize(); // fallback="none" usa carga completa y no emite astro:page-load.
