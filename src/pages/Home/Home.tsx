import { Link } from 'react-router-dom'
import Hero from '../../components/Home/Hero'
import RecipeContainer from '../../components/Recipe/RecipeContainer'


const Home = () => {

  return (
    <>
      <Hero />
      <RecipeContainer />
    </>
  )
}

export default Home