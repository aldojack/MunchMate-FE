import { Planner, ShoppingListItem } from "@/types";
// import { getLocalStorage } from "@/utils/localStorageUtil";

//Make more robust to handle multiple words, handle white spaces
export const stringToTitleCase = (day: string) =>
  day[0].toUpperCase() + day.slice(1);

export function combineIngredients(
  ingredients: ShoppingListItem[],
): ShoppingListItem[] {
  const combinedIngredients: ShoppingListItem[] = [];

  ingredients.forEach((ingredient: ShoppingListItem) => {
    const existingIngredient = combinedIngredients.find(
      (i) => i.name === ingredient.name && i.unit === ingredient.unit,
    );

    if (existingIngredient) {
      // If ingredient already exists, update the quantity
      existingIngredient.quantity += ingredient.quantity;
    } else {
      // If ingredient doesn't exist, add it to combinedIngredients
      combinedIngredients.push({ ...ingredient });
    }
  });

  return combinedIngredients;
}

export const getMealIds = (planner: Planner) => {
  return Object.values(planner)
    .flatMap((mealTypes) => Object.values(mealTypes))
    .reduce<number[]>((acc, mealSet) => {
      if (mealSet instanceof Set && mealSet.size > 0) {
        acc.push(...mealSet);
      }
      return acc;
    }, []);
};
