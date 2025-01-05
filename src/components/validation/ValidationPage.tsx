import React from 'react';
import { FileText } from 'lucide-react';
import { StudentSelector } from './StudentSelector';
import { StudentInfo } from './StudentInfo';
import { UEValidationTable } from './UEValidationTable';
import { ValidationSummary } from './ValidationSummary';
import { useStudentValidation } from '../../hooks/useStudentValidation';
import { useNotesManager } from '../../hooks/useNotesManager';
import type { Etudiant, EC, UE } from '../../types';

interface ValidationPageProps {
  etudiants: Etudiant[];
  ues: UE[];
  ecs: EC[];
}

export function ValidationPage({ etudiants, ues, ecs }: ValidationPageProps) {
  const [selectedStudent, setSelectedStudent] = React.useState<Etudiant | null>(null);
  const [selectedSemestre, setSelectedSemestre] = React.useState<number>(1);
  const { notes } = useNotesManager();

  const {
    studentNotes,
    validationsSemestre,
    uesBySemestre
  } = useStudentValidation(selectedStudent, notes, ecs, ues);

  // Mettre à jour le semestre sélectionné quand on change d'étudiant
  React.useEffect(() => {
    if (uesBySemestre.size > 0) {
      setSelectedSemestre(Math.min(...Array.from(uesBySemestre.keys())));
    }
  }, [selectedStudent, uesBySemestre]);

  const handleGeneratePDF = () => {
    console.log('Génération du PDF...');
  };

  if (!selectedStudent) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Validation des UEs et de l'Année
        </h2>
        <StudentSelector 
          etudiants={etudiants} 
          onSelect={setSelectedStudent} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Validation des UEs et de l'Année
        </h2>
        <button
          onClick={handleGeneratePDF}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FileText className="h-4 w-4 mr-2" />
          Générer le rapport PDF
        </button>
      </div>

      <StudentInfo 
        student={selectedStudent} 
        validationsSemestre={validationsSemestre} 
      />

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="semestre" className="block text-sm font-medium text-gray-700">
            Semestre:
          </label>
          <select
            id="semestre"
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedSemestre}
            onChange={(e) => setSelectedSemestre(parseInt(e.target.value))}
          >
            {Array.from(uesBySemestre.keys()).map(sem => (
              <option key={sem} value={sem}>Semestre {sem}</option>
            ))}
          </select>
        </div>

        <UEValidationTable
          ues={uesBySemestre.get(selectedSemestre) || []}
          notes={studentNotes}
          ecs={ecs}
        />
      </div>

      <ValidationSummary 
        validationsSemestre={validationsSemestre}
        niveau={selectedStudent.niveau}
      />
    </div>
  );
}