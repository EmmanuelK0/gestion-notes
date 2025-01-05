import type { UE } from '../../types';
import type { SemestreValidation } from './types';

export function estUEValidee(moyenne: number): boolean {
  return moyenne >= 10;
}

export function estSemestreValide(moyenne: number): boolean {
  return moyenne >= 10;
}

export function peutPasserAnnéeSuivante(ectsAcquis: number, niveau: 'L1' | 'L2' | 'L3'): boolean {
  const ectsRequis = {
    'L1': 60,
    'L2': 120,
    'L3': 180
  };
  return ectsAcquis >= ectsRequis[niveau];
}

export function calculerECTSTotal(validationsSemestre: SemestreValidation[]): number {
  return validationsSemestre.reduce((total, semestre) => total + semestre.ectsAcquis, 0);
}

export function validerSemestre(moyennesUE: Map<string, number>, ues: UE[]): {
  moyenne: number;
  estValide: boolean;
  ectsAcquis: number;
} {
  const totalCredits = ues.reduce((sum, ue) => sum + ue.credits_ects, 0);
  const sommeMoyennesPonderees = ues.reduce((sum, ue) => {
    const moyenne = moyennesUE.get(ue.id) || 0;
    return sum + moyenne * ue.credits_ects;
  }, 0);

  const moyenneSemestre = Number((sommeMoyennesPonderees / totalCredits).toFixed(2));
  const estValide = moyenneSemestre >= 10;

  const ectsAcquis = estValide 
    ? totalCredits 
    : ues.reduce((sum, ue) => {
        const moyenne = moyennesUE.get(ue.id) || 0;
        return sum + (moyenne >= 10 ? ue.credits_ects : 0);
      }, 0);

  return { moyenne: moyenneSemestre, estValide, ectsAcquis };
}