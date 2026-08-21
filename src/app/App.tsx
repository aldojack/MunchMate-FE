import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "@/features/home/pages/Home";
import Recipe from "@/features/recipes/pages/Recipe";
import Planner from "@/features/planner/pages/Planner";
import Recipes from "@/features/recipes/pages/FilterRecipes";
import AddRecipeForm from "@/features/recipes/components/AddRecipeForm/AddRecipeForm";
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
