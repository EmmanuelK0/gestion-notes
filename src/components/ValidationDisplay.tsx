import React from 'react';
import { calculerMoyenneUE, validerUE, validerSemestre, peutPasserAnnéeSuivante } from '../utils/validation/ueValidation';
import type { UE, Note, EC, Etudiant } from '../types';

interface ValidationDisplayProps {
  etudiant: Etudiant;
  ues: UE[];
  ecs: EC[];
  notes: Note[];
}

export function ValidationDisplay({ etudiant, ues, ecs, notes }: ValidationDisplayProps) {
  // Grouper les UEs par semestre
  const uesBySemestre = React.useMemo(() => {
    return ues.reduce((acc, ue) => {
      const semestre = ue.semestre;
      if (!acc.has(semestre)) {
        acc.set(semestre, []);
      }
      acc.get(semestre)!.push(ue);
      return acc;
    }, new Map<number, UE[]>());
  }, [ues]);

  // Calculer les moyennes des UEs
  const moyennesUE = React.useMemo(() => {
    return ues.reduce((acc, ue) => {
      const ecsUE = ecs.filter(ec => ec.ue_id === ue.id);
      const notesUE = notes.filter(note => 
        ecsUE.some(ec => ec.id === note.ec_id)
      );
      acc.set(ue.id, calculerMoyenneUE(notesUE, ecsUE));
      return acc;
    }, new Map<string, number>());
  }, [ues, ecs, notes]);

  // Calculer les validations par semestre
  const validationsSemestre = React.useMemo(() => {
    return Array.from(uesBySemestre.entries()).map(([semestre, uesSemestre]) => {
      return validerSemestre(uesSemestre, moyennesUE);
    });
  }, [uesBySemestre, moyennesUE]);

  // Calculer le total des ECTS acquis
  const totalECTS = React.useMemo(() => {
    return validationsSemestre.reduce((total, validation) => {
      return total + validation.ectsAcquis;
    }, 0);
  }, [validationsSemestre]);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Résultats de {etudiant.prenom} {etudiant.nom}
        </h2>
        
        <div className="space-y-4">
          {validationsSemestre.map((validation) => (
            <div key={validation.semestre} className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Semestre {validation.semestre}
              </h3>
              
              <div className="space-y-3">
                {validation.ues.map((ueValidation) => (
                  <div 
                    key={ueValidation.ue.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <div>
                      <span className="font-medium">{ueValidation.ue.code}</span>
                      <span className="text-gray-600 ml-2">{ueValidation.ue.nom}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm">
                        Moyenne: {ueValidation.moyenne.toFixed(2)}/20
                      </span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        ueValidation.estValidee 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ueValidation.estValidee ? 'Validée' : 'Non validée'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Moyenne du semestre:</span>
                  <span className="text-lg font-semibold">
                    {validation.moyenne.toFixed(2)}/20
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">ECTS acquis:</span>
                  <span className="text-lg font-semibold text-indigo-600">
                    {validation.ectsAcquis} ECTS
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total ECTS acquis:</span>
            <span className="text-xl font-semibold text-indigo-600">
              {totalECTS} ECTS
            </span>
          </div>
          
          <div className="mt-4">
            <div className={`p-4 rounded-lg ${
              peutPasserAnnéeSuivante(totalECTS, etudiant.niveau)
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}>
              {peutPasserAnnéeSuivante(totalECTS, etudiant.niveau)
                ? '✓ Passage en année supérieure autorisé'
                : '✗ ECTS insuffisants pour passer en année supérieure'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}