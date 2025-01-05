import React from 'react';
import type { Etudiant } from '../../types';
import type { SemestreValidation } from '../../utils/validation/types';

interface StudentInfoProps {
  student: Etudiant;
  validationsSemestre: SemestreValidation[];
}

export function StudentInfo({ student, validationsSemestre }: StudentInfoProps) {
  const totalECTS = validationsSemestre.reduce((sum, sem) => sum + sem.ectsAcquis, 0);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Nom complet</label>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {student.nom} {student.prenom}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Numéro étudiant</label>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {student.numero_etudiant}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Niveau actuel</label>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {student.niveau}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Crédits acquis</label>
          <p className="mt-1 text-lg font-medium text-indigo-600">
            {totalECTS} ECTS
          </p>
        </div>
      </div>
    </div>
  );
}