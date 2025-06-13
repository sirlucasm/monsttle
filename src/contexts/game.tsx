import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { GameContextType, GameStats } from "./types";
import { CreateMonsterDto, Monster } from "@/schemas/monster";
import { calculateBattleExpPoints } from "@/lib/utils/game";

export const GameContext = createContext({} as GameContextType);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    monstersCreated: 0,
    battlesWon: 0,
    experience: 0,
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
        logs: [
          {
            text: "The battle has started!",
            type: "game",
          },
        ],
        fightingMonsters: selectedMonsters,
      },
    }));

    localStorage.setItem(
      "gameStats",
      JSON.stringify({
        ...storedGameStats,
        currentBattle: {
          logs: [
            {
              text: "The battle has started!",
              type: "game",
            },
          ],
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
      const storedGameStats = JSON.parse(
        localStorage.getItem("gameStats") ?? "{}"
      ) as GameStats;

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

      localStorage.setItem(
        "gameStats",
        JSON.stringify({
          ...storedGameStats,
          currentBattle: {
            logs: [
              ...(storedGameStats?.currentBattle?.logs ?? []),
              {
                text: `${attacker.name} attacks ${defender.name} for ${damage} damage`,
                type: "monster",
                monsterId: attacker.id,
              },
            ],
            fightingMonsters:
              storedGameStats.currentBattle?.fightingMonsters.map((monster) => {
                const newHp = monster.hp - damage;
                return monster.id === defender.id
                  ? { ...monster, hp: newHp <= 0 ? 0 : newHp }
                  : monster;
              }) ?? [],
          },
        })
      );
    },
    []
  );

  const endBattle = useCallback((winnerMonster: Monster | undefined) => {
    const storedGameStats = JSON.parse(
      localStorage.getItem("gameStats") ?? "{}"
    ) as GameStats;

    setGameStats((prevStats) => ({
      ...prevStats,
      battlesWon: prevStats.battlesWon + 1,
      experience:
        prevStats.experience +
        calculateBattleExpPoints({
          atacksCount: prevStats.currentBattle?.logs.length ?? 0,
          experience: prevStats.experience,
        }),
      currentBattle: {
        logs: [
          ...(prevStats?.currentBattle?.logs ?? []),
          {
            text: `The battle is over!`,
            type: "game",
          },
          {
            text: `Monster ${winnerMonster?.name} won! 🎉`,
            type: "game",
          },
        ],
        fightingMonsters: prevStats.currentBattle?.fightingMonsters ?? [],
        winnerMonster,
      },
    }));

    localStorage.setItem(
      "gameStats",
      JSON.stringify({
        ...storedGameStats,
        battlesWon: storedGameStats.battlesWon + 1,
        experience:
          storedGameStats.experience +
          calculateBattleExpPoints({
            atacksCount: storedGameStats.currentBattle?.logs.length ?? 0,
            experience: storedGameStats.experience,
          }),
        currentBattle: {
          logs: [
            ...(storedGameStats?.currentBattle?.logs ?? []),
            {
              text: `The battle is over!`,
              type: "game",
            },
            {
              text: `Monster ${winnerMonster?.name} won! 🎉`,
              type: "game",
            },
          ],
          fightingMonsters:
            storedGameStats.currentBattle?.fightingMonsters ?? [],
          winnerMonster,
        },
      })
    );
  }, []);

  const handleFinishBattle = useCallback(() => {
    const storedGameStats = JSON.parse(
      localStorage.getItem("gameStats") ?? "{}"
    ) as GameStats;

    setGameStats((prevStats) => ({
      ...prevStats,
      currentBattle: undefined,
    }));

    localStorage.setItem(
      "gameStats",
      JSON.stringify({
        ...storedGameStats,
        currentBattle: undefined,
      })
    );
  }, []);

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
        endBattle,
        handleFinishBattle,
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
