import FavoriteIcon from '@mui/icons-material/Favorite';
import { RecipeDTO } from '../../types'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link } from 'react-router-dom';
import MealPlannerContext from '../../hooks/MealPlannerContext';
import { useContext } from 'react';

type RecipeCardProps = {
  recipe: RecipeDTO
  isPlanner?: boolean
}

const RecipeCard = ({ recipe, isPlanner = false }: RecipeCardProps) => {
  const context = useContext(MealPlannerContext);

  if (!context) {
    throw new Error('Navbar must be used within a MealPlannerProvider');
  }

  const { setMeals} = context;

  function addToPlanner():void{

      const currentMeals : string | null = localStorage.getItem("planner")
      if(currentMeals)
      {
        const parsedMeals : RecipeDTO[] = JSON.parse(currentMeals)
        parsedMeals.push(recipe)
        localStorage.setItem('planner', JSON.stringify(parsedMeals))
        setMeals(parsedMeals.length)
      }
      else{
        localStorage.setItem('planner', JSON.stringify([recipe]))
        setMeals(1)
      }
  }

  function removeFromPlanner():void{

    const currentMeals : string | null = localStorage.getItem("planner")
    if(currentMeals)
    {
      const parsedMeals : RecipeDTO[] = JSON.parse(currentMeals)
      const index = parsedMeals.findIndex(meal => meal.title === recipe.title)
      if(index !== -1){
        parsedMeals.splice(index,1)
        localStorage.setItem("planner", JSON.stringify(parsedMeals))
        setMeals(parsedMeals.length)
      }

    }
}

  return (
    <div className=' border-2 p-8 basis-96'>
      <div className='relative'>
        <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image} />
        </Link>
      </div>
      <div className='flex items-center flex-col justify-around h-28'>
        <h2 className='text-1xl'>{recipe.title}</h2>
        <div className='flex gap-2'>
          {isPlanner ? (
            <>
            <Link to={`/recipe/${recipe.id}`} className='bg-blue-600 rounded-lg text-white px-4 py-2' onClick={() => addToPlanner()}>Cook <RestaurantIcon /></Link>
            <button className='bg-blue-600 rounded-lg text-white px-4 py-2' onClick={() => removeFromPlanner()}>Remove <DeleteIcon /></button>
            </>
          ) : (
            <>
            <button className='bg-blue-600 rounded-lg text-white px-4 py-2' onClick={() => addToPlanner()}>Add <AddIcon /></button>
            <button className='bg-blue-600 rounded-lg text-white px-4 py-2'>Favourite <FavoriteIcon /></button> 
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard