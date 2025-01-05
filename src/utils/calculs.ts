import type { Note, EC, UE } from '../types';

export function calculerMoyenneUE(notes: Note[], ecs: EC[]): number {
  if (notes.length === 0 || ecs.length === 0) return 0;

  let sommeCoefficients = 0;
  let sommeNotesPonderees = 0;

  ecs.forEach(ec => {
    const noteEC = notes.find(n => n.ecId === ec.id);
    if (noteEC) {
      sommeCoefficients += ec.coefficient;
      sommeNotesPonderees += noteEC.note * ec.coefficient;
    }
  });

  return sommeCoefficients > 0 ? sommeNotesPonderees / sommeCoefficients : 0;
}

export function estUEValidee(moyenne: number): boolean {
  return moyenne >= 10;
}

export function calculerECTSAcquis(ues: UE[], moyennes: Map<string, number>): number {
  return ues.reduce((total, ue) => {
    const moyenne = moyennes.get(ue.id) ?? 0;
    return total + (estUEValidee(moyenne) ? ue.creditsECTS : 0);
  }, 0);
}

export function peutPasserAnnéeSuivante(ectsAcquis: number, niveau: 'L1' | 'L2' | 'L3'): boolean {
  const ectsRequis = {
    'L1': 60,
    'L2': 120,
    'L3': 180
  };
  return ectsAcquis >= ectsRequis[niveau];
}