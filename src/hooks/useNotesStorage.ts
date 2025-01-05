import { useState, useEffect } from 'react';
import type { Note } from '../types';

const NOTES_STORAGE_KEY = 'student_notes';

export function useNotesStorage() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error('Erreur lors du chargement des notes:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des notes:', error);
    }
  }, [notes]);

  return {
    notes,
    setNotes
  };
}