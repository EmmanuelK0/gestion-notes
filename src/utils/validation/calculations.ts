import type { Note, EC, UE } from '../../types';
import { getMeilleurNote } from '../notes';

export function calculerMoyenneUE(notes: Note[], ecs: EC[], ue: UE): number {
  const ecsUE = ecs.filter(ec => ec.ue_id === ue.id);
  let sommeCoefficients = 0;
  let sommeNotesPonderees = 0;

  ecsUE.forEach(ec => {
    const notesEC = notes.filter(n => n.ec_id === ec.id);
    const meilleurNote = getMeilleurNote(notesEC);
    if (meilleurNote) {
      sommeCoefficients += ec.coefficient;
      sommeNotesPonderees += meilleurNote.note * ec.coefficient;
    }
  });

  return sommeCoefficients > 0 ? Number((sommeNotesPonderees / sommeCoefficients).toFixed(2)) : 0;
}

export function calculerMoyenneSemestre(moyennesUE: Map<string, number>, ues: UE[]): number {
  const totalCredits = ues.reduce((sum, ue) => sum + ue.credits_ects, 0);
  const sommeMoyennesPonderees = ues.reduce((sum, ue) => {
    const moyenne = moyennesUE.get(ue.id) || 0;
    return sum + moyenne * ue.credits_ects;
  }, 0);

  return Number((sommeMoyennesPonderees / totalCredits).toFixed(2));
}

export function calculerECTSAcquis(moyennesUE: Map<string, number>, ues: UE[]): number {
  return ues.reduce((sum, ue) => {
    const moyenne = moyennesUE.get(ue.id) || 0;
    return sum + (moyenne >= 10 ? ue.credits_ects : 0);
  }, 0);
}