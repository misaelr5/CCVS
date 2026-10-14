import mother from '../../identidad/01_comunidad_cristiana_logo_madre_original.png';
import local from '../../identidad/02_ccvs_logo_limpio.png';
import welcomeCommunity from '../assets/photos/comunidad.jpg';
import welcomePulpit from '../assets/photos/pulpito.jpg';
import welcomeGathering from '../assets/photos/reunion.jpg';
import mainGathering from '../assets/photos/general.jpg';
import communityGroup from '../assets/photos/comunidad-grupo.jpg';
import childrenGroup from '../assets/photos/ninios.jpg';
import youthGroup from '../assets/photos/jovenes.jpg';
import type { ImageMetadata } from 'astro';
export interface Photo { src: ImageMetadata; alt: string; mobile?: ImageMetadata; position?: string; mobilePosition?: string; }
type PhotoKey = 'hero' | 'about' | 'community' | 'history' | 'children' | 'youth' | 'service' | 'welcome' | 'welcomeSecondary' | 'welcomeDetail' | 'gathering' | 'banner';
export const site = {
  name: 'Comunidad Cristiana Villa Sarmiento', shortName: 'CCVS',
  address: 'Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina',
  locality: 'Villa Sarmiento', region: 'Córdoba', country: 'Argentina',
  description: 'Conocé la historia, las creencias, las actividades y los horarios de Comunidad Cristiana Villa Sarmiento, Córdoba.',
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
  hero: ['Una comunidad.', 'Una misma fe.', 'Jesús en el centro.'],
  heroIntro: 'Somos Comunidad Cristiana Villa Sarmiento. Nos reunimos para compartir la fe, crecer espiritualmente y servir a nuestra comunidad.',
  about: ['Una comunidad.', 'Una fe en Jesucristo.', 'Una vida para servir.'],
  aboutIntro: 'Somos Comunidad Cristiana Villa Sarmiento, una congregación que busca compartir el evangelio de Jesucristo, crecer en la fe y servir a nuestra comunidad.',
  welcome: 'La fe se vive en comunidad.',
};
export const pending = ['Fotografías propias autorizadas', 'Logos oficiales transparentes', 'Pin de ubicación confirmado', 'Email/WhatsApp institucional', 'Aprobación de copy, doctrina y términos', 'Dominio y alojamiento'];
