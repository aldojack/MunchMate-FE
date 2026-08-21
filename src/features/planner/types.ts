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

export type DaysType = (typeof DAYS)[number];
export type MealType = (typeof MEAL_TYPES)[number];

export type DayPlanner = Record<MealType, Set<number>>;
export type Planner = Record<DaysType, DayPlanner>;
