import { RecipeIngredient } from "../recipes/types";

export type ShoppingListItem = { isChecked: boolean } & RecipeIngredient;
