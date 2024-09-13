import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrimarySearchAppBar from "./components/Header/PrimarySearchAppBar"
import Home from "./pages/Home/Home"
import Recipe from "./components/Recipe/Recipe"
import Planner from "./pages/Planner/Planner"
import Recipes from "./pages/Recipes/Recipes"
import { MealPlannerProvider } from "./hooks/MealPlannerContext"

function App() {

  return (
    <>
    <Router>
      <MealPlannerProvider>
    <PrimarySearchAppBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/planner" element={<Planner/>}/>
        <Route path="/recipe/:recipeId" element={<Recipe/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
      </Routes>
      </MealPlannerProvider>
    </Router>
    </>
  )
}

export default App
