import React, { createContext, useState, ReactNode } from 'react';

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
        const storedPlanner = localStorage.getItem('planner');
        if (!storedPlanner) return 0;
    
        try {
          const parsedPlanner = JSON.parse(storedPlanner);
          // Ensure it's an array before accessing its length
          return Array.isArray(parsedPlanner) ? parsedPlanner.length : 0;
        } catch (error) {
          console.error("Error parsing planner from localStorage", error);
          return 0;
        }
      };
    
      // Initialize state with values from localStorage
  const [meals, setMeals] = useState<number>(getPlannerLength());
  const [favorites, setFavorites] = useState<number>(0);
  const [shoppingList, setShoppingList] = useState<number>(0);

  return (
    <MealPlannerContext.Provider value={{ meals, setMeals, favorites, setFavorites, shoppingList, setShoppingList }}>
      {children}
    </MealPlannerContext.Provider>
  );
};

// Export the context and provider for use in other components
export default MealPlannerContext;
