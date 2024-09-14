import React, { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { getLocalStorage } from '../utils/localStorageUtil';
import { combineIngredients } from '../utils/helperFunction';
import { RecipeDTO, RecipeIngredientDTO } from '../types';

// Define types for the context values
interface MealPlannerContextType {
  meals: RecipeDTO[];
  setMeals: React.Dispatch<React.SetStateAction<RecipeDTO[]>>;
  favorites: number;
  setFavorites: React.Dispatch<React.SetStateAction<number>>;
  shoppingList: RecipeIngredientDTO[];
  setShoppingList: React.Dispatch<React.SetStateAction<RecipeIngredientDTO[]>>;
}

// Create the context
const MealPlannerContext = createContext<MealPlannerContextType | undefined>(undefined);

interface MealPlannerProviderProps {
  children: ReactNode;
}

// Create the provider component
export const MealPlannerProvider: React.FC<MealPlannerProviderProps> = ({ children }) => {
  const getPlanner = (): RecipeDTO[] => {
    const storedPlanner = getLocalStorage<RecipeDTO[]>('planner')

    return storedPlanner || []
  };

  const getShoppingList = (): RecipeIngredientDTO[] => {
    const storedPlanner: RecipeIngredientDTO[] | undefined = getLocalStorage<RecipeDTO[]>('planner')?.map((recipe: RecipeDTO) => recipe.ingredients).flat()
    return storedPlanner ? combineIngredients(storedPlanner) : []
  };

  // Initialize state with values from localStorage
  const [meals, setMeals] = useState<RecipeDTO[]>(getPlanner());
  const [favorites, setFavorites] = useState<number>(0);
  const [shoppingList, setShoppingList] = useState<RecipeIngredientDTO[]>(getShoppingList());

  const state = useMemo(() => ({ meals, setMeals, favorites, setFavorites, shoppingList, setShoppingList }),[meals, shoppingList])

  useEffect(() => {
    setShoppingList(getShoppingList())
  }, [meals])

  return (
    <MealPlannerContext.Provider value={state}>
      {children}
    </MealPlannerContext.Provider>
  );
};

// Export the context and provider for use in other components
export default MealPlannerContext;
