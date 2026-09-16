import useRecipeContext from "@/hooks/useRecipeContext";
import type { DayPlanner } from "@/features/planner/types";

export const useRecipe = (data: DayPlanner) => {
  const { getRecipesById } = useRecipeContext();

  return {
    data: {
      breakfast: getRecipesById(Array.from(data?.breakfast)),
      lunch: getRecipesById(Array.from(data?.lunch)),
      dinner: getRecipesById(Array.from(data?.dinner)),
    },
  };
};
