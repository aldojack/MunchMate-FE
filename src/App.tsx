import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrimarySearchAppBar from "./components/Header/PrimarySearchAppBar"
import Home from "./pages/Home/Home"

function App() {

  return (
    <>
    <PrimarySearchAppBar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
    <Home/>
    </>
  )
}

export default App
