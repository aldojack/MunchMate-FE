import { Planner } from "../types";

export const getMealIds = (planner: Planner) => {
  return Object.values(planner)
    .flatMap((mealTypes) => Object.values(mealTypes))
    .reduce<number[]>((acc, mealSet) => {
      if (mealSet instanceof Set && mealSet.size > 0) {
        acc.push(...mealSet);
      }
      return acc;
    }, []);
};
