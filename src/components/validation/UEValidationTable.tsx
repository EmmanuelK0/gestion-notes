import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { UE, Note, EC } from '../../types';
import { calculerMoyenneUE } from '../../utils/validation/calculations';

interface UEValidationTableProps {
  ues: UE[];
  notes: Note[];
  ecs: EC[];
}

export function UEValidationTable({ ues, notes, ecs }: UEValidationTableProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code UE
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Moyenne
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ECTS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ues.map(ue => {
            const moyenne = calculerMoyenneUE(notes, ecs, ue);
            const estValidee = moyenne >= 10;

            return (
              <tr key={ue.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ue.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ue.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {moyenne.toFixed(2)}/20
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    estValidee 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {estValidee ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Validée
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1" />
                        Non validée
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ue.credits_ects}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}