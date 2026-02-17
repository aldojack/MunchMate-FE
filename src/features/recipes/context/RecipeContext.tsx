import { RecipeDTO } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getAllRecipes } from "@/features/recipes/services/recipeServices";

interface RecipeContextType {
  recipes: RecipeDTO[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeDTO[]>>;
  getRecipeById: (id: string) => RecipeDTO | undefined
}
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children } : {children : ReactNode}) => {
  useEffect(() => {
    const loadRecipes = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };
    loadRecipes();
  }, []);

  const getRecipeById = (id : string) : RecipeDTO | undefined => {
    return recipes?.find(recipe => recipe.id === id)
  }
  const [recipes, setRecipes] = useState<RecipeDTO[]>([]);
  return (
    <RecipeContext.Provider value={{recipes, setRecipes, getRecipeById}}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
