import type { ReactNode } from "react";

import { MealPlannerProvider } from "@/features/planner/context/MealPlannerContext";
import { RecipeProvider } from "@/features/recipes/context/RecipeContext";
import { ShoppingListProvider } from "@/features/shopping-list/context/ShoppingListContext";

import { ThemeProvider } from "./ThemeContext";


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
