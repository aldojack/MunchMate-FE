import { MeasurementUnit } from "./enums"

interface Ingredient{
    id: number | string
    name: string
}

interface Source{
    name: string
    url?: string
    book?: string, 
    pageNo?: number
}

interface RecipeIngredientDTO {
    id?: number | string;
    name: string;
    quantity: number;
    unit: MeasurementUnit | string;
}

interface RecipeDTO {
    id?: string;
    title: string;
    ingredients: RecipeIngredientDTO[];
    source: Source;
    instructions: string[];
    image?: string;
    cookTime: number;
    prepTime: number;
    servingSize: number;
}
export type { Ingredient, RecipeIngredientDTO, Source, RecipeDTO };