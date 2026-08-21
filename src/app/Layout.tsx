import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import ShoppingListFab from "@/features/shopping-list/components/ShoppingListFab";
import ShoppingListDrawer from "@/features/shopping-list/components/ShoppingListDrawer";

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
