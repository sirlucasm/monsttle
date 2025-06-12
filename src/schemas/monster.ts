import * as yup from "yup";

export interface Monster {
  id: string;
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  imageUrl: string;
}

export const createMonsterSchema = yup.object({
  name: yup.string().required("Name is required"),
  attack: yup
    .string()
    .required("Attack is required")
    .min(1, "Attack must be at least 1"),
  defense: yup
    .string()
    .required("Defense is required")
    .min(1, "Defense must be at least 1"),
  speed: yup
    .string()
    .required("Speed is required")
    .min(1, "Speed must be at least 1"),
  hp: yup.string().required("HP is required").min(1, "HP must be at least 1"),
  imageUrl: yup.string().required("Image URL is required"),
});

export type CreateMonsterDto = yup.InferType<typeof createMonsterSchema>;
