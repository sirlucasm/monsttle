import { CreateMonsterDto, Monster } from "@/schemas/monster";

export interface GameStats {
  monstersCreated: number;
  battlesWon: number;
  experience: number;
  level: number;
}

export interface GameContextType {
  monsters: Monster[];
  setMonsters: React.Dispatch<React.SetStateAction<Monster[]>>;
  gameStats: GameStats;
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
  addMonster: (monster: CreateMonsterDto) => void;
}
