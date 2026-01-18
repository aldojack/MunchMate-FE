import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Recipe from "./features/recipes/pages/Recipe";
import Planner from "./features/planner/pages/Planner";
import Recipes from "./pages/Recipes/FilterRecipes";
import { MealPlannerProvider } from "./context/MealPlannerContext";
import ShoppingList from "./features/shoppingList/pages/ShoppingList";
import AddRecipeForm from "./features/recipes/components/AddRecipeForm/AddRecipeForm";
import Header from "./components/Header/Header";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import ShoppingListFab from "./features/shoppingList/pages/ShoppingListFab";

function App() {
  return (
    <MealPlannerProvider>
      <Router>
        <ShoppingListProvider>
          <Header />
        </ShoppingListProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/add" element={<AddRecipeForm />} />
          <Route path="/recipe/:recipeId" element={<Recipe />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </Router>
      <ShoppingListProvider>
        <ShoppingListFab />
      </ShoppingListProvider>
    </MealPlannerProvider>
  );
}

export default App;
