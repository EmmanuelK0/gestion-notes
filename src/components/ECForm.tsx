import React from 'react';
import type { ECFormData, UniteEnseignement } from '../types';

interface ECFormProps {
  onSubmit: (data: ECFormData) => void;
  ues: UniteEnseignement[];
  initialData?: Partial<ECFormData>;
}

export function ECForm({ onSubmit, ues, initialData }: ECFormProps) {
  const [formData, setFormData] = React.useState<ECFormData>({
    code: initialData?.code || '',
    nom: initialData?.nom || '',
    coefficient: initialData?.coefficient || 1,
    ue_id: initialData?.ue_id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Code EC
        </label>
        <input
          type="text"
          id="code"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="nom"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="coefficient" className="block text-sm font-medium text-gray-700">
          Coefficient
        </label>
        <input
          type="number"
          id="coefficient"
          min="1"
          max="5"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.coefficient}
          onChange={(e) => setFormData({ ...formData, coefficient: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="ue_id" className="block text-sm font-medium text-gray-700">
          UE
        </label>
        <select
          id="ue_id"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.ue_id}
          onChange={(e) => setFormData({ ...formData, ue_id: e.target.value })}
        >
          <option value="">Sélectionner une UE</option>
          {ues.map((ue) => (
            <option key={ue.id} value={ue.id}>
              {ue.code} - {ue.nom}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Enregistrer
      </button>
    </form>
  );
}