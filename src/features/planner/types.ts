import type { DAYS, MEAL_TYPES } from "./constants";

export type DaysType = (typeof DAYS)[number];
export type MealType = (typeof MEAL_TYPES)[number];

export type DayPlanner = Record<MealType, Set<number>>;
export type Planner = Record<DaysType, DayPlanner>;
