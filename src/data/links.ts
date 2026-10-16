export interface Link { label: string; href: string; icon?: 'instagram' | 'facebook' | 'youtube' | 'map'; }
export const navigation: Link[] = [{ label: 'Inicio', href: '/' }, { label: 'Nuestra historia', href: '/nosotros/' }, { label: 'Reuniones', href: '/ministerios/' }, { label: 'Visitarnos', href: '/visitanos/' }];
export const groups = [
  { title: 'La iglesia', links: [navigation[0], navigation[1], { label: 'Qué creemos', href: '/lo-que-creemos/' }] },
  { title: 'Participá', links: [navigation[2], { label: 'Horarios', href: '/visitanos/#horarios' }] },
  { title: 'Conectate', links: [{ label: 'Todos los enlaces', href: '/links/' }] },
];
export const hubLinks: Link[] = [{ label: 'Visitá nuestra iglesia', href: '/visitanos/' }, { label: 'Horarios de reuniones', href: '/visitanos/#horarios' }, { label: 'Conocé nuestra historia', href: '/nosotros/#historia' }, navigation[2]];
export const externalLinks: Link[] = [
 { label: 'Instagram', href: 'https://www.instagram.com/jovenesccvs/', icon: 'instagram' },
 { label: 'Facebook', href: 'https://www.facebook.com/comunidadcristiana.villasarmiento/', icon: 'facebook' },
 { label: 'Youtube', href: 'https://www.youtube.com/@comunidadcristianavillasar9819/videos', icon: 'youtube' },
];
export const suppliedMapUrl = 'https://share.google/72tcJRTtkSLqOezwT';
// Se habilita cuando se confirme el destino, sin inventar coordenadas.
export const mapUrl: string | null = null;
export function isHttpsUrl(value: string) { try { return new URL(value).protocol === 'https:'; } catch { return false; } }
