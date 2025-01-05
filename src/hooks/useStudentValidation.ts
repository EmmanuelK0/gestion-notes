import { useMemo } from 'react';
import type { Etudiant, Note, EC, UE } from '../types';
import { calculerMoyenneUE } from '../utils/validation/calculations';
import { validerSemestre } from '../utils/validation/rules';
import type { SemestreValidation } from '../utils/validation/types';

export function useStudentValidation(
  student: Etudiant | null,
  notes: Note[],
  ecs: EC[],
  ues: UE[]
) {
  const studentNotes = useMemo(() => {
    if (!student) return [];
    return notes.filter(note => note.etudiant_id === student.id);
  }, [notes, student]);

  const uesBySemestre = useMemo(() => {
    return ues.reduce((acc, ue) => {
      const semUes = acc.get(ue.semestre) || [];
      acc.set(ue.semestre, [...semUes, ue]);
      return acc;
    }, new Map<number, UE[]>());
  }, [ues]);

  const validationsSemestre = useMemo(() => {
    if (!student) return [];
    
    return Array.from(uesBySemestre.entries()).map(([semestre, semUes]) => {
      const moyennesUE = new Map(
        semUes.map(ue => [ue.id, calculerMoyenneUE(studentNotes, ecs, ue)])
      );
      const validation = validerSemestre(moyennesUE, semUes);
      return {
        semestre,
        ...validation,
        ues: semUes.map(ue => ({
          ue,
          moyenne: moyennesUE.get(ue.id) || 0,
          estValidee: (moyennesUE.get(ue.id) || 0) >= 10,
          ectsAcquis: (moyennesUE.get(ue.id) || 0) >= 10 ? ue.credits_ects : 0
        }))
      };
    });
  }, [student, uesBySemestre, studentNotes, ecs]);

  return {
    studentNotes,
    validationsSemestre,
    uesBySemestre
  };
}