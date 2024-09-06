import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrimarySearchAppBar from "./components/Header/PrimarySearchAppBar"
import Home from "./pages/Home/Home"
import Recipe from "./components/Recipe/Recipe"

function App() {

  return (
    <>
    <PrimarySearchAppBar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recipe/:recipeId" element={<Recipe/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
