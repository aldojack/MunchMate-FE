import type { ReactNode } from "react";
import React, { createContext, useState, useMemo, useCallback } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorageUtil";
import { defaultPlanner } from "@/features/planner/constants";
import type { Planner, DaysType, MealType } from "../types";
import { getMealIds } from "../utils/getMealIds";

type MealPlannerContextType = {
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
  removeFromPlanner: ({
    day,
    mealType,
    mealId,
  }: {
    day: DaysType;
    mealType: MealType;
    mealId: number;
  }) => void;
  moveMeal: ({
    fromDay,
    fromMealType,
    mealId,
    toDay,
    toMealType,
  }: {
    fromDay: DaysType;
    fromMealType: MealType;
    mealId: number;
    toDay: DaysType;
    toMealType: MealType;
  }) => void;
};

const MealPlannerContext = createContext<MealPlannerContextType | undefined>(
  undefined,
);

export const MealPlannerProvider = ({ children }: { children: ReactNode }) => {
  const getPlanner = (): Planner => {
    const storedPlanner = getLocalStorage<Planner>("planner");

    if (!storedPlanner) setLocalStorage("planner", defaultPlanner);

    return storedPlanner || defaultPlanner;
  };

  const updatePlannerState = useCallback((updatedState: Planner) => {
    setLocalStorage("planner", updatedState);
    setMeals(getMealIds(updatedState));
    return updatedState;
  }, []);

  const addToPlanner = useCallback(
    ({
      day,
      mealType,
      mealId,
    }: {
      day: DaysType;
      mealType: MealType;
      mealId: number;
    }): void => {
      setPlanner((currentState) => {
        const currentMealIds = currentState[day][mealType] || new Set<number>();
        const updatedMealIds = new Set(currentMealIds);
        updatedMealIds.add(mealId);

        const updatedState = {
          ...currentState,
          [day]: {
            ...currentState[day],
            [mealType]: updatedMealIds,
          },
        };

        return updatePlannerState(updatedState);
      });
    },
    [updatePlannerState],
  );

  const removeFromPlanner = useCallback(
    ({
      day,
      mealType,
      mealId,
    }: {
      day: DaysType;
      mealType: MealType;
      mealId: number;
    }): void => {
      setPlanner((currentState) => {
        const currentMealIds = currentState[day][mealType] || new Set<number>();
        const updatedMealIds = new Set(currentMealIds);
        updatedMealIds.delete(mealId);

        const updatedState = {
          ...currentState,
          [day]: {
            ...currentState[day],
            [mealType]: updatedMealIds,
          },
        };

        return updatePlannerState(updatedState);
      });
    },
    [updatePlannerState],
  );

  const moveMeal = useCallback(
    ({
      fromDay,
      fromMealType,
      mealId,
      toDay,
      toMealType,
    }: {
      fromDay: DaysType;
      fromMealType: MealType;
      mealId: number;
      toDay: DaysType;
      toMealType: MealType;
    }): void => {
      setPlanner((currentState) => {
        const sourceSet =
          currentState[fromDay][fromMealType] || new Set<number>();
        const destinationSet =
          currentState[toDay][toMealType] || new Set<number>();

        if (
          sourceSet.has(mealId) ||
          (toDay === fromDay && toMealType === fromMealType)
        ) {
          const updatedSourceSet = new Set(sourceSet);
          updatedSourceSet.delete(mealId);

          const updatedDestinationSet = new Set(destinationSet);
          updatedDestinationSet.add(mealId);

          const updatedState = {
            ...currentState,
            [fromDay]: {
              ...currentState[fromDay],
              [fromMealType]: updatedSourceSet,
            },
            [toDay]: {
              ...currentState[toDay],
              [toMealType]: updatedDestinationSet,
            },
          };

          return updatePlannerState(updatedState);
        }

        const updatedSourceSet = new Set(sourceSet);
        updatedSourceSet.delete(mealId);

        const updatedDestinationSet = new Set(destinationSet);
        updatedDestinationSet.add(mealId);

        const updatedState = {
          ...currentState,
          [fromDay]: {
            ...currentState[fromDay],
            [fromMealType]: updatedSourceSet,
          },
          [toDay]: {
            ...currentState[toDay],
            [toMealType]: updatedDestinationSet,
          },
        };

        return updatePlannerState(updatedState);
      });
    },
    [updatePlannerState],
  );

  const [planner, setPlanner] = useState<Planner>(getPlanner());
  const [meals, setMeals] = useState<number[]>(getMealIds(planner));

  const state = useMemo(
    () => ({
      planner,
      setPlanner,
      addToPlanner,
      removeFromPlanner,
      moveMeal,
      meals,
      setMeals,
    }),
    [planner, addToPlanner, removeFromPlanner, moveMeal, meals],
  );

  return (
    <MealPlannerContext.Provider value={state}>
      {children}
    </MealPlannerContext.Provider>
  );
};
export default MealPlannerContext;
