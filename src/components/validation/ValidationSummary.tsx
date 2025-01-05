import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { SemestreValidation } from '../../utils/validation/types';
import { peutPasserAnnéeSuivante } from '../../utils/validation/rules';

interface ValidationSummaryProps {
  validationsSemestre: SemestreValidation[];
  niveau: 'L1' | 'L2' | 'L3';
}

export function ValidationSummary({ validationsSemestre, niveau }: ValidationSummaryProps) {
  const totalECTS = validationsSemestre.reduce((sum, sem) => sum + sem.ectsAcquis, 0);
  const peutPasser = peutPasserAnnéeSuivante(totalECTS, niveau);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Synthèse de validation - {niveau}
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {validationsSemestre.map(semestre => (
            <div key={semestre.semestre} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Semestre {semestre.semestre}</span>
                <span className="text-sm">
                  Moyenne: {semestre.moyenne}/20
                </span>
              </div>
              <div className="text-sm text-gray-600">
                ECTS acquis: {semestre.ectsAcquis}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
          <span className="font-medium">Total ECTS acquis</span>
          <span className="text-lg font-semibold text-indigo-600">
            {totalECTS} ECTS
          </span>
        </div>

        <div className={`p-4 rounded-lg ${
          peutPasser ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center space-x-2">
            {peutPasser ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-green-700">
                  Passage en année supérieure autorisé
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700">
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