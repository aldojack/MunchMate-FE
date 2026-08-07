import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "@/features/home/pages/Home";
import Recipe from "@/features/recipes/pages/Recipe";
import Planner from "@/features/planner/pages/Planner";
import Recipes from "@/features/recipes/pages/FilterRecipes";
import AddRecipeForm from "@/features/recipes/components/AddRecipeForm/AddRecipeForm";
import { MealPlannerProvider } from "@/context/MealPlannerContext";
import { RecipeProvider } from "@/features/recipes/context/RecipeContext";

function App() {
  return (
    <RecipeProvider>
      <MealPlannerProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/add" element={<AddRecipeForm />} />
              <Route path="/recipe/:recipeId" element={<Recipe />} />
              <Route path="/planner" element={<Planner />} />
            </Route>
          </Routes>
        </Router>
      </MealPlannerProvider>
    </RecipeProvider>
  );
}

export default App;
