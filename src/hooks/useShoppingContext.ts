import { useContext } from "react";
import ShoppingListContext from "@/context/ShoppingListContext";

export const useShoppingContext = () => {
  const shoppingList = useContext(ShoppingListContext);
  if (!shoppingList)
    throw new Error("useShoppingContext must be used within ShoppingListProvider")
  return shoppingList
};

export default useShoppingContext;
