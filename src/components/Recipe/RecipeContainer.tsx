import { useEffect, useState } from 'react'
import { RecipeDTO } from '../../types';
import RecipeCard from './RecipeCard';
import { getAllRecipes } from '../../services/recipeServices';



const RecipeContainer = () => {
  
  const [recipes, setRecipes] = useState<RecipeDTO[]>();
  
  useEffect(() => {
    const getAllRecipesDB = async () => {
      const data = await getAllRecipes()
      setRecipes(data)
    }

    getAllRecipesDB();
  },[])

  const renderRecipeCards : JSX.Element[] | undefined = recipes?.map(recipe => {
    return (<RecipeCard key={`rc${recipe.id}`} recipe={recipe}/>)
  })

  return (
    <div className='w-full flex justify-center'>
      <div className='container flex flex-col md:flex-row'>
        {renderRecipeCards}
      </div>
    </div>
  )
}

export default RecipeContainer