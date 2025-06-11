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
  name: yup.string().required(),
  attack: yup.number().required().min(1),
  defense: yup.number().required().min(1),
  speed: yup.number().required().min(1),
  hp: yup.number().required().min(1),
  imageUrl: yup.string().required(),
});

export type CreateMonsterDto = yup.InferType<typeof createMonsterSchema>;
