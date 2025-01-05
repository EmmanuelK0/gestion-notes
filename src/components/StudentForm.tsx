import React from 'react';
import type { Etudiant } from '../types';

interface StudentFormProps {
  onSubmit: (data: Omit<Etudiant, 'id' | 'created_at' | 'updated_at'>) => void;
  initialData?: Partial<Etudiant>;
}

export function StudentForm({ onSubmit, initialData }: StudentFormProps) {
  const [formData, setFormData] = React.useState({
    numero_etudiant: initialData?.numero_etudiant || '',
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    niveau: initialData?.niveau || 'L1',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="numero_etudiant" className="block text-sm font-medium text-gray-700">
          Numéro Étudiant
        </label>
        <input
          type="text"
          id="numero_etudiant"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.numero_etudiant}
          onChange={(e) => setFormData({ ...formData, numero_etudiant: e.target.value })}
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
        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
          Prénom
        </label>
        <input
          type="text"
          id="prenom"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="niveau" className="block text-sm font-medium text-gray-700">
          Niveau
        </label>
        <select
          id="niveau"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.niveau}
          onChange={(e) => setFormData({ ...formData, niveau: e.target.value as 'L1' | 'L2' | 'L3' })}
        >
          <option value="L1">L1</option>
          <option value="L2">L2</option>
          <option value="L3">L3</option>
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