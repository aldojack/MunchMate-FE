import { RecipeDTO, ShoppingListItem } from "@/types";
import { getLocalStorage } from "@/utils/localStorageUtil";

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

export const getShoppingList = (): ShoppingListItem[] => {
  const storedPlanner = getLocalStorage<RecipeDTO[]>("planner")?.flatMap(
    (recipe: RecipeDTO) =>
      recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        isChecked: false,
      })),
  );
  return storedPlanner ? combineIngredients(storedPlanner) : [];
};

export default { combineIngredients, getShoppingList };
