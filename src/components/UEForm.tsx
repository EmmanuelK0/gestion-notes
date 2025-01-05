import React from 'react';
import type { UEFormData } from '../types';

interface UEFormProps {
  onSubmit: (data: UEFormData) => void;
  initialData?: Partial<UEFormData>;
}

export function UEForm({ onSubmit, initialData }: UEFormProps) {
  const [formData, setFormData] = React.useState<UEFormData>({
    code: initialData?.code || '',
    nom: initialData?.nom || '',
    credits_ects: initialData?.credits_ects || 1,
    semestre: initialData?.semestre || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Code UE
        </label>
        <input
          type="text"
          id="code"
          pattern="UE[0-9]{2}"
          required
          placeholder="UE11"
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
        <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
          Crédits ECTS
        </label>
        <input
          type="number"
          id="credits"
          min="1"
          max="30"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.credits_ects}
          onChange={(e) => setFormData({ ...formData, credits_ects: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="semestre" className="block text-sm font-medium text-gray-700">
          Semestre
        </label>
        <select
          id="semestre"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.semestre}
          onChange={(e) => setFormData({ ...formData, semestre: parseInt(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              S{num}
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