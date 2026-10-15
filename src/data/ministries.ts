import type { RegularGatheringId } from './schedule';
interface MinistryBase { id: string; title: string; intro: string; activities: string[]; photo: 'children' | 'youth' | 'service' | 'community' | 'prayerWord'; }
export type MinistryGroup =
  | (MinistryBase & { periodicity: 'regular'; scheduleId: Exclude<RegularGatheringId, 'principal'> })
  | (MinistryBase & { periodicity: 'programada'; nextDate?: string });
export type RegularMinistry = Extract<MinistryGroup, { periodicity: 'regular' }>;
export type ProgrammedMinistry = Extract<MinistryGroup, { periodicity: 'programada' }>;
export const ministries: MinistryGroup[] = [
  { id: 'ninos', periodicity: 'regular', title: 'Niños', intro: 'Acompañamos a los niños en las actividades de nuestra congregación.', activities: ['Actividades para niños'], photo: 'children', scheduleId: 'ninos' },
  { id: 'jovenes', periodicity: 'regular', title: 'Jóvenes', intro: 'Los jóvenes se reúnen para compartir la fe y crecer en el conocimiento de Jesús.', activities: ['Reuniones de jóvenes'], photo: 'youth', scheduleId: 'jovenes' },
  { id: 'vida-de-fe', periodicity: 'regular', title: 'Oración y Palabra.', intro: 'Nos reunimos para orar, estudiar la Biblia y acompañarnos en la fe.', activities: ['Oración', 'Estudios bíblicos', 'Consejería espiritual'], photo: 'prayerWord', scheduleId: 'oracion' },
  { id: 'servicio', periodicity: 'programada', title: 'Servir al prójimo.', intro: 'Compartimos el evangelio y ayudamos a nuestros vecinos mediante las actividades de la congregación.', activities: ['Ropero solidario', 'Merendero y ayuda social', 'Evangelismo'], photo: 'service' },
  { id: 'encuentros', periodicity: 'programada', title: 'Caminar juntos en la fe.', intro: 'También hay encuentros para matrimonios, varones y mujeres.', activities: ['Matrimonios', 'Varones', 'Mujeres'], photo: 'community' },
];
export const regularMinistries = ministries.filter((item): item is RegularMinistry => item.periodicity === 'regular');
export const programmedMinistries = ministries.filter((item): item is ProgrammedMinistry => item.periodicity === 'programada');
