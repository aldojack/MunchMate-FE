import FavoriteIcon from '@mui/icons-material/Favorite';
import { RecipeDTO } from '../../types'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link } from 'react-router-dom';
import placeholder from '/images/placeholder.webp'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorageUtil';
import {useMealPlannerContext} from '../../context/useMealPlannerContext';

interface RecipeCardProps {
  recipe: RecipeDTO
  isPlanner?: boolean
}

const RecipeCard = ({ recipe, isPlanner = false }: RecipeCardProps) => {
  const context = useMealPlannerContext();
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
        setMeals([recipe])
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
    <div className='border-2 p-8 basis-96'>
      <div className='relative'>
        <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe?.image ? recipe.image : placeholder} alt={recipe.title ? recipe.title : 'placeholder for recipe image coming soon'} className={!recipe.image ? 'aspect-[3/2]' : ''}/>
        </Link>
      </div>
      <div className='flex items-center flex-col justify-around h-28'>
        <h2 className='text-1xl'>{recipe.title}</h2>
        <div className='flex gap-2'>
          {isPlanner ? (
            <>
            <Link to={`/recipe/${recipe.id}`} className='bg-primary rounded-lg text-white px-4 py-2' onClick={() => addToPlanner()}>Cook <RestaurantIcon /></Link>
            <button className='bg-primary rounded-lg text-white px-4 py-2' onClick={() => removeFromPlanner()}>Remove <DeleteIcon /></button>
            </>
          ) : (
            <>
            <button className='bg-primary rounded-lg text-white px-4 py-2' onClick={() => addToPlanner()}>Add <AddIcon /></button>
            <button className='bg-secondary rounded-lg text-white px-4 py-2'>Favourite <FavoriteIcon /></button> 
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard