import { BrowserRouter as Router, Route, Routes } from "react-router";

import Home from "@/features/home/pages/Home";
import Planner from "@/features/planner/pages/Planner";
import AddRecipeForm from "@/features/recipes/components/AddRecipeForm/AddRecipeForm";
import Recipes from "@/features/recipes/pages/FilterRecipes";
import Recipe from "@/features/recipes/pages/Recipe";

import Layout from "./Layout";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
            <Route path="/planner" element={<Planner />} />
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
