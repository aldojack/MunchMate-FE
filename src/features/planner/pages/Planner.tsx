import RecipeCard from '@/features/recipes/components/RecipeCard';
import useMealPlannerContext from '@/hooks/useMealPlannerContext';



const Planner = () => {
    const {meals} = useMealPlannerContext();

    const renderPlanner: JSX.Element[] = meals?.map((meal, index) => {
        return (<RecipeCard key={`rc${meal.id}-${index}`} recipe={meal} isPlanner={true}/>)
    })

    return (
        <div className='w-full pt-20'>
            <div className='container mx-auto'>
                <div>
                    <h1 className='text-4xl font-bold text-center'>Planner</h1>
                    <div className='container flex flex-col md:flex-row md:flex-wrap justify-center'>
                        {meals.length < 1 ? <p>No meals added to planner</p> : renderPlanner}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Planner