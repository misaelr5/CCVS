import { initializeScrollMotion } from './scroll-motion';
import { initializeHeroVideo } from './hero-video';
let pageController: AbortController | undefined;
let observer: IntersectionObserver | undefined;
let restoreMenu: (() => void) | undefined;
let initializedBody: HTMLElement | undefined;
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let pageTransition: ViewTransition | undefined;
// La cancelación de una transición rechaza ready aunque el cambio de página sea válido.
// Consumir únicamente AbortError; otros fallos siguen reportándose.
const nativeTransition = document.startViewTransition?.bind(document);
if (nativeTransition) {
 document.startViewTransition = (callback) => {
  const transition = nativeTransition(callback);
  pageTransition = transition;
  const release = () => { if (pageTransition === transition) pageTransition = undefined; };
  void transition.finished.then(release, release);
  void transition.ready.catch((error: unknown) => {
   if (!(error instanceof DOMException && error.name === 'AbortError')) console.error('Error al preparar la transición visual', error);
  });
  return transition;
 };
}
function cleanup() { restoreMenu?.(); restoreMenu = undefined; pageController?.abort(); observer?.disconnect(); observer = undefined; }

function initialize(force = false) {
 if (!force && initializedBody === document.body) return;
 cleanup();
 initializedBody = document.body;
 pageController = new AbortController();
 const { signal } = pageController;
 initializeHeroVideo(signal, motion.matches);
 const dialog = document.querySelector<HTMLDialogElement>('#navigation-dialog');
 const open = document.querySelector<HTMLButtonElement>('.menu-open');
 const closeButton = document.querySelector<HTMLButtonElement>('.menu-close');
 if (dialog && open && closeButton) {
  let closing = false, generation = 0;
  let menuAnimations: Animation[] = [];
  const cancelAnimations = () => { menuAnimations.forEach(animation => animation.cancel()); menuAnimations = []; };
  const setExpanded = (expanded: boolean) => {
   open.setAttribute('aria-expanded', String(expanded));
   open.setAttribute('aria-label', expanded ? 'Cerrar menú desplegable' : 'Abrir menú');
   closeButton.classList.toggle('is-active', expanded);
  };
  const finishClose = (returnFocus: boolean) => {
   generation++; closing = false; cancelAnimations();
   dialog.classList.remove('is-closing'); setExpanded(false);
   if (dialog.open) dialog.close();
   if (returnFocus) open.focus({ preventScroll:true });
  };
  const close = (animated = true, returnFocus = true) => {
   if (!dialog.open) return;
   if (!animated || motion.matches) { finishClose(returnFocus); return; }
   if (closing) return;
   closing = true;
   const epoch = ++generation;
   cancelAnimations(); setExpanded(false); dialog.classList.add('is-closing');
   const animation = dialog.animate([
    { clipPath:'inset(0 0 0 0 round 18px)', transform:'translateY(0) scale(1)' },
    { clipPath:'inset(0 0 100% 0 round 18px)', transform:'translateY(-8px) scale(.985)' },
   ], { duration:300, easing:'cubic-bezier(.4,0,.2,1)', fill:'forwards' });
   menuAnimations.push(animation);
   void animation.finished.catch(()=>{}).then(()=> { if (epoch === generation) finishClose(returnFocus); });
  };
  restoreMenu = () => close(false, false);
  open.addEventListener('click', () => {
   if (dialog.open && !closing) { close(); return; }
   generation++; closing = false; cancelAnimations(); dialog.classList.remove('is-closing');
   // No modal: no backdrop, body fijo, inert ni trampa de foco.
   if (!dialog.open) {
    const openingScroll = { left:scrollX, top:scrollY };
    dialog.scrollTop = 0;
    dialog.show();
    // show() enfoca el diálogo; conservar la posición antes del siguiente paint.
    window.scrollTo({ ...openingScroll, behavior:'instant' });
   }
   setExpanded(true); closeButton.focus({ preventScroll:true });
   if (!motion.matches) {
    menuAnimations.push(dialog.animate([
     { clipPath:'inset(0 0 100% 0 round 18px)', transform:'translateY(-10px) scale(.98)' },
     { clipPath:'inset(0 0 0 0 round 18px)', transform:'translateY(0) scale(1)' },
    ], { duration:400, easing:'cubic-bezier(.22,1,.36,1)' }));
    const reveal = (element: HTMLElement, delay: number) => menuAnimations.push(element.animate([
     { clipPath:'inset(0 0 100% 0)', translate:'0 12px' },
     { clipPath:'inset(0 0 0 0)', translate:'0 0' },
    ], { duration:300, delay, easing:'cubic-bezier(.22,1,.36,1)', fill:'backwards' }));
    dialog.querySelectorAll<HTMLElement>('.menu-groups h2').forEach((element,index)=>reveal(element,70+index*50));
    const links = [...dialog.querySelectorAll<HTMLElement>('.menu-groups a')];
    links.forEach((element,index)=>reveal(element,100+index*60));
    const social = dialog.querySelector<HTMLElement>('.menu-social');
    if (social) reveal(social,100+links.length*60);
   }
  }, { signal });
  closeButton.addEventListener('click',()=>close(),{ signal });
  dialog.addEventListener('cancel',event=> { event.preventDefault(); close(); },{ signal });
  dialog.addEventListener('click',event=> {
   if (event.target instanceof Element && event.target.closest('a')) close(false, false);
  },{ signal });
  document.addEventListener('keydown',event=> {
   if (event.key === 'Escape' && dialog.open) { event.preventDefault(); close(); }
  },{ signal });
  document.addEventListener('pointerdown',event=> {
   if (event.target instanceof Node && !dialog.contains(event.target) && !open.contains(event.target)) close(true, false);
  },{ signal });
  document.addEventListener('focusin',event=> {
   if (event.target instanceof Node && !dialog.contains(event.target) && !open.contains(event.target)) close(false, false);
  },{ signal });

 }
 document.querySelectorAll<HTMLButtonElement>('.belief-trigger').forEach(button => {
  const panel=document.getElementById(button.getAttribute('aria-controls')??''); if(!panel) return;
  const article=button.closest('article');
  button.setAttribute('aria-expanded','false'); panel.hidden=true;
  panel.inert=true;
  article?.classList.remove('is-expanded');
  article?.classList.add('is-collapsed');
  const symbol=button.querySelector('.belief-symbol'); if(symbol)symbol.textContent='+';
  button.addEventListener('click',()=>{
   const expanded=button.getAttribute('aria-expanded')==='true';
   const opening=!expanded;
   button.setAttribute('aria-expanded',String(opening));
   article?.classList.toggle('is-expanded',opening);
   if(symbol)symbol.textContent=opening?'−':'+';
   panel.getAnimations().forEach(animation=>animation.cancel());
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){panel.hidden=!opening;panel.inert=!opening;return;}
   if(opening){panel.hidden=false;panel.inert=false;}
   const from=opening?0:panel.getBoundingClientRect().height;
   const to=opening?panel.scrollHeight:0;
   const animation=panel.animate([{height:`${from}px`,opacity:opening?0:1},{height:`${to}px`,opacity:opening?1:0}],{duration:480,easing:'cubic-bezier(.22,1,.36,1)'});
   if(!opening)panel.inert=true;
   animation.onfinish=()=>{panel.hidden=!opening;panel.inert=!opening;};
  },{signal});
 });
 // Visibles por defecto: las animaciones no son necesarias para mostrar contenido.
 const animateItem = (item: HTMLElement, index: number, layered = false) => {
  if (item.dataset.entryMotion) return;
  // The page itself is already entering. Keep its text/photos settled rather
  // than layering another entrance over the live destination snapshot.
  if (pageTransition) { item.dataset.entryMotion = 'settled'; return; }
  const rect = item.getBoundingClientRect();
  const image = item.matches('.photo-frame, .about-media, .identity-marks, .map-reserve');
  const horizontal = image && innerWidth > 700;
  const x = horizontal ? (rect.x + rect.width / 2 < innerWidth / 2 ? -24 : 24) : 0;
  const y = horizontal ? 0 : layered ? 18 : 24;
  item.dataset.entryMotion = horizontal ? (x < 0 ? 'left' : 'right') : 'up';
  const title = item.matches('h1');
  const frames: Keyframe[] = title ? [
   // Keep the heading painted throughout its entrance. A fully clipped first
   // frame can flash when it overlaps Astro's page transition.
   { translate:'0 32px' },
   { translate:'0 0' },
  ] : [{ opacity:0, translate:`${x}px ${y}px` }, { opacity:1, translate:'0 0' }];
  const animation = item.animate(frames,{duration:title?950:680,delay:index*80,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
  signal.addEventListener('abort',()=>animation.cancel(),{once:true});
 };
 const entranceItems = (element: HTMLElement) => {
  if (element.matches('[data-reveal="collage"]')) return [...element.querySelectorAll<HTMLElement>('[data-layer]')];
  if (element.matches('.links-hub')) return [...element.querySelectorAll<HTMLElement>(':scope > img, :scope > h1, :scope > p, :scope nav > a')];
  if (element.matches('.about-cover')) return [...element.querySelectorAll<HTMLElement>('.about-media, .about-copy > h1, .editorial-statement, .about-intro')];
  if (element.matches('.legal-page')) return [...element.querySelectorAll<HTMLElement>(':scope > .kicker, :scope > h1, :scope > .legal-notice, :scope > .legal-updated')];
  if (element.matches('.beliefs')) return [...element.querySelectorAll<HTMLElement>(':scope > .beliefs-heading > :is(h1,h2), :scope > .beliefs-intro, :scope > .belief-list > article')];
  if (element.matches('.ministries-showcase')) return [...element.querySelectorAll<HTMLElement>(':scope > h2')];
  if (element.matches('.ministry-feature')) return [...element.querySelectorAll<HTMLElement>(':scope > .photo-frame, :scope > .text-image-copy > *')];
  if (element.matches('.home-schedule')) return [...element.querySelectorAll<HTMLElement>(':scope > h2, .schedule-feature, .schedule-showcase-intro, .schedule--interactive li')];
  return [...element.querySelectorAll<HTMLElement>(':scope > h1, :scope > h2, :scope > h3, :scope > p, :scope > .photo-frame, :scope > .map-reserve, :scope > .identity-marks, :scope > a, :scope > .schedule > li, :scope > .belief-list > article, :scope > .section-navigation > a, :scope > .visit-essential, :scope > .text-image-copy > *, :scope > .welcome-copy > h2, :scope > .welcome-copy > p, :scope > .welcome-copy > a, :scope > .principal-copy > *, :scope > .visit-layout-copy > *')].filter(item=>!item.hidden);
 };
 const targets = [...document.querySelectorAll<HTMLElement>('main > section:not(.editorial-hero), [data-reveal], .legal-page > section, .history-chapter, .feature-pair > a')];
 if (!motion.matches && 'IntersectionObserver' in window) {
  const title=document.querySelector<HTMLElement>('main h1');
  if(title) animateItem(title,0);
  const hero=document.querySelector<HTMLElement>('.hero-copy');
  if(hero && !hero.dataset.revealed) {
   hero.dataset.revealed='true';
   [...hero.querySelectorAll<HTMLElement>(':scope > h1, :scope > p, :scope > a')].forEach((item,index)=>animateItem(item,index));
  }
  observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const element=entry.target as HTMLElement; observer?.unobserve(element);
    if(element.dataset.revealed)return; element.dataset.revealed='true'; element.classList.add('is-revealed');
    const children=entranceItems(element), items=children.length?children:[element];
    items.slice(0,12).forEach((item,index)=>animateItem(item,index,element.matches('[data-reveal="collage"]')));
   });
  },{threshold:0.08,rootMargin:'0px 0px -20px 0px'});
  targets.forEach(target=> { if(!target.dataset.revealed)observer?.observe(target); });
 }
 initializeScrollMotion(signal, motion.matches);
 document.documentElement.dataset.uiReady='true';
}
function startAtTop() {
 // Los destinos con # conservan el salto solicitado a historia, horarios, etc.
 if (!location.hash) window.scrollTo({ left:0, top:0, behavior:'instant' });
}
history.scrollRestoration = 'manual';
document.addEventListener('astro:after-swap', startAtTop);
document.addEventListener('astro:page-load',()=> { startAtTop(); initialize(); });
window.addEventListener('pageshow', startAtTop);
document.addEventListener('astro:before-preparation',()=>restoreMenu?.());
document.addEventListener('astro:before-swap',()=>{cleanup();initializedBody=undefined;});
motion.addEventListener('change',()=>initialize(true));
startAtTop();
initialize(); // fallback="none" usa carga completa y no emite astro:page-load.
