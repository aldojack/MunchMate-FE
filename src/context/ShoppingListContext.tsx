import { FC, createContext, ReactNode, useState, useEffect } from "react";
import { ShoppingListItem } from "@/types";
import { getShoppingList } from "@/utils/helperFunction";
import useMealPlannerContext from "@/hooks/useMealPlannerContext";

interface ShoppingListContextInterface {
  shoppingList: ShoppingListItem[];
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
  toggleChecked: (item : ShoppingListItem) => void;
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
  const { meals } = useMealPlannerContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItem[]>(getShoppingList());

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const toggleChecked = (item : ShoppingListItem) => {
      setShoppingList(prev => prev.map(ingredient => ingredient.id === item.id ? {...ingredient, isChecked: !ingredient.isChecked} : ingredient))
  }

  useEffect(() => {
    setShoppingList(getShoppingList());
  }, [meals]);
  return (
    <ShoppingListContext.Provider
      value={{ shoppingList, setShoppingList, isDrawerOpen, setIsDrawerOpen, toggleDrawer, toggleChecked }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;
