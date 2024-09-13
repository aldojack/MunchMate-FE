import { useEffect, useState, FC } from 'react';
import { RecipeDTO } from '../../types'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../../services/recipeServices';


const Recipe : FC = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeDTO>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const getRecipe = async () => {
      try {
        const data: RecipeDTO = await getRecipeById(recipeId)
        setRecipe(data)
      } catch (error) {
        if (typeof error === "string") {
          setError(error)
        }
      }

    }

    if (isLoading) {
      getRecipe()
      setIsLoading(!isLoading)
    }
  }, [isLoading])
  return (
    <div className='w-full pt-20'>
      {!recipe ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <div className="container mx-auto">
          <div>
            <img className="h-48 w-full object-cover md:h-full" src={recipe.image} alt={recipe.title} />
          </div>
          <div className="p-8">
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{recipe.title}</h2>
            <p className="mt-2 text-gray-500"><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
            <p className="mt-2 text-gray-500"><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
            <p className="mt-2 text-gray-500"><strong>Serving Size:</strong> {recipe.servingSize}</p>
  
            <h3 className="mt-4 text-xl font-semibold text-black">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredients.map((ingredient) => (
                <li key={`${ingredient.name}${ingredient.id}`}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
  
            <h3 className="mt-4 text-xl font-semibold text-black">Instructions</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={`step${index}`}>{instruction}</li>
              ))}
            </ol>
  
            {recipe.source.url && (
              <a href={recipe.source.url} target="_blank" rel="noopener noreferrer" className="block mt-4 text-indigo-500 hover:text-indigo-600">
                Source: {recipe.source.name}
              </a>
            )}
          </div>
        </div>
      )
      }
    </div>
  );
}

export default Recipe