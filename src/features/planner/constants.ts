import { Planner, MealType, DaysType } from "./types";

const createEmptyMeals = (): Record<MealType, Set<number>> => ({
  breakfast: new Set(),
  lunch: new Set(),
  dinner: new Set(),
});

const createEmptyDayPlanner = (): Record<
  DaysType,
  Record<MealType, Set<number>>
> => ({
  monday: createEmptyMeals(),
  tuesday: createEmptyMeals(),
  wednesday: createEmptyMeals(),
  thursday: createEmptyMeals(),
  friday: createEmptyMeals(),
  saturday: createEmptyMeals(),
  sunday: createEmptyMeals(),
});

export const defaultPlanner: Planner = createEmptyDayPlanner();
