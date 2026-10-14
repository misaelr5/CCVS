import motherLogo from '../../identidad/01_comunidad_cristiana_logo_madre_original.png';
import localLogo from '../../identidad/02_ccvs_logo_limpio.png';
import type { ImageMetadata } from 'astro';

export interface Schedule { day: string; time: string; name: string; }
export interface Activity { name: string; category: string; description: string; schedule?: string; }
export interface Faith { title: string; text: string; }
export interface Photo { src: ImageMetadata; alt: string; position?: string; }
export interface ExternalLink { label: string; url: string; }

export const site = {
  name: 'Comunidad Cristiana Villa Sarmiento',
  shortName: 'CCVS',
  location: 'Villa Sarmiento, Córdoba, Argentina',
  address: 'Vélez Sarsfield s/n, Villa Sarmiento, Córdoba',
  description: 'Conocé Comunidad Cristiana Villa Sarmiento: nuestra historia, creencias, actividades y horarios de reunión en Villa Sarmiento, Córdoba.',
  logos: { mother: motherLogo, local: localLogo },
  // Importar aquí fotos propias autorizadas. null conserva la composición editorial.
  photos: { hero: null as Photo | null, community: null as Photo | null },
  externalLinks: [] as ExternalLink[],
  mapUrl: null as string | null,
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros/' },
    { label: 'Ministerios', href: '/ministerios/' },
    { label: 'Visitarnos', href: '/visitanos/' },
  ],
  home: {
    eyebrow: 'Comunidad Cristiana · Villa Sarmiento',
    title: 'Una fe que nos reúne.',
    accent: 'Una comunidad que acompaña.',
    text: 'Nos encontramos para orar, adorar a Dios y compartir la vida. Conocé nuestra comunidad en Villa Sarmiento, Córdoba.',
    welcomeTitle: 'La vida de fe se comparte.',
    welcomeText: 'Somos una congregación local de Comunidad Cristiana. Desde 2005, compartimos el evangelio y desarrollamos una labor espiritual y social en nuestra localidad.',
    communityTitle: 'Crecer juntos. Servir cerca.',
    communityText: 'La oración, el estudio de la Biblia y el servicio a nuestra comunidad forman parte de nuestras actividades.',
  },
  about: {
    title: 'Nuestra comunidad.', accent: 'Una historia compartida.',
    text: 'Somos Comunidad Cristiana Villa Sarmiento. Nuestra orientación doctrinal es Hermanos Libres Renovados y reconocemos la Biblia como única autoridad.',
    identityText: 'Pertenecemos a Comunidad Cristiana. El emblema de la cruz y la paloma representa nuestra identidad madre; CCVS identifica a la congregación local de Villa Sarmiento.',
  },
  ministries: {
    title: 'Compartir la fe.', accent: 'Servir a los demás.',
    text: 'Espacios de encuentro, crecimiento espiritual y ayuda a nuestra comunidad.',
  },
  visit: {
    title: 'Nos encontramos', accent: 'en Villa Sarmiento.',
    text: 'Si querés conocernos, podés acercarte a una de nuestras reuniones. Aquí encontrás los horarios y la dirección.',
    firstVisit: 'Podés elegir una de las reuniones que figuran abajo. Si es tu primera visita, al llegar podés presentarte y consultar sobre las actividades que te interesan.',
  },
  invitation: { title: 'Hay un próximo encuentro.', text: 'Conocé los horarios y acercate a nuestra comunidad.', label: 'Planear mi visita' },
  schedules: [
    { day: 'Domingo', time: '19:30', name: 'Reunión principal' },
    { day: 'Miércoles', time: '21:00', name: 'Oración' },
    { day: 'Sábado', time: '21:00', name: 'Jóvenes' },
    { day: 'Sábado', time: '16:30', name: 'Niños' },
  ] satisfies Schedule[],
  history: [
    { year: '2005', title: 'Un primer encuentro.', text: 'Comienzan las reuniones de oración en el domicilio de Esther Mercado. El grupo busca crecer espiritualmente y compartir el evangelio.' },
    { year: '2008–2012', title: 'Una comunidad que crece.', text: 'La congregación atraviesa una etapa de crecimiento y se reúne en un salón alquilado sobre la calle principal de la localidad.' },
    { year: 'Un salón propio', title: 'Un lugar para reunirnos.', text: 'El municipio dona un terreno y posteriormente se inicia la construcción del salón propio.' },
    { year: '2015', title: 'Autonomía de la congregación.', text: 'El reconocimiento formal de un pastor otorga autonomía a la congregación.' },
    { year: 'Presente', title: 'La historia continúa.', text: 'Al finalizarse el salón, las actividades comienzan a realizarse allí. Continúa la labor espiritual y social en la comunidad.' },
  ],
  faith: [
    { title: 'La Biblia', text: 'Reconocemos la Biblia como única autoridad.' },
    { title: 'Dios Padre, Hijo y Espíritu Santo', text: 'Creemos en Dios Padre, en el Hijo, Jesucristo, y en el Espíritu Santo.' },
    { title: 'La salvación', text: 'Creemos en la salvación por gracia mediante la fe.' },
    { title: 'La obra del Espíritu Santo', text: 'Creemos en la obra del Espíritu Santo.' },
    { title: 'Oración, adoración y santidad', text: 'Reconocemos la importancia de la oración, la adoración y la santidad en la vida de fe.' },
  ] satisfies Faith[],
  activities: [
    { name: 'Oración', category: 'Vida de fe', description: 'Reuniones para compartir la oración.', schedule: 'Miércoles · 21:00' },
    { name: 'Estudio bíblico', category: 'Vida de fe', description: 'Encuentros dedicados al estudio de la Biblia.' },
    { name: 'Evangelismo', category: 'Vida de fe', description: 'Actividades para compartir el evangelio.' },
    { name: 'Niños', category: 'Generaciones', description: 'Actividades para niños de la comunidad.', schedule: 'Sábado · 16:30' },
    { name: 'Jóvenes', category: 'Generaciones', description: 'Encuentros para jóvenes.', schedule: 'Sábado · 21:00' },
    { name: 'Ropero solidario', category: 'Servicio comunitario', description: 'Una de nuestras actividades de ayuda social.' },
    { name: 'Merendero y ayuda social', category: 'Servicio comunitario', description: 'Servicio y acompañamiento a la comunidad.' },
    { name: 'Matrimonios', category: 'Encuentros', description: 'Reuniones de matrimonios.' },
    { name: 'Varones y mujeres', category: 'Encuentros', description: 'Reuniones de varones y reuniones de mujeres.' },
    { name: 'Consejería espiritual', category: 'Acompañamiento', description: 'Un espacio de consejería espiritual.' },
  ] satisfies Activity[],
  links: [
    { label: 'Conocé nuestra comunidad', detail: 'Historia y creencias', href: '/nosotros/' },
    { label: 'Horarios de reuniones', detail: 'Cuándo nos encontramos', href: '/visitanos/#horarios' },
    { label: 'Planear tu visita', detail: 'Dirección y primera visita', href: '/visitanos/' },
    { label: 'Ministerios y actividades', detail: 'Vida de fe y servicio', href: '/ministerios/' },
    { label: 'Ir al sitio', detail: 'Comunidad Cristiana Villa Sarmiento', href: '/' },
  ],
};

// Las URLs ausentes no generan botones. Evita protocolos ejecutables en contenido editable.
export function isHttpsUrl(value: string): boolean {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}
