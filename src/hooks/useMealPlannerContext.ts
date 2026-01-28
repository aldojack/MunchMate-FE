import { useContext } from "react";
import MealPlannerContext from "@/context/MealPlannerContext";

export const useMealPlannerContext = () => {
  const mealPlanner = useContext(MealPlannerContext);
  if (!mealPlanner)
    throw new Error("useMealPlannerContext must be used within MealPlannerProvider")
  return mealPlanner
};

export default useMealPlannerContext;
