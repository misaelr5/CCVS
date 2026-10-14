export interface HistoryEntry { period: string; title: string; text: string; note?: string; }
export const history: HistoryEntry[] = [
  { period: '2005', title: 'El comienzo, en una casa.', text: 'Comienzan las reuniones de oración en la casa de Esther Mercado, con el deseo de crecer espiritualmente y compartir la fe.' },
  { period: 'Sin fecha confirmada', title: 'Un terreno para la comunidad.', text: 'El municipio realizó una donación de terreno previamente al período de reuniones en el salón alquilado. Después comenzó la edificación del salón propio.', note: 'La fecha exacta de la donación y de la terminación del salón no está confirmada.' },
  { period: '2008–2012', title: 'Una etapa de crecimiento.', text: 'La congregación crece y se reúne en un salón alquilado sobre la calle principal de la localidad.' },
  { period: '2015', title: 'Autonomía como congregación.', text: 'El reconocimiento formal de un pastor otorga autonomía a la congregación.' },
  { period: 'Posteriormente / actualidad', title: 'La historia continúa.', text: 'Una vez concluida la construcción, se trasladan las actividades al edificio propio. Continúa el servicio espiritual y social en la comunidad.' },
];
