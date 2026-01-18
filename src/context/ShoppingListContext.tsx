import { FC, createContext, ReactNode, useState, useEffect } from "react";
import { RecipeIngredientDTO } from "../types";
import { getShoppingList } from "../utils/helperFunction";
import useMealPlannerContext from "./useMealPlannerContext";

interface ShoppingListContextInterface {
  shoppingList: RecipeIngredientDTO[];
  setShoppingList: React.Dispatch<React.SetStateAction<RecipeIngredientDTO[]>>;
}
const ShoppingListContext = createContext<
  ShoppingListContextInterface | undefined
>(undefined);

interface ShoppingListProviderProps {
  children: ReactNode;
}

export const ShoppingListProvider: FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const {meals} = useMealPlannerContext();
  const [shoppingList, setShoppingList] = useState<RecipeIngredientDTO[]>(
    getShoppingList()
  );


  useEffect(() => {
    setShoppingList(getShoppingList())
  }, [meals])
  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;
