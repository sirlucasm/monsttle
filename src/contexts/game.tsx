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
    currentBattle: undefined,
  });

  const addMonster = useCallback((monster: CreateMonsterDto) => {
    const storedMonsters = JSON.parse(
      localStorage.getItem("monsters") ?? "[]"
    ) as Monster[];
    const storedGameStats = JSON.parse(
      localStorage.getItem("gameStats") ?? "{}"
    ) as GameStats;

    const createdMonster = {
      ...monster,
      id: crypto.randomUUID(),
      attack: Number(monster.attack),
      defense: Number(monster.defense),
      speed: Number(monster.speed),
      hp: Number(monster.hp),
    };

    setMonsters((prevMonsters) => [...prevMonsters, createdMonster]);

    setGameStats((prevStats) => ({
      ...prevStats,
      monstersCreated: prevStats.monstersCreated + 1,
    }));

    localStorage.setItem(
      "monsters",
      JSON.stringify([...storedMonsters, createdMonster])
    );
    localStorage.setItem(
      "gameStats",
      JSON.stringify({
        ...storedGameStats,
        monstersCreated: storedGameStats.monstersCreated + 1,
      })
    );
  }, []);

  const startBattle = useCallback((selectedMonsters: Monster[]) => {
    const storedGameStats = JSON.parse(
      localStorage.getItem("gameStats") ?? "{}"
    ) as GameStats;

    setGameStats((prevStats) => ({
      ...prevStats,
      currentBattle: {
        logs: [],
        fightingMonsters: selectedMonsters,
      },
    }));

    localStorage.setItem(
      "gameStats",
      JSON.stringify({
        ...storedGameStats,
        currentBattle: {
          logs: [],
          fightingMonsters: selectedMonsters,
        },
      })
    );
  }, []);

  const attackMonster = useCallback(
    ({
      attacker,
      defender,
      damage,
    }: {
      attacker: Monster;
      defender: Monster;
      damage: number;
    }) => {
      setGameStats((prevStats) => ({
        ...prevStats,
        currentBattle: {
          logs: [
            ...(prevStats?.currentBattle?.logs ?? []),
            {
              text: `${attacker.name} attacks ${defender.name} for ${damage} damage`,
              type: "monster",
              monsterId: attacker.id,
            },
          ],
          fightingMonsters:
            prevStats.currentBattle?.fightingMonsters.map((monster) => {
              const newHp = monster.hp - damage;
              return monster.id === defender.id
                ? { ...monster, hp: newHp <= 0 ? 0 : newHp }
                : monster;
            }) ?? [],
        },
      }));
    },
    []
  );

  useEffect(() => {
    const storedMonsters = JSON.parse(
      localStorage.getItem("monsters") ?? "[]"
    ) as Monster[];
    const storedGameStats = JSON.parse(
      localStorage.getItem("gameStats") ?? "{}"
    ) as GameStats;

    if (storedGameStats) {
      setGameStats(storedGameStats);
    }
    if (storedMonsters) {
      setMonsters(storedMonsters);
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        monsters,
        setMonsters,
        gameStats,
        setGameStats,
        addMonster,
        startBattle,
        attackMonster,
      }}
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
