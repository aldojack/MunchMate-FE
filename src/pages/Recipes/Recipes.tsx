import { useEffect, useState } from 'react'
import { RecipeDTO } from '../../types';
import RecipeCard from '../../components/Recipe/RecipeCard';
import { getAllRecipes } from '../../services/recipeServices';


const Recipes = () => {
    const [recipes, setRecipes] = useState<RecipeDTO[]>();

    useEffect(() => {
        const fetchRecipes = async () => {
            const data : RecipeDTO[] = await getAllRecipes()
            setRecipes(data)
        }

        fetchRecipes()
    },[])

    const renderRecipes: JSX.Element[] | undefined = recipes?.map((recipe : RecipeDTO) => {
        return (<RecipeCard key={`rc${recipe.id}`} recipe={recipe}/>)
    })

    return (
        <div className='w-full pt-20'>
            <div className='container mx-auto'>
                <div>
                    <h1 className='text-4xl font-bold text-center'>Recipes</h1>
                    <div className='flex flex-col md:flex-row md:flex-wrap justify-center'>
                        {renderRecipes}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipes