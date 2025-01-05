import type { Note, Etudiant, EC } from '../../types';

export interface StudentNotesSummary {
  etudiant: Etudiant;
  notes: Note[];
  totalECs: number;
  completedECs: number;
}

export function groupNotesByStudent(notes: Note[], etudiants: Etudiant[]): Map<string, Note[]> {
  const notesByStudent = new Map<string, Note[]>();
  
  etudiants.forEach(etudiant => {
    const studentNotes = notes.filter(note => note.etudiant_id === etudiant.id);
    notesByStudent.set(etudiant.id, studentNotes);
  });
  
  return notesByStudent;
}

export function getStudentNotesSummary(
  etudiant: Etudiant,
  notes: Note[],
  ecs: EC[]
): StudentNotesSummary {
  const studentNotes = notes.filter(note => note.etudiant_id === etudiant.id);
  const completedECs = new Set(studentNotes.map(note => note.ec_id)).size;
  
  return {
    etudiant,
    notes: studentNotes,
    totalECs: ecs.length,
    completedECs
  };
}

export function validateStudentNotes(notes: Note[], ecs: EC[]): boolean {
  const notedECs = new Set(notes.map(note => note.ec_id));
  return ecs.every(ec => notedECs.has(ec.id));
}