import type { Note, NoteFormData } from '../../types';

export interface NoteUpdate {
  id: string;
  changes: Partial<NoteFormData>;
}

export class NoteManager {
  private notes: Note[];

  constructor(initialNotes: Note[] = []) {
    this.notes = initialNotes;
  }

  addNote(data: NoteFormData): Note {
    // Vérifier si une note existe déjà pour cet étudiant/EC/session
    const existingNote = this.findExistingNote(data);
    
    if (existingNote) {
      // Mettre à jour la note existante
      const updatedNote = this.updateExistingNote(existingNote.id, data);
      return updatedNote;
    }

    // Créer une nouvelle note
    const newNote: Note = {
      id: crypto.randomUUID(),
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.notes.push(newNote);
    return newNote;
  }

  updateNote(id: string, changes: Partial<NoteFormData>): Note {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new Error(`Note with id ${id} not found`);
    }

    const updatedNote = {
      ...this.notes[noteIndex],
      ...changes,
      updated_at: new Date()
    };

    this.notes[noteIndex] = updatedNote;
    return updatedNote;
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }

  getAllNotes(): Note[] {
    return [...this.notes];
  }

  private findExistingNote(data: NoteFormData): Note | undefined {
    return this.notes.find(note => 
      note.etudiant_id === data.etudiant_id &&
      note.ec_id === data.ec_id &&
      note.session === data.session
    );
  }

  private updateExistingNote(id: string, data: NoteFormData): Note {
    return this.updateNote(id, {
      note: data.note,
      date_evaluation: data.date_evaluation
    });
  }
}