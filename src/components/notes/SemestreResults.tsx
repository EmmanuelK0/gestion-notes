import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Note, EC, UE } from '../../types';
import { calculerMoyenneUE } from '../../utils/notes/calculations';
import { estUEValidee, validerSemestre } from '../../utils/notes/validation';

interface SemestreResultsProps {
  semestre: number;
  ues: UE[];
  ecs: EC[];
  notes: Note[];
}

export function SemestreResults({ semestre, ues, ecs, notes }: SemestreResultsProps) {
  const moyennesUE = React.useMemo(() => {
    return new Map(
      ues.map(ue => [ue.id, calculerMoyenneUE(notes, ecs, ue)])
    );
  }, [ues, ecs, notes]);

  const validation = React.useMemo(() => {
    return validerSemestre(moyennesUE, ues);
  }, [moyennesUE, ues]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Semestre {semestre}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
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

      <div className="p-4 space-y-4">
        {ues.map(ue => {
          const moyenne = moyennesUE.get(ue.id) || 0;
          const validee = estUEValidee(moyenne);
          
          return (
            <div key={ue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">
                  {ue.code} - {ue.nom}
                </h4>
                <p className="text-sm text-gray-600">
                  {ue.credits_ects} ECTS
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {moyenne}/20
                </span>
                {validee ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          );
        })}

        <div className="mt-4 pt-4 border-t border-gray-200">
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