import type { Note, EC, UE } from '../../types';

export function calculerMoyenneEC(notes: Note[], ec: EC): number {
  const meilleurNote = getMeilleurNote(notes.filter(n => n.ec_id === ec.id));
  return meilleurNote ? meilleurNote.note : 0;
}

export function calculerMoyenneUE(notes: Note[], ecs: EC[], ue: UE): number {
  let sommeCoefficients = 0;
  let sommeNotesPonderees = 0;

  const ecsUE = ecs.filter(ec => ec.ue_id === ue.id);
  
  ecsUE.forEach(ec => {
    const moyenneEC = calculerMoyenneEC(notes, ec);
    sommeCoefficients += ec.coefficient;
    sommeNotesPonderees += moyenneEC * ec.coefficient;
  });

  return sommeCoefficients > 0 ? Number((sommeNotesPonderees / sommeCoefficients).toFixed(2)) : 0;
}

export function getMeilleurNote(notes: Note[]): Note | null {
  if (notes.length === 0) return null;
  
  const noteNormale = notes.find(n => n.session === 'normale');
  const noteRattrapage = notes.find(n => n.session === 'rattrapage');
  
  if (!noteNormale) return noteRattrapage;
  if (!noteRattrapage) return noteNormale;
  
  return noteRattrapage.note > noteNormale.note ? noteRattrapage : noteNormale;
}