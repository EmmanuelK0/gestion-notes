import type { Note, EC } from '../types';

export function getMeilleurNote(notes: Note[]): Note | null {
  if (notes.length === 0) return null;
  
  const noteNormale = notes.find(n => n.session === 'normale');
  const noteRattrapage = notes.find(n => n.session === 'rattrapage');
  
  if (!noteNormale) return noteRattrapage;
  if (!noteRattrapage) return noteNormale;
  
  return noteRattrapage.note > noteNormale.note ? noteRattrapage : noteNormale;
}

export function calculerMoyenneEC(notes: Note[], ec: EC): number {
  const meilleurNote = getMeilleurNote(notes);
  return meilleurNote ? meilleurNote.note : 0;
}

export function formatNote(note: number): string {
  return note.toFixed(2);
}