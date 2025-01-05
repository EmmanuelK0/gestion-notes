import type { UE } from '../../types';

export function estUEValidee(moyenne: number): boolean {
  return moyenne >= 10;
}

export function validerSemestre(moyennes: Map<string, number>, ues: UE[]): {
  moyenne: number;
  estValide: boolean;
  ectsAcquis: number;
} {
  const totalCredits = ues.reduce((sum, ue) => sum + ue.credits_ects, 0);
  const sommeMoyennesPonderees = ues.reduce((sum, ue) => {
    const moyenne = moyennes.get(ue.id) || 0;
    return sum + moyenne * ue.credits_ects;
  }, 0);

  const moyenneSemestre = Number((sommeMoyennesPonderees / totalCredits).toFixed(2));
  const estValide = moyenneSemestre >= 10;

  const ectsAcquis = estValide 
    ? totalCredits 
    : ues.reduce((sum, ue) => {
        const moyenne = moyennes.get(ue.id) || 0;
        return sum + (moyenne >= 10 ? ue.credits_ects : 0);
      }, 0);

  return { moyenne: moyenneSemestre, estValide, ectsAcquis };
}