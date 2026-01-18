import { RecipeDTO, RecipeIngredientDTO } from "../types";
import { getLocalStorage } from "./localStorageUtil";

export function combineIngredients(
  ingredients: RecipeIngredientDTO[]
): RecipeIngredientDTO[] {
  const combinedIngredients: RecipeIngredientDTO[] = [];

  ingredients.forEach((ingredient: RecipeIngredientDTO) => {
    const existingIngredient = combinedIngredients.find(
      (i) => i.name === ingredient.name && i.unit === ingredient.unit
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

export const getShoppingList = (): RecipeIngredientDTO[] => {
  const storedPlanner: RecipeIngredientDTO[] | undefined = getLocalStorage<
    RecipeDTO[]
  >("planner")?.flatMap((recipe: RecipeDTO) => recipe.ingredients);
  return storedPlanner ? combineIngredients(storedPlanner) : [];
};
export default { combineIngredients, getShoppingList };
