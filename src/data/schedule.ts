export interface Gathering { id: string; day: string; time: string; title: string; href: string; }
export const schedule: Gathering[] = [
  { id: 'principal', day: 'Domingo', time: '19:30', title: 'Reunión principal', href: '/visitanos/#horarios' },
  { id: 'oracion', day: 'Miércoles', time: '21:00', title: 'Oración', href: '/ministerios/#vida-de-fe' },
  { id: 'jovenes', day: 'Sábado', time: '21:00', title: 'Jóvenes', href: '/ministerios/#jovenes' },
  { id: 'ninos', day: 'Sábado', time: '16:30', title: 'Niños', href: '/ministerios/#ninos' },
];
