export interface MinistryGroup { id: string; title: string; intro: string; activities: string[]; photo: 'children' | 'youth' | 'service' | 'community'; scheduleId?: string; }
export const ministries: MinistryGroup[] = [
  { id: 'ninos', title: 'Niños', intro: 'Acompañamos a los niños en las actividades de nuestra congregación.', activities: ['Actividades para niños'], photo: 'children', scheduleId: 'ninos' },
  { id: 'jovenes', title: 'Jóvenes', intro: 'Los jóvenes se reúnen para compartir la fe y crecer en el conocimiento de Jesús.', activities: ['Reuniones de jóvenes'], photo: 'youth', scheduleId: 'jovenes' },
  { id: 'vida-de-fe', title: 'Oración y Palabra.', intro: 'Nos reunimos para orar, estudiar la Biblia y acompañarnos en la fe.', activities: ['Oración', 'Estudios bíblicos', 'Consejería espiritual'], photo: 'community', scheduleId: 'oracion' },
  { id: 'servicio', title: 'Servir al prójimo.', intro: 'Compartimos el evangelio y ayudamos a nuestros vecinos mediante las actividades de la congregación.', activities: ['Ropero solidario', 'Merendero y ayuda social', 'Evangelismo'], photo: 'service' },
  { id: 'encuentros', title: 'Caminar juntos en la fe.', intro: 'También hay encuentros para matrimonios, varones y mujeres.', activities: ['Matrimonios', 'Varones', 'Mujeres'], photo: 'community' },
];
