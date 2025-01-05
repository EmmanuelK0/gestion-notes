import { z } from 'zod';

// Schéma de validation pour une UE
export const schemaUE = z.object({
  code: z.string()
    .regex(/^UE[0-9]{2}$/, "Le code doit être au format UExx (ex: UE11)")
    .min(4)
    .max(4),
  nom: z.string().min(3).max(100),
  creditsECTS: z.number()
    .min(1, "Les crédits ECTS doivent être entre 1 et 30")
    .max(30, "Les crédits ECTS doivent être entre 1 et 30"),
  semestre: z.number()
    .min(1, "Le semestre doit être entre 1 et 6")
    .max(6, "Le semestre doit être entre 1 et 6"),
});

// Schéma de validation pour un EC
export const schemaEC = z.object({
  code: z.string().min(2).max(10),
  nom: z.string().min(3).max(100),
  coefficient: z.number()
    .min(1, "Le coefficient doit être entre 1 et 5")
    .max(5, "Le coefficient doit être entre 1 et 5"),
  ueId: z.string().uuid(),
});

// Schéma de validation pour une note
export const schemaNotes = z.object({
  note: z.number()
    .min(0, "La note doit être entre 0 et 20")
    .max(20, "La note doit être entre 0 et 20")
    .step(0.25, "La note doit être un multiple de 0.25"),
  session: z.enum(['normale', 'rattrapage']),
  etudiantId: z.string().uuid(),
  ecId: z.string().uuid(),
});