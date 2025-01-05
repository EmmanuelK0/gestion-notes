import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Note, Etudiant, ElementConstitutif } from '../../types';

interface NoteListProps {
  notes: Note[];
  etudiants: Etudiant[];
  ecs: ElementConstitutif[];
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
}

export function NoteList({ notes, etudiants, ecs, onEdit, onDelete }: NoteListProps) {
  // Grouper les notes par étudiant
  const notesByStudent = React.useMemo(() => {
    return notes.reduce((acc, note) => {
      const etudiant = etudiants.find(e => e.id === note.etudiant_id);
      if (etudiant) {
        if (!acc.has(etudiant.id)) {
          acc.set(etudiant.id, { etudiant, notes: [] });
        }
        acc.get(etudiant.id)!.notes.push(note);
      }
      return acc;
    }, new Map<string, { etudiant: Etudiant; notes: Note[] }>());
  }, [notes, etudiants]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Notes des Étudiants</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {Array.from(notesByStudent.values()).map(({ etudiant, notes }) => (
          <div key={etudiant.id} className="p-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">
              {etudiant.numero_etudiant} - {etudiant.nom} {etudiant.prenom}
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">EC</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Session</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notes.map((note) => {
                    const ec = ecs.find(e => e.id === note.ec_id);
                    return (
                      <tr key={note.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {ec ? `${ec.code} - ${ec.nom}` : 'EC inconnu'}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {note.note}/20
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {note.session}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {note.date_evaluation.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {onEdit && (
                              <button
                                onClick={() => onEdit(note)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={() => onDelete(note)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}