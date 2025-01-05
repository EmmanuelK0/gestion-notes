import { useCallback } from 'react';
import type { Note, NoteFormData } from '../types';
import { useNotesStorage } from './useNotesStorage';

export function useNotesManager() {
  const { notes, setNotes } = useNotesStorage();

  const addNote = useCallback((data: NoteFormData) => {
    setNotes(prevNotes => {
      // Vérifier si une note existe déjà pour cet étudiant/EC/session
      const existingNoteIndex = prevNotes.findIndex(
        note => note.etudiant_id === data.etudiant_id &&
               note.ec_id === data.ec_id &&
               note.session === data.session
      );

      const newNote: Note = {
        id: crypto.randomUUID(),
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      };

      if (existingNoteIndex !== -1) {
        // Mettre à jour la note existante
        const updatedNotes = [...prevNotes];
        updatedNotes[existingNoteIndex] = {
          ...updatedNotes[existingNoteIndex],
          note: data.note,
          date_evaluation: data.date_evaluation,
          updated_at: new Date()
        };
        return updatedNotes;
      }

      // Ajouter une nouvelle note
      return [...prevNotes, newNote];
    });
  }, [setNotes]);

  const updateNote = useCallback((id: string, changes: Partial<NoteFormData>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, ...changes, updated_at: new Date() }
          : note
      )
    );
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, [setNotes]);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote
  };
}