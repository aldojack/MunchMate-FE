import { FC, createContext, ReactNode, useState, useEffect } from "react";
import {
  Planner,
  RecipeDTO,
  RecipeIngredientDTO,
  ShoppingListItem,
} from "@/types";
import { combineIngredients, getMealIds } from "@/utils/helperFunction";
import useMealPlannerContext from "@/hooks/useMealPlannerContext";
import { getLocalStorage } from "@/utils/localStorageUtil";
import useRecipeContext from "@/hooks/useRecipeContext";

interface ShoppingListContextInterface {
  shoppingList: ShoppingListItem[];
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
  toggleChecked: (item: ShoppingListItem) => void;
}
const ShoppingListContext = createContext<
  ShoppingListContextInterface | undefined
>(undefined);

interface ShoppingListProviderProps {
  children: ReactNode;
}

const getShoppingList = (
  getRecipesById: (id: number[]) => RecipeDTO[],
): ShoppingListItem[] => {
  const storedPlanner = getLocalStorage<Planner>("planner");
  const mealIdArray = storedPlanner
    ? Array.from(getMealIds(storedPlanner))
    : [];
  const flapMappedIngredients = getRecipesById(mealIdArray).flatMap(
    (meal: RecipeDTO) =>
      meal.ingredients.map((ingredient: RecipeIngredientDTO) => ({
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
