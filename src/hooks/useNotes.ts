import { useState, useEffect } from 'react';
import type { Note, NoteFormData } from '../types';
import { loadNotes, saveNotes, findExistingNote, updateExistingNote } from '../utils/notes/storage';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (data: NoteFormData) => {
    const existingNote = findExistingNote(notes, data.etudiant_id, data.ec_id, data.session);

    if (existingNote) {
      const updatedNote = {
        ...existingNote,
        note: data.note,
        date_evaluation: data.date_evaluation,
        updated_at: new Date()
      };
      setNotes(updateExistingNote(notes, updatedNote));
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      };
      setNotes(prev => [...prev, newNote]);
    }
  };

  const updateNote = (id: string, data: Partial<NoteFormData>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...data, updated_at: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote
  };
}