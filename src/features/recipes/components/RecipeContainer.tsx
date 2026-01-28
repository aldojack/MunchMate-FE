import { useEffect, useState } from 'react'
import { RecipeDTO } from '@/types';
import RecipeCard from '@/features/recipes/components/RecipeCard';
import { getAllRecipes } from '@/features/recipes/services/recipeServices'
import { Link } from 'react-router-dom';

const RecipeContainer = () => {
  
  const [recipes, setRecipes] = useState<RecipeDTO[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  useEffect(() => {
    const getAllRecipesDB = async () => {
      const data = await getAllRecipes()
      setRecipes(data)
      setIsLoading(false)
    }
    if(isLoading)
    {
      getAllRecipesDB();
    }
  },[isLoading])

  const renderRecipeCards : JSX.Element[] | undefined = recipes?.map((recipe, index) => {
    return (<RecipeCard key={`rc${recipe.id}-${index}`} recipe={recipe}/>)
  })

  return (
    <div className='w-full flex justify-center'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl'>Popular Recipes</h1>
          <div className='flex gap-4 my-4'>
          <Link to="/recipes" className='bg-primary rounded-lg text-white px-4 py-2 w-fit'>View All</Link>
          <Link to="/planner" className='bg-primary rounded-lg text-white px-4 py-2 w-fit'>View Planner</Link>
          </div>
        </div>
        <div className='flex flex-col md:flex-row flex-wrap md:basis-[50%] md:justify-center'>
        {!isLoading ? renderRecipeCards : <div>Loading....</div>}
        </div>
      </div>
    </div>
  )
}

export default RecipeContainer