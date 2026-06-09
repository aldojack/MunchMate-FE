import { MeasurementUnit } from "@/types/enums";

interface Ingredient {
  id: number | string;
  name: string;
}

interface Source {
  name: string;
  url?: string;
  book?: string;
  pageNo?: number;
}

interface RecipeIngredientDTO {
  id?: number | string;
  name: string;
  quantity: number;
  unit: MeasurementUnit | string;
}

interface ShoppingListItem extends RecipeIngredientDTO {
  isChecked: boolean;
}

interface RecipeDTO {
  id: number;
  title: string;
  ingredients: RecipeIngredientDTO[];
  source: Source;
  instructions: string[];
  image?: string;
  cookTime: number;
  prepTime: number;
  servingSize: number;
}

type Days =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type MealType = "breakfast" | "lunch" | "dinner";

type DayPlanner = Partial<Record<MealType, number[]>>;

type Planner = Partial<Record<Days, DayPlanner>>;

export type {
  Ingredient,
  RecipeIngredientDTO,
  Source,
  RecipeDTO,
  ShoppingListItem,
  Planner,
};
