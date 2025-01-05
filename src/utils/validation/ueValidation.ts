import type { UE, Note, EC } from '../../types';

export interface ValidationResult {
  estValidee: boolean;
  moyenne: number;
  ectsAcquis: number;
}

export interface SemestreValidation {
  semestre: number;
  moyenne: number;
  ues: UEValidation[];
  estValide: boolean;
  ectsAcquis: number;
}

export interface UEValidation {
  ue: UE;
  moyenne: number;
  estValidee: boolean;
  ectsAcquis: number;
}

export function estUEValidee(moyenne: number): boolean {
  return moyenne >= 10;
}

export function calculerMoyenneUE(notes: Note[], ecs: EC[], ue: UE): number {
  const ecsUE = ecs.filter(ec => ec.ue_id === ue.id);
  let sommeCoefficients = 0;
  let sommeNotesPonderees = 0;

  ecsUE.forEach(ec => {
    const notesEC = notes.filter(n => n.ec_id === ec.id);
    const meilleurNote = getMeilleurNote(notesEC);
    if (meilleurNote) {
      sommeCoefficients += ec.coefficient;
      sommeNotesPonderees += meilleurNote.note * ec.coefficient;
    }
  });

  return sommeCoefficients > 0 ? Number((sommeNotesPonderees / sommeCoefficients).toFixed(2)) : 0;
}

export function getMeilleurNote(notes: Note[]): Note | null {
  if (notes.length === 0) return null;
  
  const noteNormale = notes.find(n => n.session === 'normale');
  const noteRattrapage = notes.find(n => n.session === 'rattrapage');
  
  if (!noteNormale) return noteRattrapage;
  if (!noteRattrapage) return noteNormale;
  
  return noteRattrapage.note > noteNormale.note ? noteRattrapage : noteNormale;
}

export function validerSemestre(ues: UE[], moyennesUE: Map<string, number>): SemestreValidation {
  if (ues.length === 0) {
    throw new Error("Aucune UE fournie pour la validation du semestre");
  }

  const semestre = ues[0].semestre;
  const validationsUE = ues.map(ue => {
    const moyenne = moyennesUE.get(ue.id) || 0;
    return {
      ue,
      moyenne,
      estValidee: estUEValidee(moyenne),
      ectsAcquis: estUEValidee(moyenne) ? ue.credits_ects : 0
    };
  });

  // Calcul de la moyenne du semestre (pondérée par les ECTS)
  const totalCredits = ues.reduce((sum, ue) => sum + ue.credits_ects, 0);
  const sommeMoyennesPonderees = validationsUE.reduce(
    (sum, validation) => sum + (validation.moyenne * validation.ue.credits_ects),
    0
  );
  const moyenneSemestre = Number((sommeMoyennesPonderees / totalCredits).toFixed(2));

  // Compensation : si moyenne ≥ 10, toutes les UEs sont validées
  const estValide = moyenneSemestre >= 10;
  const ectsAcquis = estValide 
    ? totalCredits 
    : validationsUE.reduce((sum, validation) => sum + validation.ectsAcquis, 0);

  return {
    semestre,
    moyenne: moyenneSemestre,
    ues: validationsUE,
    estValide,
    ectsAcquis
  };
}

export function calculerECTSTotal(validationsSemestre: SemestreValidation[]): number {
  return validationsSemestre.reduce((total, semestre) => total + semestre.ectsAcquis, 0);
}

export function peutPasserAnnéeSuivante(ectsAcquis: number, niveau: 'L1' | 'L2' | 'L3'): boolean {
  const ectsRequis = {
    'L1': 60,
    'L2': 120,
    'L3': 180
  };
  return ectsAcquis >= ectsRequis[niveau];
}