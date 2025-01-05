import React from 'react';
import type { Etudiant } from '../../types';

interface StudentSelectorProps {
  etudiants: Etudiant[];
  onSelect: (student: Etudiant) => void;
}

export function StudentSelector({ etudiants, onSelect }: StudentSelectorProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Sélectionner un étudiant
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {etudiants.map(etudiant => (
          <button
            key={etudiant.id}
            onClick={() => onSelect(etudiant)}
            className="flex flex-col p-4 border rounded-lg hover:border-indigo-500 hover:shadow-md transition-all"
          >
            <span className="font-medium text-gray-900">
              {etudiant.nom} {etudiant.prenom}
            </span>
            <span className="text-sm text-gray-500">
              {etudiant.numero_etudiant}
            </span>
            <span className="text-sm text-indigo-600 mt-1">
              {etudiant.niveau}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}