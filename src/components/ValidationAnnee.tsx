import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import type { SemestreValidation } from '../utils/validation/ueValidation';
import { peutPasserAnnéeSuivante } from '../utils/validation/ueValidation';

interface ValidationAnneeProps {
  semestres: SemestreValidation[];
  niveau: 'L1' | 'L2' | 'L3';
}

export function ValidationAnnee({ semestres, niveau }: ValidationAnneeProps) {
  const totalECTS = semestres.reduce((sum, sem) => sum + sem.ectsAcquis, 0);
  const peutPasser = peutPasserAnnéeSuivante(totalECTS, niveau);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Validation {niveau}
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium text-gray-900">Total ECTS Acquis</span>
          <span className="text-lg font-semibold text-indigo-600">
            {totalECTS} ECTS
          </span>
        </div>

        <div className={`p-4 rounded-lg ${
          peutPasser ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center space-x-3">
            {peutPasser ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <span className="text-green-700 font-medium">
                  Passage en année supérieure autorisé
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <span className="text-red-700 font-medium">
                  ECTS insuffisants pour passer en année supérieure
                </span>
              </>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {niveau === 'L1' && 'Il faut 60 ECTS pour passer en L2'}
            {niveau === 'L2' && 'Il faut 120 ECTS pour passer en L3'}
            {niveau === 'L3' && 'Il faut 180 ECTS pour valider la licence'}
          </p>
        </div>
      </div>
    </div>
  );
}