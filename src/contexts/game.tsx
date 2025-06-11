import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { GameContextType, GameStats } from "./types";
import { CreateMonsterDto, Monster } from "@/schemas/monster";

export const GameContext = createContext({} as GameContextType);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    monstersCreated: 0,
    battlesWon: 0,
    experience: 0,
    level: 1,
  });

  const addMonster = useCallback(
    (monster: CreateMonsterDto) => {
      setMonsters((prevMonsters) => [
        ...prevMonsters,
        {
          ...monster,
          id: crypto.randomUUID(),
        },
      ]);
      setGameStats((prevStats) => ({
        ...prevStats,
        monstersCreated: prevStats.monstersCreated + 1,
      }));

      localStorage.setItem("monsters", JSON.stringify(monsters));
      localStorage.setItem("gameStats", JSON.stringify(gameStats));
    },
    [monsters, gameStats]
  );

  useEffect(() => {
    const storedMonsters = localStorage.getItem("monsters");
    const storedGameStats = localStorage.getItem("gameStats");

    if (storedGameStats) {
      setGameStats(JSON.parse(storedGameStats));
    }
    if (storedMonsters) {
      setMonsters(JSON.parse(storedMonsters));
    }
  }, []);

  return (
    <GameContext.Provider
      value={{ monsters, setMonsters, gameStats, setGameStats, addMonster }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
