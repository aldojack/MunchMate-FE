enum MeasurementUnit {
  Teaspoon = "tsp",
  Tablespoon = "tbsp",
  Gram = "g",
  Kilogram = "kg",
  Pound = "lb",
  Ounce = "oz",
  Milliliter = "ml",
  Liter = "l",
  Cup = "cup",
  Whole = "whole",
  Sachet = "sachet",
}

export type Ingredient = {
  id: number | string;
  name: string;
};

export type Source = {
  name: string;
  url?: string;
  book?: string;
  pageNo?: number;
};

export type RecipeIngredient = {
  id?: number | string;
  name: string;
  quantity: number;
  unit: MeasurementUnit | string;
};

export type Recipe = {
  id: number;
  title: string;
  ingredients: RecipeIngredient[];
  source: Source;
  instructions: string[];
  image?: string;
  cookTime: number;
  prepTime: number;
  servingSize: number;
};

export { MeasurementUnit };
