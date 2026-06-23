import React, { createContext, useState, ReactNode, useMemo } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorageUtil";
import { defaultPlanner } from "@/features/planner/constants";
import { Planner, DaysType, MealType } from "@/types";

interface MealPlannerContextType {
  // Remove undefined later
  planner: Planner;
  setPlanner: React.Dispatch<React.SetStateAction<Planner>>;
  meals: number[] | undefined;
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

  const getMealIds = (planner: Planner) => {
    return Object.values(planner)
      .flatMap((mealTypes) => Object.values(mealTypes))
      .reduce<number[]>((acc, mealSet) => {
        if (mealSet instanceof Set && mealSet.size > 0) {
          acc.push(...mealSet);
        }
        return acc;
      }, []);
  };

  const [planner, setPlanner] = useState<Planner>(getPlanner());
  const [meals, setMeals] = useState<number[]>(getMealIds(planner));
  // console.log(getMealIds(planner));

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
