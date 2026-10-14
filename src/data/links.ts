export interface Link { label: string; href: string; icon?: 'instagram' | 'facebook' | 'youtube' | 'map'; }
export const navigation: Link[] = [{ label: 'Inicio', href: '/' }, { label: 'Nosotros', href: '/nosotros/' }, { label: 'Ministerios', href: '/ministerios/' }, { label: 'Visitarnos', href: '/visitanos/' }];
export const groups = [
  { title: 'La iglesia', links: [navigation[0], navigation[1], { label: 'Historia', href: '/nosotros/#historia' }, { label: 'Qué creemos', href: '/nosotros/#creencias' }] },
  { title: 'Participá', links: [navigation[2], { label: 'Horarios', href: '/visitanos/#horarios' }, navigation[3]] },
  { title: 'Conectate', links: [{ label: 'Todos los enlaces', href: '/links/' }] },
];
export const hubLinks: Link[] = [{ label: 'Visitá nuestra iglesia', href: '/visitanos/' }, { label: 'Horarios de reuniones', href: '/visitanos/#horarios' }, { label: 'Conocé nuestra historia', href: '/nosotros/#historia' }, navigation[2]];
export const externalLinks: Link[] = [
 { label: 'Instagram — Jóvenes CCVS', href: 'https://www.instagram.com/jovenesccvs/', icon: 'instagram' },
 { label: 'Facebook — Comunidad Cristiana Villa Sarmiento', href: 'https://www.facebook.com/comunidadcristiana.villasarmiento/', icon: 'facebook' },
 { label: 'YouTube — Comunidad Cristiana Villa Sarmiento', href: 'https://www.youtube.com/@comunidadcristianavillasar9819/videos', icon: 'youtube' },
];
export const suppliedMapUrl = 'https://share.google/72tcJRTtkSLqOezwT';
// Se habilita cuando se confirme el destino, sin inventar coordenadas.
export const mapUrl: string | null = null;
export function isHttpsUrl(value: string) { try { return new URL(value).protocol === 'https:'; } catch { return false; } }
