export interface Link { label: string; href: string; }
export const navigation: Link[] = [{ label: 'Inicio', href: '/' }, { label: 'Nosotros', href: '/nosotros/' }, { label: 'Ministerios', href: '/ministerios/' }, { label: 'Visitarnos', href: '/visitanos/' }];
export const groups = [
  { title: 'La iglesia', links: [navigation[0], navigation[1], { label: 'Historia', href: '/nosotros/#historia' }, { label: 'Qué creemos', href: '/nosotros/#creencias' }] },
  { title: 'Participá', links: [navigation[2], { label: 'Horarios', href: '/visitanos/#horarios' }, navigation[3]] },
  { title: 'Conectate', links: [{ label: 'Todos los enlaces', href: '/links/' }] },
];
export const hubLinks: Link[] = [navigation[0], { label: 'Horarios y cómo visitarnos', href: '/visitanos/' }, navigation[1], navigation[2]];
export const externalLinks: Link[] = [];
export const mapUrl: string | null = null;
export function isHttpsUrl(value: string) { try { return new URL(value).protocol === 'https:'; } catch { return false; } }
