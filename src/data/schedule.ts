export interface Gathering { id: string; day: string; time: string; title: string; }
export const schedule: Gathering[] = [
  { id: 'principal', day: 'Domingo', time: '19:30', title: 'Reunión principal' },
  { id: 'oracion', day: 'Miércoles', time: '21:00', title: 'Oración' },
  { id: 'jovenes', day: 'Sábado', time: '21:00', title: 'Jóvenes' },
  { id: 'ninos', day: 'Sábado', time: '16:30', title: 'Niños' },
];
