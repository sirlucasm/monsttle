/* eslint-disable @typescript-eslint/no-unused-vars */
import { LEVELS } from "../constants/game";

export const calculateBattleExpPoints = ({
  atacksCount,
  experience,
}: {
  atacksCount: number;
  experience: number;
}) => {
  const levelInfo = getLevelInfo(experience);

  return Math.floor(levelInfo.expPointsWinBase + atacksCount * Math.random());
};

export const getLevelInfo = (experience: number) => {
  const levelInfo = LEVELS.sort(
    (lv1, _) => lv1.expNeededPoints - experience
  )[0];

  return levelInfo;
};
