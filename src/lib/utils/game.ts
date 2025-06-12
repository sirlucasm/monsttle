export const calculateBattleExpPoints = ({
  atacksCount,
  expPointsWinBase,
}: {
  atacksCount: number;
  expPointsWinBase: number;
}) => expPointsWinBase + atacksCount * Math.random();
