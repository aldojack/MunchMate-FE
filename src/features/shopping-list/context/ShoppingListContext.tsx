import { FC, createContext, ReactNode, useState, useEffect } from "react";

import useRecipeContext from "@/hooks/useRecipeContext";
import useMealPlannerContext from "@/hooks/useMealPlannerContext";

import type { Recipe, RecipeIngredient } from "@/features/recipes/types";
import type { Planner } from "@/features/planner/types";
import { ShoppingListItem } from "../types";

import { getMealIds } from "@/features/planner/utils/getMealIds";
import { combineIngredients } from "../utils/combineIngredients";
import { getLocalStorage } from "@/utils/localStorageUtil";

type ShoppingListContextType = {
  shoppingList: ShoppingListItem[];
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
  toggleChecked: (item: ShoppingListItem) => void;
};
const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined,
);

type ShoppingListProviderProps = {
  children: ReactNode;
};

// TODO: Revisit Bulletproof React's stricter feature-boundary approach by composing
// recipe and planner dependencies at the app layer and passing them into this provider.
// TODO: Extract this pure shopping-list derivation into the shopping-list feature for independent testing.
// TODO: Add unit tests for shopping-list derivation first, then test provider actions and regeneration behavior.
const getShoppingList = (
  getRecipesById: (id: number[]) => Recipe[],
): ShoppingListItem[] => {
  // TODO: Use planner state passed from useMealPlannerContext instead of reading localStorage here.
  const storedPlanner = getLocalStorage<Planner>("planner");
  const mealIdArray = storedPlanner
    ? Array.from(getMealIds(storedPlanner))
    : [];
  const flapMappedIngredients = getRecipesById(mealIdArray).flatMap(
    (meal: Recipe) =>
      meal.ingredients.map((ingredient: RecipeIngredient) => ({
        ...ingredient,
        isChecked: false,
      })),
  );
  return combineIngredients(flapMappedIngredients);
};

export const ShoppingListProvider: FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const { getRecipesById } = useRecipeContext();
  const { meals } = useMealPlannerContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(
    getShoppingList(getRecipesById),
  );

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const toggleChecked = (item: ShoppingListItem) => {
    setShoppingList((prev) =>
      prev.map((ingredient) =>
        ingredient.id === item.id
          ? { ...ingredient, isChecked: !ingredient.isChecked }
          : ingredient,
      ),
    );
  };

  useEffect(() => {
    setShoppingList(getShoppingList(getRecipesById));
  }, [meals, getRecipesById]);
  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        setShoppingList,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
        toggleChecked,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;
