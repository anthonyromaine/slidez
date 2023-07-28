import Difficulty from "./Difficulty";

export const BoardSize: Record<Difficulty, number> = {
  [Difficulty.Normal]: 3,
  [Difficulty.Hard]: 5,
};
