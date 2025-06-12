/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLevelInfo, LEVELS } from "../constants/game";

export const calculateBattleExpPoints = ({
  atacksCount,
  level,
}: {
  atacksCount: number;
  level: number;
}) => {
  const levelInfo = getLevelInfo(level);

  return Math.floor(levelInfo.expPointsWinBase + atacksCount * Math.random());
};

export const calculateLevel = (experience: number) => {
  const levelInfo = LEVELS.sort(
    (lv1, _) => lv1.expNeededPoints - experience
  )[0];

  return levelInfo.level;
};
