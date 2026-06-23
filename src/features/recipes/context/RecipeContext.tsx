import { RecipeDTO } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAllRecipes } from "@/features/recipes/services/recipeServices";

interface RecipeContextType {
  recipes: RecipeDTO[] | null;
  getRecipeById: (id: number) => RecipeDTO | undefined;
  getRecipesById: (ids: number[]) => RecipeDTO[];
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

  const isRecipe = (recipe: RecipeDTO | undefined): recipe is RecipeDTO => {
    return recipe?.id !== undefined && typeof recipe?.title === "string";
  };

  const getRecipeById = useCallback(
    (id: number): RecipeDTO | undefined => {
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
