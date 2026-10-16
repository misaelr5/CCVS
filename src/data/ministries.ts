import type { RegularGatheringId } from './schedule';
interface MinistryBase { id: string; title: string; photo: 'children' | 'youth' | 'service' | 'community' | 'communityMeetings' | 'prayerWord'; }
export type MinistryGroup =
  | (MinistryBase & { periodicity: 'regular'; scheduleId: Exclude<RegularGatheringId, 'principal'>; description: string[]; buttonLabel: string })
  | (MinistryBase & { periodicity: 'programada'; nextDate?: string; intro: string; activities: string[] });
export type RegularMinistry = Extract<MinistryGroup, { periodicity: 'regular' }>;
export type ProgrammedMinistry = Extract<MinistryGroup, { periodicity: 'programada' }>;
export const ministries: MinistryGroup[] = [
  // Propuestas editoriales del usuario: actividades específicas pendientes de validación institucional.
  { id: 'ninos', periodicity: 'regular', title: 'Escuela Bíblica Infantil', photo: 'children', scheduleId: 'ninos', buttonLabel: 'Conocé nuestra Escuela Bíblica', description: [
    'Un espacio especialmente preparado para que los más pequeños conozcan a Jesús y descubran las enseñanzas de la Biblia desde sus primeros años.',
    'A través de historias bíblicas, juegos, canciones y actividades, buscamos sembrar la Palabra de Dios en sus corazones y acompañarlos en su crecimiento espiritual.',
  ] },
  { id: 'jovenes', periodicity: 'regular', title: 'Jóvenes y Adolescentes', photo: 'youth', scheduleId: 'jovenes', buttonLabel: 'Sumate a nuestros encuentros', description: [
    'Un espacio para encontrarnos, compartir la Palabra de Dios y crecer juntos en nuestra relación con Jesucristo.',
    'A través de estudios bíblicos, conversaciones, juegos y actividades, buscamos fortalecer nuestra fe, construir amistades y aprender a vivir conforme a las enseñanzas de Jesús.',
  ] },
  { id: 'vida-de-fe', periodicity: 'regular', title: 'Oración y Palabra', photo: 'prayerWord', scheduleId: 'oracion', buttonLabel: 'Conocé nuestras reuniones', description: [
    'Cada miércoles nos reunimos como iglesia para buscar a Dios en oración, estudiar las Escrituras y compartir nuestras necesidades delante del Señor.',
    'Un tiempo de comunión en el que nos fortalecemos mutuamente en la fe y profundizamos nuestro conocimiento de la Palabra de Dios.',
  ] },
  { id: 'servicio', periodicity: 'programada', title: 'Servir al prójimo.', intro: 'Compartimos el evangelio y ayudamos a nuestros vecinos mediante las actividades de la congregación.', activities: ['Ropero solidario', 'Merendero y ayuda social', 'Evangelismo'], photo: 'service' },
  { id: 'encuentros', periodicity: 'programada', title: 'Caminar juntos en la fe.', intro: 'También hay encuentros para matrimonios, varones y mujeres.', activities: ['Matrimonios', 'Varones', 'Mujeres'], photo: 'communityMeetings' },
];
export const regularMinistries = ministries.filter((item): item is RegularMinistry => item.periodicity === 'regular');
export const programmedMinistries = ministries.filter((item): item is ProgrammedMinistry => item.periodicity === 'programada');
