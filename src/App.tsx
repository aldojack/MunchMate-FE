import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/features/home/pages/Home";
import Recipe from "@/features/recipes/pages/Recipe";
import Planner from "@/features/planner/pages/Planner";
import Recipes from "@/features/recipes/pages/FilterRecipes";
import { MealPlannerProvider } from "@/context/MealPlannerContext";
import AddRecipeForm from "@/features/recipes/components/AddRecipeForm/AddRecipeForm";
import Header from "@/components/shared/Header/Header";
import { ShoppingListProvider } from "@/context/ShoppingListContext";
import ShoppingListFab from "@/features/shoppingList/pages/ShoppingListFab";
import ShoppingListDrawer from "@/features/shoppingList/pages/ShoppingListDrawer";
import { RecipeProvider } from "@/features/recipes/context/RecipeContext";

function App() {
  return (
    <RecipeProvider>
      <MealPlannerProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
          </Routes>
        </Router>
        <ShoppingListProvider>
          <ShoppingListDrawer />
          <ShoppingListFab />
        </ShoppingListProvider>
      </MealPlannerProvider>
    </RecipeProvider>
  );
}

export default App;
