"use client";

import Button3D from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import Logo from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { useGame } from "@/contexts/game";
import { LEVEL_COLORS } from "@/lib/constants/game";
import { getLevelInfo, getNextLevelInfo } from "@/lib/utils/game";
import { Progress } from "@heroui/react";
import { useMemo } from "react";

export default function Home() {
  const { gameStats } = useGame();

  const levelInfo = useMemo(
    () => getLevelInfo(gameStats.experience),
    [gameStats.experience]
  );

  const nextLevelInfo = useMemo(
    () => getNextLevelInfo(gameStats.experience),
    [gameStats.experience]
  );

  return (
    <Wrapper>
      <Container>
        <Card>
          <div className="text-center flex flex-col gap-y-2">
            <Logo size="lg" />
            <p className="text-white/80 text-sm">
              Create and battle your monsters
            </p>
          </div>

          <div className="flex flex-col gap-y-4">
            <Button3D variant="primary" href="/create-monster">
              🎨 Create monster
            </Button3D>
            <Button3D variant="secondary" href="/battle">
              ⚔️ Start battle
            </Button3D>
          </div>

          <div className="flex justify-center gap-x-6 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {gameStats.monstersCreated}
              </div>
              <div className="text-xs text-white/60">Monsters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {gameStats.battlesWon}
              </div>
              <div className="text-xs text-white/60">Battles Won</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {gameStats.experience}
              </div>
              <div className="text-xs text-white/60">Experience</div>
            </div>
          </div>

          <div className="relative mt-4 flex flex-col items-center gap-3 w-40 mx-auto">
            <div
              className="flex items-center justify-center rounded-full level-color-badge select-none"
              style={
                {
                  "--level-color": LEVEL_COLORS[levelInfo.level],
                } as React.CSSProperties
              }
            >
              <p className="text-neutral-800/80 text-lg font-bold z-50">
                {levelInfo.level}
              </p>
            </div>
            <Progress
              value={gameStats.experience}
              maxValue={nextLevelInfo.expNeededPoints}
              aria-label="Experience"
            />
          </div>
        </Card>
      </Container>
    </Wrapper>
  );
}
