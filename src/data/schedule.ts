export interface Gathering { id: string; periodicity: 'regular'; day: string; time: string; title: string; href: string; }
export const schedule = [
  { id: 'principal', periodicity: 'regular', day: 'Domingo', time: '19:30', title: 'Reunión general', href: '/visitanos/#horarios' },
  { id: 'oracion', periodicity: 'regular', day: 'Miércoles', time: '21:00', title: 'Oración', href: '/ministerios/#vida-de-fe' },
  { id: 'jovenes', periodicity: 'regular', day: 'Sábado', time: '21:00', title: 'Jóvenes', href: '/ministerios/#jovenes' },
  { id: 'ninos', periodicity: 'regular', day: 'Sábado', time: '16:30', title: 'Niños', href: '/ministerios/#ninos' },
] as const satisfies readonly Gathering[];
export type RegularGatheringId = (typeof schedule)[number]['id'];
