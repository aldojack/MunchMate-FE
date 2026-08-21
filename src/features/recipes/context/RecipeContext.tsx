import type { Recipe } from "../types";
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAllRecipes } from "@/features/recipes/api/recipes";

type RecipeContextType = {
  recipes: Recipe[] | null;
  getRecipeById: (id: number) => Recipe | undefined;
  getRecipesById: (ids: number[]) => Recipe[];
};
const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };
    loadRecipes();
  }, []);

  const isRecipe = (recipe: Recipe | undefined): recipe is Recipe => {
    return recipe?.id !== undefined && typeof recipe?.title === "string";
  };

  const getRecipeById = useCallback(
    (id: number): Recipe | undefined => {
      return recipes?.find((recipe) => recipe.id === id);
    },
    [recipes],
  );

  const getRecipesById = useCallback(
    (ids: number[]) => {
      return ids.map(getRecipeById).filter(isRecipe);
    },
    [getRecipeById],
  );

  const state = useMemo(
    () => ({ recipes, getRecipeById, getRecipesById }),
    [recipes, getRecipeById, getRecipesById],
  );

  return (
    <RecipeContext.Provider value={state}>{children}</RecipeContext.Provider>
  );
};

export default RecipeContext;
