import React, { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { getLocalStorage } from '../utils/localStorageUtil';
import { combineIngredients } from '../utils/helperFunction';
import { RecipeDTO, RecipeIngredientDTO } from '../types';

interface MealPlannerContextType {
  meals: RecipeDTO[];
  setMeals: React.Dispatch<React.SetStateAction<RecipeDTO[]>>;
  favorites: number;
  setFavorites: React.Dispatch<React.SetStateAction<number>>;
  shoppingList: RecipeIngredientDTO[];
  setShoppingList: React.Dispatch<React.SetStateAction<RecipeIngredientDTO[]>>;
}

const MealPlannerContext = createContext<MealPlannerContextType | undefined>(undefined);

interface MealPlannerProviderProps {
  children: ReactNode;
}

export const MealPlannerProvider: React.FC<MealPlannerProviderProps> = ({ children }) => {
  const getPlanner = (): RecipeDTO[] => {
    const storedPlanner = getLocalStorage<RecipeDTO[]>('planner')

    return storedPlanner || []
  };

  const getShoppingList = (): RecipeIngredientDTO[] => {
    const storedPlanner: RecipeIngredientDTO[] | undefined = getLocalStorage<RecipeDTO[]>('planner')?.flatMap((recipe: RecipeDTO) => recipe.ingredients)
    return storedPlanner ? combineIngredients(storedPlanner) : []
  };

  // Initialize state with values from localStorage
  const [meals, setMeals] = useState<RecipeDTO[]>(getPlanner());
  const [favorites, setFavorites] = useState<number>(0);
  const [shoppingList, setShoppingList] = useState<RecipeIngredientDTO[]>(getShoppingList());

  const state = useMemo(() => ({ meals, setMeals, favorites, setFavorites, shoppingList, setShoppingList }),[meals, shoppingList, favorites])

  useEffect(() => {
    setShoppingList(getShoppingList())
  }, [meals])

  return (
    <MealPlannerContext.Provider value={state}>
      {children}
    </MealPlannerContext.Provider>
  );
};
export default MealPlannerContext;
