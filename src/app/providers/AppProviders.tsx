import { MealPlannerProvider } from "@/features/planner/context/MealPlannerContext";
import { RecipeProvider } from "@/features/recipes/context/RecipeContext";
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ShoppingListProvider } from "@/features/shopping-list/context/ShoppingListContext";

const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <RecipeProvider>
      <MealPlannerProvider>
        <ShoppingListProvider>{children}</ShoppingListProvider>
      </MealPlannerProvider>
    </RecipeProvider>
  </ThemeProvider>
);

export default AppProviders;
