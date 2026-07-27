import React, { createContext, useState, ReactNode, useMemo } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorageUtil";
import { defaultPlanner } from "@/features/planner/constants";
import { Planner, DaysType, MealType } from "@/types";
import { getMealIds } from "@/utils/helperFunction";

interface MealPlannerContextType {
  planner: Planner;
  setPlanner: React.Dispatch<React.SetStateAction<Planner>>;
  meals: number[];
  setMeals: React.Dispatch<React.SetStateAction<number[]>>;
  addToPlanner: ({
    day,
    mealType,
    mealId,
  }: {
    day: DaysType;
    mealType: MealType;
    mealId: number;
  }) => void;
}

const MealPlannerContext = createContext<MealPlannerContextType | undefined>(
  undefined,
);

export const MealPlannerProvider = ({ children }: { children: ReactNode }) => {
  const getPlanner = (): Planner => {
    const storedPlanner = getLocalStorage<Planner>("planner");

    if (!storedPlanner) setLocalStorage("planner", defaultPlanner);

    return storedPlanner || defaultPlanner;
  };
  const addToPlanner = ({
    day,
    mealType,
    mealId,
  }: {
    day: DaysType;
    mealType: MealType;
    mealId: number;
  }): void => {
    setPlanner((currentState) => {
      const existingMealIds = currentState[day][mealType] || [];
      const updatedMealIds = new Set([...existingMealIds, mealId]);

      const updatedState = {
        ...currentState,
        [day]: {
          ...currentState[day],
          [mealType]: updatedMealIds,
        },
      };
      setLocalStorage("planner", updatedState);
      return updatedState;
    });
  };

  const [planner, setPlanner] = useState<Planner>(getPlanner());
  const [meals, setMeals] = useState<number[]>(getMealIds(planner));

  const state = useMemo(
    () => ({ planner, setPlanner, addToPlanner, meals, setMeals }),
    [planner, meals],
  );

  return (
    <MealPlannerContext.Provider value={state}>
      {children}
    </MealPlannerContext.Provider>
  );
};
export default MealPlannerContext;
