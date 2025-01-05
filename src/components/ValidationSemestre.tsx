import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { SemestreValidation } from '../utils/validation/ueValidation';

interface ValidationSemestreProps {
  validation: SemestreValidation;
}

export function ValidationSemestre({ validation }: ValidationSemestreProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Semestre {validation.semestre}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              Moyenne: {validation.moyenne}/20
            </span>
            {validation.estValide ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {validation.ues.map((ueValidation) => (
            <div
              key={ueValidation.ue.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">
                  {ueValidation.ue.code} - {ueValidation.ue.nom}
                </h4>
                <p className="text-sm text-gray-600">
                  {ueValidation.ue.credits_ects} ECTS
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">
                  {ueValidation.moyenne}/20
                </span>
                {ueValidation.estValidee ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">ECTS Acquis:</span>
            <span className="text-lg font-semibold text-indigo-600">
              {validation.ectsAcquis} ECTS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}