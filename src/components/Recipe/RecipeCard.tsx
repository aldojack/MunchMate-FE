import FavoriteIcon from '@mui/icons-material/Favorite';
import { RecipeDTO } from '../../types'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

type RecipeCardProps = {
  recipe: RecipeDTO
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className=' border-2 p-8'>
      <div className='relative'>
        <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image} />
        </Link>
        {/* <FavoriteIcon sx={{position: 'absolute', bottom: 0, fontSize:'50px'}}/>  */}
      </div>
      <div className='flex items-center flex-col justify-around h-28'>
        <h2 className='text-1xl'>{recipe.title}</h2>
        <div className='flex gap-2'>
        <button className='bg-blue-600 rounded-lg text-white px-4'>Add <AddIcon /></button>
        <button className='bg-blue-600 rounded-lg text-white px-4'>Favourite <FavoriteIcon /></button> 
        </div>
      </div>
    </div>
  )
}

export default RecipeCard