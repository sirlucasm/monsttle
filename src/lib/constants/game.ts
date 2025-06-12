export const LEVELS = [
  {
    expNeededPoints: 0,
    expPointsWinBase: 30,
    level: 1,
  },
  {
    expNeededPoints: 200,
    expPointsWinBase: 30,
    level: 2,
  },
  {
    expNeededPoints: 450,
    expPointsWinBase: 25,
    level: 4,
  },
  {
    expNeededPoints: 750,
    expPointsWinBase: 25,
    level: 5,
  },
  {
    expNeededPoints: 1100,
    expPointsWinBase: 20,
    level: 6,
  },
  {
    expNeededPoints: 1500,
    expPointsWinBase: 20,
    level: 7,
  },
  {
    expNeededPoints: 2000,
    expPointsWinBase: 15,
    level: 8,
  },
  {
    expNeededPoints: 2600,
    expPointsWinBase: 15,
    level: 9,
  },
  {
    expNeededPoints: 3300,
    expPointsWinBase: 10,
    level: 10,
  },
  {
    expNeededPoints: 4100,
    expPointsWinBase: 10,
    level: 11,
  },
  {
    expNeededPoints: 5000,
    expPointsWinBase: 10,
    level: 11,
  },
  {
    expNeededPoints: 6000,
    expPointsWinBase: 10,
    level: 12,
  },
  {
    expNeededPoints: 7100,
    expPointsWinBase: 5,
    level: 13,
  },
  {
    expNeededPoints: 8300,
    expPointsWinBase: 5,
    level: 14,
  },
  {
    expNeededPoints: 9600,
    expPointsWinBase: 5,
    level: 15,
  },
];

export const getLevelColor = {
  1: "#E0F7FA",
};

export const getLevelInfo = (level: number) =>
  LEVELS.find((levelInfo) => levelInfo.level === level) || LEVELS[0];
