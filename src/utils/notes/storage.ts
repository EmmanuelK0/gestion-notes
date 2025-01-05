import type { Note } from '../../types';

const NOTES_STORAGE_KEY = 'notes';

export function loadNotes(): Note[] {
  const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
  return savedNotes ? JSON.parse(savedNotes) : [];
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

export function updateExistingNote(notes: Note[], updatedNote: Note): Note[] {
  return notes.map(note => 
    note.id === updatedNote.id ? { ...note, ...updatedNote, updated_at: new Date() } : note
  );
}

export function findExistingNote(notes: Note[], etudiantId: string, ecId: string, session: 'normale' | 'rattrapage'): Note | undefined {
  return notes.find(note => 
    note.etudiant_id === etudiantId && 
    note.ec_id === ecId && 
    note.session === session
  );
}