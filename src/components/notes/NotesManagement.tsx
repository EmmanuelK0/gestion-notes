import React from 'react';
import { NoteForm } from './NoteForm';
import { NoteList } from './NoteList';
import { SemestreResults } from './SemestreResults';
import { useNotesManager } from '../../hooks/useNotesManager';
import type { Etudiant, ElementConstitutif, NoteFormData, UniteEnseignement, Note } from '../../types';

interface NotesManagementProps {
  etudiants: Etudiant[];
  ecs: ElementConstitutif[];
  ues: UniteEnseignement[];
}

export function NotesManagement({ etudiants, ecs, ues }: NotesManagementProps) {
  const { notes, addNote, updateNote, deleteNote } = useNotesManager();
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>('');
  const [editingNote, setEditingNote] = React.useState<Note | null>(null);

  const selectedStudentNotes = React.useMemo(() => 
    selectedStudentId ? notes.filter(note => note.etudiant_id === selectedStudentId) : notes,
    [notes, selectedStudentId]
  );

  const handleSubmit = (data: NoteFormData) => {
    try {
      if (editingNote) {
        updateNote(editingNote.id, data);
        setEditingNote(null);
      } else {
        addNote(data);
      }
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Une erreur est survenue lors de l\'enregistrement de la note.');
    }
  };

  const handleDelete = (note: Note) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      try {
        deleteNote(note.id);
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Une erreur est survenue lors de la suppression de la note.');
      }
    }
  };

  const uesBySemestre = React.useMemo(() => {
    const map = new Map<number, UniteEnseignement[]>();
    ues.forEach(ue => {
      const semUes = map.get(ue.semestre) || [];
      map.set(ue.semestre, [...semUes, ue]);
    });
    return map;
  }, [ues]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingNote ? 'Modifier la note' : 'Saisir une note'}
          </h3>
          <NoteForm
            onSubmit={handleSubmit}
            onCancel={() => setEditingNote(null)}
            initialData={editingNote || undefined}
            etudiants={etudiants}
            ecs={ecs}
          />
        </div>
        <div>
          <div className="mb-4">
            <label htmlFor="etudiant-filter" className="block text-sm font-medium text-gray-700">
              Filtrer par étudiant
            </label>
            <select
              id="etudiant-filter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              <option value="">Tous les étudiants</option>
              {etudiants.map((etudiant) => (
                <option key={etudiant.id} value={etudiant.id}>
                  {etudiant.numero_etudiant} - {etudiant.nom} {etudiant.prenom}
                </option>
              ))}
            </select>
          </div>
          <NoteList
            notes={selectedStudentNotes}
            etudiants={etudiants}
            ecs={ecs}
            onEdit={setEditingNote}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {selectedStudentId && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Résultats par semestre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from(uesBySemestre.entries()).map(([semestre, semUes]) => (
              <SemestreResults
                key={semestre}
                semestre={semestre}
                ues={semUes}
                ecs={ecs}
                notes={selectedStudentNotes}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}