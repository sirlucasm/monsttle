"use client";

import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import Logo from "@/components/Logo";
import { useGame } from "@/contexts/game";
import { Progress } from "@heroui/react";
import { motion } from "framer-motion";
import { HeartIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

const ImageMotion = motion.create(Image);

export const BattleStart = () => {
  const [countDown, setCountDown] = useState(3);
  const [isBattleStarted, setIsBattleStarted] = useState(false);

  const { gameStats } = useGame();

  const fightingMonsters = useMemo(
    () => gameStats?.currentBattle?.fightingMonsters ?? [],
    [gameStats]
  );

  const monsterAtackAnimationByIndex: Record<number, { x: number[] }> = {
    1: {
      x: [0, 12, 0],
    },
    2: {
      x: [0, -12, 0],
    },
  };

  const handleCountDown = useCallback(() => {
    setCountDown((prev) => {
      if (prev <= 0) {
        setIsBattleStarted(true);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleCountDown();
    }, 1000);

    return () => clearInterval(timer);
  }, [handleCountDown]);

  useEffect(() => {
    if (isBattleStarted) {
      setInterval(() => {}, 1000);
    }
  }, [isBattleStarted]);

  return (
    <Container className="!max-w-[830px]">
      <Logo size="lg" />
      <div className="w-full mt-16 relative">
        <ImageMotion
          src="/assets/image/scenarios/scenario1.png"
          alt="Scenarios"
          width={1600}
          height={900}
          className="w-full h-[340px] object-cover select-none rounded-xl"
          priority
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center">
          <div className="absolute top-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-white font-bold text-4xl"
            >
              {countDown > 0
                ? countDown
                : countDown === 0 && !isBattleStarted
                ? "FIGHT!"
                : countDown < 0 && !isBattleStarted
                ? "FINISHED!"
                : ""}
            </motion.p>
          </div>

          <div className="flex justify-center items-center gap-x-10">
            {fightingMonsters.map((monster, index) => (
              <Fragment key={monster.id}>
                <motion.div
                  className="flex flex-col gap-y-2 items-center"
                  animate={{
                    ...monsterAtackAnimationByIndex[index + 1],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                  }}
                  style={{
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={monster.imageUrl}
                    alt={monster.name}
                    width={256}
                    height={256}
                    className="rounded-xl w-16 h-16 sm:w-24 sm:h-24 object-cover"
                  />
                  <h2 className="text-white font-bold text-xs">
                    {monster.name}
                  </h2>
                </motion.div>
                {index < fightingMonsters.length - 1 && (
                  <XIcon size={36} className="text-white" />
                )}
              </Fragment>
            ))}
          </div>

          <div className="absolute bottom-4 w-full sm:w-1/2 flex items-center gap-10 justify-between bg-primary-800/20 p-3 backdrop-blur-lg rounded-lg">
            {fightingMonsters.map((monster) => (
              <div className="flex flex-col w-full gap-y-1" key={monster.id}>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-x-1">
                    <HeartIcon size={16} className="text-white/70" />
                    <p className="text-xs font-semibold text-white/70">HP</p>
                  </div>
                  <p className="text-[10px] text-white/70 font-semibold">
                    {monster.hp}
                  </p>
                </div>
                <Progress value={monster.hp} color="success" aria-label="HP" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Card className="mt-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-white/80 font-semibold text-xl">Battle logs</h3>
          <div className="mt-4">
            {gameStats?.currentBattle?.logs.length === 0 ? (
              <p className="text-white/50 text-sm">No log to show</p>
            ) : (
              gameStats?.currentBattle?.logs.map((log, index) => {
                return (
                  <div key={index}>
                    <p className="text-white/60">{log.text}</p>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </Card>
    </Container>
  );
};
