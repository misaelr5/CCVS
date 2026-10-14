export interface MinistryGroup { id: string; title: string; intro: string; activities: string[]; photo: 'children' | 'youth' | 'service' | 'community'; scheduleId?: string; }
export const ministries: MinistryGroup[] = [
  { id: 'ninos', title: 'Niños', intro: 'Actividades para niños de nuestra comunidad.', activities: ['Actividades para niños'], photo: 'children', scheduleId: 'ninos' },
  { id: 'jovenes', title: 'Jóvenes', intro: 'Encuentros para jóvenes en Villa Sarmiento.', activities: ['Reuniones de jóvenes'], photo: 'youth', scheduleId: 'jovenes' },
  { id: 'vida-de-fe', title: 'Crecer en la fe.', intro: 'La oración y el estudio de la Biblia forman parte de nuestra vida como congregación.', activities: ['Oración', 'Estudios bíblicos', 'Consejería espiritual'], photo: 'community', scheduleId: 'oracion' },
  { id: 'servicio', title: 'Servir a nuestra comunidad.', intro: 'Compartimos el evangelio y desarrollamos actividades de ayuda social.', activities: ['Ropero solidario', 'Merendero y ayuda social', 'Evangelismo'], photo: 'service' },
  { id: 'encuentros', title: 'Compartir la vida.', intro: 'También realizamos encuentros de matrimonios, varones y mujeres.', activities: ['Matrimonios', 'Varones', 'Mujeres'], photo: 'community' },
];
