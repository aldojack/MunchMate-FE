import type { ShoppingListItem } from "@/features/shopping-list/types";

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
