import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { getLocalStorage } from '@/utils/localStorageUtil';
import { RecipeDTO } from '@/types';

interface MealPlannerContextType {
  meals: RecipeDTO[];
  setMeals: React.Dispatch<React.SetStateAction<RecipeDTO[]>>;
  favorites: number;
  setFavorites: React.Dispatch<React.SetStateAction<number>>;
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

  const [meals, setMeals] = useState<RecipeDTO[]>(getPlanner());
  const [favorites, setFavorites] = useState<number>(0);

  const state = useMemo(() => ({ meals, setMeals, favorites, setFavorites }),[meals, favorites])


  return (
    <MealPlannerContext.Provider value={state}>
      {children}
    </MealPlannerContext.Provider>
  );
};
export default MealPlannerContext;
