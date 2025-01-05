import React from 'react';
import type { NoteFormData, Etudiant, ElementConstitutif } from '../../types';

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void;
  onCancel?: () => void;
  etudiants: Etudiant[];
  ecs: ElementConstitutif[];
  initialData?: Partial<NoteFormData>;
}

export function NoteForm({ onSubmit, onCancel, etudiants, ecs, initialData }: NoteFormProps) {
  const [formData, setFormData] = React.useState<NoteFormData>({
    etudiant_id: initialData?.etudiant_id || '',
    ec_id: initialData?.ec_id || '',
    note: initialData?.note || 0,
    session: initialData?.session || 'normale',
    date_evaluation: initialData?.date_evaluation || new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        etudiant_id: '',
        ec_id: '',
        note: 0,
        session: 'normale',
        date_evaluation: new Date(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="etudiant" className="block text-sm font-medium text-gray-700">
          Étudiant
        </label>
        <select
          id="etudiant"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.etudiant_id}
          onChange={(e) => setFormData({ ...formData, etudiant_id: e.target.value })}
        >
          <option value="">Sélectionner un étudiant</option>
          {etudiants.map((etudiant) => (
            <option key={etudiant.id} value={etudiant.id}>
              {etudiant.numero_etudiant} - {etudiant.nom} {etudiant.prenom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ec" className="block text-sm font-medium text-gray-700">
          Élément Constitutif
        </label>
        <select
          id="ec"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.ec_id}
          onChange={(e) => setFormData({ ...formData, ec_id: e.target.value })}
        >
          <option value="">Sélectionner un EC</option>
          {ecs.map((ec) => (
            <option key={ec.id} value={ec.id}>
              {ec.code} - {ec.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
          Note
        </label>
        <input
          type="number"
          id="note"
          min="0"
          max="20"
          step="0.25"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: parseFloat(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="session" className="block text-sm font-medium text-gray-700">
          Session
        </label>
        <select
          id="session"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.session}
          onChange={(e) => setFormData({ ...formData, session: e.target.value as 'normale' | 'rattrapage' })}
        >
          <option value="normale">Session Normale</option>
          <option value="rattrapage">Session de Rattrapage</option>
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date d'évaluation
        </label>
        <input
          type="date"
          id="date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.date_evaluation.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, date_evaluation: new Date(e.target.value) })}
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Mettre à jour' : 'Enregistrer'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}