import mother from '../../identidad/01_comunidad_cristiana_logo_madre_original.png';
import local from '../../identidad/02_ccvs_logo_limpio.png';
import type { ImageMetadata } from 'astro';
export interface Photo { src: ImageMetadata; alt: string; mobile?: ImageMetadata; position?: string; mobilePosition?: string; }
export const site = {
  name: 'Comunidad Cristiana Villa Sarmiento', shortName: 'CCVS',
  address: 'Vélez Sarsfield s/n, Villa Sarmiento, Córdoba, Argentina',
  locality: 'Villa Sarmiento', region: 'Córdoba', country: 'Argentina',
  description: 'Conocé la historia, las creencias, las actividades y los horarios de Comunidad Cristiana Villa Sarmiento, Córdoba.',
  logos: { mother, local },
  photos: { hero: null, about: null, community: null, history: null, children: null, youth: null, service: null } as Record<'hero' | 'about' | 'community' | 'history' | 'children' | 'youth' | 'service', Photo | null>,
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
export const pending = ['Fotografías propias autorizadas', 'Logos oficiales transparentes', 'Mapa y contactos oficiales', 'Aprobación de copy y doctrina', 'Dominio y alojamiento'];
