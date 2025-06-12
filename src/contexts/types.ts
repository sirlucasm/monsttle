import { CreateMonsterDto, Monster } from "@/schemas/monster";

export interface BattleLog {
  text: string;
  type: "monster" | "game";
  monsterId?: string;
}
export interface GameStats {
  monstersCreated: number;
  battlesWon: number;
  experience: number;
  level: number;
  currentBattle?: {
    logs: BattleLog[];
    fightingMonsters: Monster[];
  };
}

export interface GameContextType {
  monsters: Monster[];
  setMonsters: React.Dispatch<React.SetStateAction<Monster[]>>;
  gameStats: GameStats;
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
  addMonster: (monster: CreateMonsterDto) => void;
  startBattle: (selectedMonsters: Monster[]) => void;
  attackMonster: ({
    attacker,
    defender,
    damage,
  }: {
    attacker: Monster;
    defender: Monster;
    damage: number;
  }) => void;
}
