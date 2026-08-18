import { useContext } from "react";
import RecipeContext from "@/features/recipes/context/RecipeContext";

const useRecipeContext = () => {
  const recipe = useContext(RecipeContext);

  if (!recipe) {
    throw new Error("useRecipeContext must be used within RecipeProvider");
  }
  return recipe;
};

export default useRecipeContext;
