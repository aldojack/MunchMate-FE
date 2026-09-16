import { Outlet } from "react-router-dom";

import ShoppingListDrawer from "@/features/shopping-list/components/ShoppingListDrawer";
import ShoppingListFab from "@/features/shopping-list/components/ShoppingListFab";

import Header from "./Header/Header";

const Layout = () => {
  return (
    <div className="bg-background text-text min-h-dvh">
      <Header />
      <Outlet />
      <ShoppingListDrawer />
      <ShoppingListFab />
    </div>
  );
};

export default Layout;
