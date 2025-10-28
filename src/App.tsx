import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrimarySearchAppBar from "./components/Header/PrimarySearchAppBar"
import Home from "./pages/Home/Home"
import Recipe from "./features/recipes/pages/Recipe"
import Planner from "./features/planner/pages/Planner"
import Recipes from "./pages/Recipes/FilterRecipes"
import { MealPlannerProvider } from "./context/MealPlannerContext"
import ShoppingList from "./features/shoppingList/pages/ShoppingList"
import AddRecipe from "./features/recipes/components/AddRecipeForm/AddRecipe"

function App() {

  return (
    <MealPlannerProvider>
      <Router>
        <PrimarySearchAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/add" element={<AddRecipe />} />
          <Route path="/recipe/:recipeId" element={<Recipe />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </Router>
    </MealPlannerProvider>
  )
}

export default App
