import useRecipeContext from "./useRecipeContext";

export const useRecipe = (recipeId?: number) => {
  const { getRecipeById } = useRecipeContext();

  return recipeId == null ? undefined : getRecipeById(recipeId);
};
