"use client";

import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import Logo from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { useGame } from "@/contexts/game";
import { Monster } from "@/schemas/monster";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ChooseMonsters } from "./components/ChooseMonsters";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { XIcon } from "lucide-react";
import Button3D from "@/components/Button";
import { Skeleton } from "@heroui/react";
import { BattleStart } from "./components/BattleStart";

const CardMotion = motion.create(Card);

export default function BattlePage() {
  const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const { monsters, startBattle, gameStats } = useGame();

  const animateWhenIndexEqual: Record<number, { initial: any; animate: any }> =
    {
      1: {
        initial: {
          opacity: 0,
          x: -20,
        },
        animate: {
          opacity: 1,
          x: 0,
        },
      },
      2: {
        initial: {
          opacity: 0,
          x: 20,
        },
        animate: {
          opacity: 1,
          x: 0,
        },
      },
    };

  const handleRemoveMonster = useCallback(
    (monster: Monster) => {
      setSelectedMonsters((prev) => prev.filter((m) => m.id !== monster.id));
    },
    [setSelectedMonsters]
  );

  const handleStartBattle = useCallback(() => {
    if (selectedMonsters.length !== 2) return;

    setSelectedMonsters([]);

    startBattle(selectedMonsters);
  }, [selectedMonsters, startBattle]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <AnimatePresence mode="wait">
        {gameStats?.currentBattle ? (
          <BattleStart key="battleStart" />
        ) : (
          <Container className="!max-w-[830px]" key="chooseMonsters">
            <Card className="mb-5">
              <Logo />

              <div className="flex justify-center items-center gap-x-10">
                {selectedMonsters.length === 0 ? (
                  <div>
                    <p className="text-white/80 text-base">
                      Select two monsters to start the battle
                    </p>
                  </div>
                ) : (
                  selectedMonsters.map((monster, index) => (
                    <Fragment key={monster.id}>
                      <motion.div
                        className="flex flex-col gap-y-2 items-center cursor-pointer"
                        initial={animateWhenIndexEqual[index + 1].initial}
                        animate={animateWhenIndexEqual[index + 1].animate}
                        exit={{
                          ...animateWhenIndexEqual[index + 1].initial,
                          transition: {
                            delay: 0.3,
                          },
                        }}
                        onClick={() => handleRemoveMonster(monster)}
                      >
                        <Image
                          src={monster.imageUrl}
                          alt={monster.name}
                          width={256}
                          height={256}
                          className="rounded-xl w-24 h-24 object-cover"
                        />
                        <h2 className="text-white font-bold text-xs">
                          {monster.name}
                        </h2>
                      </motion.div>
                      {index < selectedMonsters.length - 1 && (
                        <XIcon size={36} className="text-white" />
                      )}
                    </Fragment>
                  ))
                )}
              </div>

              {selectedMonsters.length === 2 && (
                <motion.div
                  className="flex justify-center mt-4"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  key="startBattleButton"
                >
                  <Button3D variant="primary" onClick={handleStartBattle}>
                    Start Battle
                  </Button3D>
                </motion.div>
              )}
            </Card>
            <CardMotion
              className="!p-3"
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35 }}
              key="chooseMonsters"
            >
              {isLoadingPage ? (
                <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap relative">
                  <Skeleton className="w-[85%] sm:w-48 h-[300px] rounded-xl bg-secondary-700/40" />
                  <Skeleton className="w-[85%] sm:w-48 h-[300px] rounded-xl bg-secondary-700/40" />
                  <Skeleton className="w-[85%] sm:w-48 h-[300px] rounded-xl bg-secondary-700/40" />
                  <Skeleton className="w-[85%] sm:w-48 h-[300px] rounded-xl bg-secondary-700/40" />
                </div>
              ) : (
                <ChooseMonsters
                  monsters={monsters}
                  setSelectedMonsters={setSelectedMonsters}
                  selectedMonsters={selectedMonsters}
                />
              )}
            </CardMotion>
          </Container>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
