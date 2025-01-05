import type { Note, EC, UE } from '../../types';

export function getMeilleurNote(notes: Note[]): Note | null {
  if (notes.length === 0) return null;
  
  const noteNormale = notes.find(n => n.session === 'normale');
  const noteRattrapage = notes.find(n => n.session === 'rattrapage');
  
  if (!noteNormale) return noteRattrapage;
  if (!noteRattrapage) return noteNormale;
  
  return noteRattrapage.note > noteNormale.note ? noteRattrapage : noteNormale;
}

export function getNotesParEC(notes: Note[], ec: EC): Note[] {
  return notes.filter(note => note.ec_id === ec.id);
}

export function getNotesParUE(notes: Note[], ue: UE, ecs: EC[]): Note[] {
  const ecsUE = ecs.filter(ec => ec.ue_id === ue.id);
  return notes.filter(note => 
    ecsUE.some(ec => ec.id === note.ec_id)
  );
}

export function getNotesParEtudiant(notes: Note[], etudiantId: string): Note[] {
  return notes.filter(note => note.etudiant_id === etudiantId);
}