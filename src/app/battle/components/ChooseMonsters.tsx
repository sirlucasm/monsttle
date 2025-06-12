import { Monster } from "@/schemas/monster";
import { MonsterCard } from "./MonsterCard";
import { useCallback } from "react";

interface ChooseMonstersProps {
  monsters: Monster[];
  setSelectedMonsters: React.Dispatch<React.SetStateAction<Monster[]>>;
  selectedMonsters: Monster[];
}

export const ChooseMonsters = ({
  monsters,
  setSelectedMonsters,
  selectedMonsters,
}: ChooseMonstersProps) => {
  const handleSelectMonster = useCallback(
    (monster: Monster) => {
      if (selectedMonsters.length >= 2) return;
      if (selectedMonsters.some((m) => m.id === monster.id)) return;

      setSelectedMonsters((prev) => [...prev, monster]);
    },
    [selectedMonsters, setSelectedMonsters]
  );

  return (
    <div className="flex items-center gap-3 flex-wrap relative">
      {monsters.length === 0 ? (
        <div
          className="flex items-center justify-center w-full"
          key="noMonsters"
        >
          <p className="text-white/70 text-center text-sm">
            No monsters created yet 😕
          </p>
        </div>
      ) : (
        monsters.map((monster) => {
          const isSelected = selectedMonsters.some((m) => m.id === monster.id);

          return (
            <MonsterCard
              key={monster.id}
              monster={monster}
              onClick={() => handleSelectMonster(monster)}
              isSelected={isSelected}
            />
          );
        })
      )}
    </div>
  );
};
