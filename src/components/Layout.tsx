import React from 'react';
import { GraduationCap, BookOpen, Users, ClipboardList, CheckSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'ues' | 'ecs' | 'notes' | 'students' | 'validation';
  onTabChange: (tab: 'ues' | 'ecs' | 'notes' | 'students' | 'validation') => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Gestion des Notes LMD
                </span>
              </div>
            </div>
            <nav className="-mb-px flex px-4 sm:px-6 lg:px-8 space-x-8">
              <button
                onClick={() => onTabChange('students')}
                className={`${
                  activeTab === 'students'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <Users className="h-4 w-4 mr-2" />
                Étudiants
              </button>
              <button
                onClick={() => onTabChange('ues')}
                className={`${
                  activeTab === 'ues'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                UEs
              </button>
              <button
                onClick={() => onTabChange('ecs')}
                className={`${
                  activeTab === 'ecs'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                ECs
              </button>
              <button
                onClick={() => onTabChange('notes')}
                className={`${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Notes
              </button>
              <button
                onClick={() => onTabChange('validation')}
                className={`${
                  activeTab === 'validation'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                Validation
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  );
}