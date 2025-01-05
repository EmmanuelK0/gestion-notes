import { useState, useEffect, useMemo } from 'react';
import type { Note, Etudiant, EC, NoteFormData } from '../types';
import { loadNotes, saveNotes } from '../utils/notes/storage';
import { groupNotesByStudent, getStudentNotesSummary } from '../utils/notes/studentNotes';

export function useStudentNotes(etudiants: Etudiant[], ecs: EC[]) {
  const [notes, setNotes] = useState<Note[]>(loadNotes());
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const notesByStudent = useMemo(() => 
    groupNotesByStudent(notes, etudiants), [notes, etudiants]
  );

  const studentsSummary = useMemo(() => 
    etudiants.map(etudiant => 
      getStudentNotesSummary(etudiant, notes, ecs)
    ), [etudiants, notes, ecs]
  );

  const selectedStudentNotes = useMemo(() => 
    selectedStudentId ? notesByStudent.get(selectedStudentId) || [] : [], 
    [notesByStudent, selectedStudentId]
  );

  const addNote = (data: NoteFormData) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    };
    setNotes(prev => [...prev, newNote]);
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
    notesByStudent,
    studentsSummary,
    selectedStudentId,
    selectedStudentNotes,
    setSelectedStudentId,
    addNote,
    updateNote,
    deleteNote
  };
}