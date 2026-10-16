import mother from '../../identidad/01_comunidad_cristiana_logo_madre_original.png';
import local from '../../identidad/02_ccvs_logo_limpio.png';
import welcomeCommunity from '../assets/photos/comunidad.jpg';
import welcomePulpit from '../assets/photos/pulpito.jpg';
import mainGathering from '../assets/photos/general.jpg';
import visitMeeting from '../assets/photos/visitanos-reunion-img-2764.jpg';
import visitEntrancePortrait from '../assets/photos/IMG_2792.JPG.jpeg';
import visitEntranceCross from '../assets/photos/WhatsApp Image 2026-10-14 at 21.32.51.jpeg';
import communityGroup from '../assets/photos/comunidad-grupo.jpg';
import childrenGroup from '../assets/photos/ninios.jpg';
import ministryChildren from '../assets/photos/niniosss.jpg';
import youthReading from '../assets/photos/jovenes-img-9947.jpg';
import youthGroupLatest from '../assets/photos/WhatsApp Image 2026-10-16 at 02.52.23.jpeg';
import youthPrayer from '../assets/photos/WhatsApp Image 20aaa26-10-14 at 19.57.29.jpeg';
import aboutHistory from '../assets/photos/WhatsApp Image 2026-10-14 at 20.56.07.jpeg';
import historyCover from '../assets/photos/WhatsApp Image 2026-10-14 at 20.20.07.jpeg';
import homeHistory from '../assets/photos/historia-oracion-fe.jpg';
import beliefsBibleStudy from '../assets/photos/WhatsApp Image 2026-10-14 at 19.57.29.jpeg';
import communityGroupMeeting from '../assets/photos/564242379_2960663177654447_8435190360901970176_n.jpg';
import prayerWord from '../assets/photos/Screenshot 2026-10-14 212933.jpg';
import serviceActivity from '../assets/photos/WhatsApp Image 2026-10-12 at 19.56.57.jpeg';
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
      alt: 'Jóvenes compartiendo un encuentro en pequeños grupos dentro de la iglesia',
      position: 'center 55%',
    },
    {
      src: youthGroupLatest,
      alt: 'Grupo de jóvenes reunidos en el salón de la iglesia',
      position: 'center center',
    },
    {
      src: youthPrayer,
      alt: 'Jóvenes orando juntos alrededor de una mesa',
      position: 'center bottom',
    },
  ],
} satisfies { children: Photo; youth: Photo[] };
type PhotoKey = 'hero' | 'about' | 'aboutCover' | 'community' | 'communityMeetings' | 'beliefs' | 'prayerWord' | 'children' | 'youth' | 'service' | 'welcome' | 'welcomeSecondary' | 'welcomeDetail' | 'gathering' | 'visitMeeting' | 'visitEntrance' | 'banner';
export const site = {
  name: 'Comunidad Cristiana Villa Sarmiento', shortName: 'CCVS',
  address: 'Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina',
  locality: 'Villa Sarmiento', region: 'Córdoba', country: 'Argentina',
  description: 'Conocé una congregación que sigue a Jesucristo en Villa Sarmiento: nuestra fe, historia, reuniones y actividades.',
  logos: { mother, local },
  photos: {
    hero: null,
    about: {
      src: aboutHistory,
      alt: 'Salón de la congregación preparado para una reunión, con filas de sillas y una cruz al frente',
      position: 'center',
      mobilePosition: 'center',
    },
    aboutCover: {
      src: historyCover,
      alt: 'La congregación reunida en el salón decorado con banderines',
      position: 'center 52%',
      mobilePosition: 'center 52%',
    },
    community: {
      src: homeHistory,
      alt: 'La congregación reunida en oración frente a la cruz de la iglesia',
      position: 'center',
      mobilePosition: '55% center',
    },
    communityMeetings: {
      src: communityGroupMeeting,
      alt: 'Foto grupal de mujeres y niños en el salón de la iglesia, frente a la cruz',
      position: 'center',
      mobilePosition: 'center',
    },
    beliefs: {
      src: beliefsBibleStudy,
      alt: 'Jóvenes de la comunidad leyendo la Biblia en pequeños grupos, con la cruz al fondo',
      position: 'center',
      mobilePosition: 'center',
    },
    prayerWord: {
      src: prayerWord,
      alt: 'Una mujer comparte la Palabra junto a la cruz iluminada',
      position: 'center 52%',
      mobilePosition: 'center 48%',
    },
    children: {
      src: childrenGroup,
      alt: 'Encuentro de niños con sus coordinadores en una actividad grupal',
      position: 'left center',
      mobilePosition: 'left center',
    },
    youth: {
      src: youthReading,
      alt: 'Jóvenes reunidos durante una actividad con la cruz visible al fondo',
      position: 'center 25%',
      mobilePosition: 'center 25%',
    },
    service: {
      src: serviceActivity,
      alt: 'Grupo de jóvenes al aire libre, varios con chalecos reflectantes',
      position: 'center',
      mobilePosition: 'center',
    },
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
      src: visitEntrancePortrait,
      alt: 'Un miembro de la comunidad comparte un mensaje desde el púlpito',
      position: 'center 38%',
      mobilePosition: 'center 38%',
    },
    gathering: {
      src: mainGathering,
      alt: 'Vista general de la congregación reunida durante el encuentro general',
      position: '40% center',
      mobilePosition: '42% center',
    },
    visitMeeting: {
      src: visitMeeting,
      alt: 'La congregación reunida durante el encuentro general',
      position: 'center 58%',
      mobilePosition: 'center 58%',
    },
    visitEntrance: {
      src: visitEntranceCross,
      alt: 'La cruz iluminada durante una reunión de la comunidad',
      position: 'center 52%',
      mobilePosition: 'center 52%',
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
  about: ['La oración nos reunió.', 'El evangelio nos sigue convocando.'],
  aboutIntro: 'Somos Comunidad Cristiana Villa Sarmiento. Creemos en Jesucristo y buscamos crecer en el conocimiento de las Escrituras, la oración y el servicio a nuestros vecinos.',
  welcome: 'En Cristo, crecemos juntos.',
};
export const pending = ['Fotografías propias autorizadas', 'Logos oficiales transparentes', 'Email/WhatsApp institucional', 'Aprobación de copy, doctrina y términos', 'Dominio y alojamiento'];
