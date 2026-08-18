import { DAYS, MEAL_TYPES } from "@/constants/constants";
import { MeasurementUnit } from "@/types/enums";

type Ingredient = {
  id: number | string;
  name: string;
};

type Source = {
  name: string;
  url?: string;
  book?: string;
  pageNo?: number;
};

type RecipeIngredientDTO = {
  id?: number | string;
  name: string;
  quantity: number;
  unit: MeasurementUnit | string;
};

type ShoppingListItem = { isChecked: boolean } & RecipeIngredientDTO;

type RecipeDTO = {
  id: number;
  title: string;
  ingredients: RecipeIngredientDTO[];
  source: Source;
  instructions: string[];
  image?: string;
  cookTime: number;
  prepTime: number;
  servingSize: number;
};

type DaysType = (typeof DAYS)[number];

type MealType = (typeof MEAL_TYPES)[number];

type DayPlanner = Record<MealType, Set<number>>;

type Planner = Record<DaysType, DayPlanner>;

export type {
  Ingredient,
  RecipeIngredientDTO,
  Source,
  RecipeDTO,
  ShoppingListItem,
  Planner,
  DayPlanner,
  MealType,
  DaysType,
};
