import React from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import type { ElementConstitutif, UniteEnseignement } from '../types';

interface ECListProps {
  ecs: ElementConstitutif[];
  ues: UniteEnseignement[];
  onEdit?: (ec: ElementConstitutif) => void;
  onDelete?: (ec: ElementConstitutif) => void;
}

export function ECList({ ecs, ues, onEdit, onDelete }: ECListProps) {
  // Grouper les ECs par UE
  const ecsByUE = React.useMemo(() => {
    return ecs.reduce((acc, ec) => {
      const ue = ues.find(u => u.id === ec.ue_id);
      if (ue) {
        if (!acc.has(ue.id)) {
          acc.set(ue.id, { ue, ecs: [] });
        }
        acc.get(ue.id)!.ecs.push(ec);
      }
      return acc;
    }, new Map<string, { ue: UniteEnseignement; ecs: ElementConstitutif[] }>());
  }, [ecs, ues]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Éléments Constitutifs (ECs)</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {Array.from(ecsByUE.values()).map(({ ue, ecs }) => (
          <div key={ue.id} className="p-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">
              {ue.code} - {ue.nom}
            </h3>
            
            <div className="space-y-2">
              {ecs.map((ec) => (
                <div 
                  key={ec.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <div>
                    <span className="font-medium">{ec.code}</span>
                    <span className="text-gray-600 ml-2">{ec.nom}</span>
                    <span className="text-gray-500 ml-2">
                      (Coefficient: {ec.coefficient})
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(ec)}
                        className="p-1 text-indigo-600 hover:text-indigo-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(ec)}
                        className="p-1 text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}