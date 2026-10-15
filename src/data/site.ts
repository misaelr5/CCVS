import mother from '../../identidad/01_comunidad_cristiana_logo_madre_original.png';
import local from '../../identidad/02_ccvs_logo_limpio.png';
import welcomeCommunity from '../assets/photos/comunidad.jpg';
import welcomePulpit from '../assets/photos/pulpito.jpg';
import welcomeGathering from '../assets/photos/reunion.jpg';
import mainGathering from '../assets/photos/general.jpg';
import communityGroup from '../assets/photos/comunidad-grupo.jpg';
import childrenGroup from '../assets/photos/ninios.jpg';
import youthGroup from '../assets/photos/jovenes.jpg';
import ministryChildren from '../assets/photos/niniosss.jpg';
import youthReading from '../assets/photos/WhatsApp Image 2026-10-14 at 19.57.29.jpeg';
import youthTeam from '../assets/photos/WhatsApp Image 2026-10-11 at 00.31.47.jpeg';
import youthPrayer from '../assets/photos/WhatsApp Image 20aaa26-10-14 at 19.57.29.jpeg';
import type { ImageMetadata } from 'astro';
export interface Photo { src: ImageMetadata; alt: string; mobile?: ImageMetadata; position?: string; mobilePosition?: string; }
export const ministryPhotos = {
  children: {
    src: ministryChildren,
    alt: 'Niños compartiendo una actividad con cuadernos y lápices alrededor de una mesa',
    position: 'center 55%',
  },
  youth: [
    {
      src: youthReading,
      alt: 'Jóvenes compartiendo la lectura de la Biblia en pequeños grupos',
      position: 'center 72%',
    },
    {
      src: youthTeam,
      alt: 'Grupo de jóvenes con chalecos reflectantes al aire libre',
      position: 'center',
    },
    {
      src: youthPrayer,
      alt: 'Jóvenes orando juntos alrededor de una mesa',
      position: 'center bottom',
    },
  ],
} satisfies { children: Photo; youth: Photo[] };
type PhotoKey = 'hero' | 'about' | 'community' | 'history' | 'children' | 'youth' | 'service' | 'welcome' | 'welcomeSecondary' | 'welcomeDetail' | 'gathering' | 'banner';
export const site = {
  name: 'Comunidad Cristiana Villa Sarmiento', shortName: 'CCVS',
  address: 'Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina',
  locality: 'Villa Sarmiento', region: 'Córdoba', country: 'Argentina',
  description: 'Conocé una congregación que sigue a Jesucristo en Villa Sarmiento: nuestra fe, historia, reuniones y actividades.',
  logos: { mother, local },
  photos: {
    hero: null,
    about: null,
    community: null,
    history: null,
    children: {
      src: childrenGroup,
      alt: 'Encuentro de niños con sus coordinadores en una actividad grupal',
      position: 'left center',
      mobilePosition: 'left center',
    },
    youth: {
      src: youthGroup,
      alt: 'Jóvenes reunidos durante una actividad en la iglesia',
      position: 'center 52%',
      mobilePosition: 'center 52%',
    },
    service: null,
    welcome: {
      src: welcomeCommunity,
      alt: 'Persona con una gorra bordada durante un encuentro de la comunidad',
      position: 'center 48%',
      mobilePosition: 'center 48%',
    },
    welcomeSecondary: {
      src: welcomePulpit,
      alt: 'Púlpito de Comunidad Cristiana frente a una cruz de madera',
      position: 'center 48%',
      mobilePosition: 'center 48%',
    },
    welcomeDetail: {
      src: welcomeGathering,
      alt: 'Congregación reunida frente al escenario',
      position: 'center 38%',
      mobilePosition: 'center 38%',
    },
    gathering: {
      src: mainGathering,
      alt: 'Vista general de la congregación reunida durante el encuentro principal',
      position: '40% center',
      mobilePosition: '42% center',
    },
    banner: {
      src: communityGroup,
      alt: 'Foto grupal de la comunidad frente al púlpito de la iglesia',
      position: 'center 60%',
      mobilePosition: 'center 60%',
    },
  } satisfies Record<PhotoKey, Photo | null>,
  publicationApproved: false,
};
// Propuestas del encargo V3: no constituyen misión o lemas oficiales.
export const editorial = {
  hero: ['Jesucristo,', 'el camino', 'al Padre.'],
  heroIntro: 'Jesús nos llama a seguirlo. En Villa Sarmiento nos reunimos para aprender su Palabra, orar y acompañarnos en la fe.',
  about: ['Jesús nos reúne.', 'Su Palabra nos guía.', 'Su amor nos mueve a servir.'],
  aboutIntro: 'Somos Comunidad Cristiana Villa Sarmiento. Creemos en Jesucristo y buscamos crecer en el conocimiento de las Escrituras, la oración y el servicio a nuestros vecinos.',
  welcome: 'En Cristo, crecemos juntos.',
};
export const pending = ['Fotografías propias autorizadas', 'Logos oficiales transparentes', 'Pin de ubicación confirmado', 'Email/WhatsApp institucional', 'Aprobación de copy, doctrina y términos', 'Dominio y alojamiento'];
