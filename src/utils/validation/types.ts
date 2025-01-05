import type { UE } from '../../types';

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