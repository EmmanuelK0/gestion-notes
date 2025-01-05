import React from 'react';
import { StudentForm } from './StudentForm';
import { StudentList } from './StudentList';
import type { Etudiant } from '../../types';

interface StudentManagementProps {
  students: Etudiant[];
  onAddStudent: (student: Etudiant) => void;
  onDeleteStudent: (studentId: string) => void;
}

export function StudentManagement({ students, onAddStudent, onDeleteStudent }: StudentManagementProps) {
  const handleAddStudent = (data: Omit<Etudiant, 'id' | 'created_at' | 'updated_at'>) => {
    const newStudent: Etudiant = {
      id: crypto.randomUUID(),
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };
    onAddStudent(newStudent);
  };

  const handleEditStudent = (student: Etudiant) => {
    // Implement edit functionality
    console.log('Edit student:', student);
  };

  const handleDeleteStudent = (student: Etudiant) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'étudiant ${student.prenom} ${student.nom} ?`)) {
      onDeleteStudent(student.id);
    }
  };

  const handleViewResults = (student: Etudiant) => {
    // Implement view results functionality
    console.log('View results for student:', student);
  };

  return (
    <div className="space-y-8">
      <StudentForm onSubmit={handleAddStudent} />
      <StudentList
        students={students}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
        onViewResults={handleViewResults}
      />
    </div>
  );
}