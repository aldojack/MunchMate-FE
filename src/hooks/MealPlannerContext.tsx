import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { getLocalStorage } from '../utils/localStorageUtil';
import { combineIngredients } from '../utils/helperFunction';
import { RecipeDTO, RecipeIngredientDTO } from '../types';

// Define types for the context values
interface MealPlannerContextType {
  meals: number;
  setMeals: React.Dispatch<React.SetStateAction<number>>;
  favorites: number;
  setFavorites: React.Dispatch<React.SetStateAction<number>>;
  shoppingList: number;
  setShoppingList: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
const MealPlannerContext = createContext<MealPlannerContextType | undefined>(undefined);

interface MealPlannerProviderProps {
  children: ReactNode;
}

// Create the provider component
export const MealPlannerProvider: React.FC<MealPlannerProviderProps> = ({ children }) => {
  const getPlannerLength = (): number => {
    const storedPlanner = getLocalStorage<RecipeDTO[]>('planner')
    if (!storedPlanner) return 0;
    return storedPlanner.length
  };

  const getShoppingListLength = (): number => {
    const storedPlanner: RecipeIngredientDTO[] | undefined = getLocalStorage<RecipeDTO[]>('planner')?.map((recipe: RecipeDTO) => recipe.ingredients).flat()
    if (!storedPlanner) return 0;

    return combineIngredients(storedPlanner).length
  };

  // Initialize state with values from localStorage
  const [meals, setMeals] = useState<number>(getPlannerLength());
  const [favorites, setFavorites] = useState<number>(0);
  const [shoppingList, setShoppingList] = useState<number>(getShoppingListLength());

  useEffect(() => {
    setShoppingList(getShoppingListLength())
  }, [meals])

  return (
    <MealPlannerContext.Provider value={{ meals, setMeals, favorites, setFavorites, shoppingList, setShoppingList }}>
      {children}
    </MealPlannerContext.Provider>
  );
};

// Export the context and provider for use in other components
export default MealPlannerContext;
