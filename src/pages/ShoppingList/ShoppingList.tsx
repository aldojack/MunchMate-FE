import React, { useEffect, useState } from 'react'
import { RecipeIngredientDTO, RecipeDTO } from '../../types'
import {getLocalStorage} from '../../utils/localStorageUtil'
import {combineIngredients} from '../../utils/helperFunction'

type Props = {}

const ShoppingList = (props: Props) => {
    const [ShoppingList, setShoppingList] = useState<RecipeIngredientDTO[]>([])


    useEffect(() => {
        const fetchIngredients = () => {
            const ingredients : RecipeIngredientDTO[] | undefined= getLocalStorage<RecipeDTO[]>('planner')?.map((recipe: RecipeDTO) => recipe.ingredients).flat()
            if(ingredients) combineIngredients(ingredients)
        }

        fetchIngredients();
    },[])
  return (
    <div>ShoppingList</div>
  )
}

export default ShoppingList