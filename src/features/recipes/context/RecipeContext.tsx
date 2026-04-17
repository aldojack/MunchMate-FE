import { RecipeDTO } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getAllRecipes } from "@/features/recipes/services/recipeServices";

interface RecipeContextType {
  recipes: RecipeDTO[] | null;
  getRecipeById: (id: number) => RecipeDTO | undefined;
}
const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<RecipeDTO[] | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };
    loadRecipes();
  }, []);

  const getRecipeById = (id: number): RecipeDTO | undefined => {
    return recipes?.find((recipe) => recipe.id === id);
  };

  return (
    <RecipeContext.Provider value={{ recipes, getRecipeById }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
