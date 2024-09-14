import FavoriteIcon from '@mui/icons-material/Favorite';
import { RecipeDTO } from '../../types'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link } from 'react-router-dom';
import MealPlannerContext from '../../hooks/MealPlannerContext';
import { useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorageUtil';

type RecipeCardProps = {
  recipe: RecipeDTO
  isPlanner?: boolean
}

const RecipeCard = ({ recipe, isPlanner = false }: RecipeCardProps) => {
  const context = useContext(MealPlannerContext);

  if (!context) {
    throw new Error('Navbar must be used within a MealPlannerProvider');
  }

  const {setMeals} = context;

  function addToPlanner():void{
    
      const currentMeals : RecipeDTO[] | null = getLocalStorage<RecipeDTO[]>('planner')
      if(currentMeals)
      {
        currentMeals.push(recipe)
        setLocalStorage<RecipeDTO[]>('planner', currentMeals)
        setMeals(currentMeals)
      }
      else{
        setLocalStorage<RecipeDTO[]>('planner', [recipe])
      }
  }

  function removeFromPlanner():void{

    const currentMeals : RecipeDTO[] | null = getLocalStorage<RecipeDTO[]>('planner')
    if(currentMeals)
    {
      const index = currentMeals.findIndex(meal => meal.title === recipe.title)
      if(index !== -1){
        currentMeals.splice(index,1)
        setLocalStorage<RecipeDTO[]>('planner', currentMeals)
        setMeals(currentMeals)
      }

    }
}

  return (
    <div className=' border-2 p-8 basis-96'>
      <div className='relative'>
        <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.title}/>
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