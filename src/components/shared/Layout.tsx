import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import { ShoppingListProvider } from "@/context/ShoppingListContext";
import ShoppingListFab from "@/features/shoppingList/pages/ShoppingListFab";
import ShoppingListDrawer from "@/features/shoppingList/pages/ShoppingListDrawer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ShoppingListProvider>
        <ShoppingListDrawer />
        <ShoppingListFab />
      </ShoppingListProvider>
    </>
  );
};

export default Layout;
