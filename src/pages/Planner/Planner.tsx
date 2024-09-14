import React, { useEffect, useState } from 'react'
import { RecipeDTO } from '../../types';
import RecipeCard from '../../components/Recipe/RecipeCard';
import { getLocalStorage } from '../../utils/localStorageUtil';

type Props = {}

const Planner = (props: Props) => {
    const [plannedMeals, setPlannedMeals] = useState<RecipeDTO[]>();

    useEffect(() => {
        const plannedMeals: RecipeDTO[] | null = getLocalStorage<RecipeDTO[]>('planner');
        
        if (plannedMeals) setPlannedMeals(plannedMeals)
    },[])

    const renderPlanner: JSX.Element[] | undefined = plannedMeals?.map((meal, index) => {
        return (<RecipeCard key={`rc${meal.id}-${index}`} recipe={meal} isPlanner={true}/>)
    })

    return (
        <div className='w-full pt-20'>
            <div className='container mx-auto'>
                <div>
                    <h1 className='text-4xl font-bold text-center'>Planner</h1>
                    <div className='container flex flex-col md:flex-row md:flex-wrap justify-center'>
                        {renderPlanner}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Planner