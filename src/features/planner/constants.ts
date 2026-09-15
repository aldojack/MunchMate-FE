import type { Planner, MealType, DaysType } from "./types";

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const MEAL_TYPES = ["breakfast", "lunch", "dinner"] as const;

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
