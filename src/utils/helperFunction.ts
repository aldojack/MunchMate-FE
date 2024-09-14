import { RecipeIngredientDTO } from "../types";

export function combineIngredients(ingredients : RecipeIngredientDTO[]): RecipeIngredientDTO[]{
    const combinedIngredients : RecipeIngredientDTO[] = []
              
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
              console.log("ingredients: ", ingredients);
              console.log("combined: ",combinedIngredients);
              return combinedIngredients
  }
  export default {combineIngredients}