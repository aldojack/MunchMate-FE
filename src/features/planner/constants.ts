import { Planner, MealType } from "@/types";

const emptyMeals: Record<MealType, Set<number>> = {
  breakfast: new Set(),
  lunch: new Set(),
  dinner: new Set(),
};

export const defaultPlanner: Planner = {
  monday: emptyMeals,
  tuesday: emptyMeals,
  wednesday: emptyMeals,
  thursday: emptyMeals,
  friday: emptyMeals,
  saturday: emptyMeals,
  sunday: emptyMeals,
};
