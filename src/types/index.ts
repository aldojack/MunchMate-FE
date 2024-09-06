import { MeasurementUnit } from "./enums"

interface Ingredient{
    id: number | string
    name: string
}


// interface RecipieIngredient{
//     id: number | string
//     ingredient: Ingredient
//     quantity: number
//     unit: MeasurementUnit
// }


interface Source{
    name: string
    url?: string
    book?: {title: string, pageNo: number}
}

interface RecipeIngredientDTO {
    id: number | string;
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
    image: string;
    cookTime: number;
    prepTime?: number;
    servingSize: number;
}

// interface Recipe{
//     id: number | string
//     title: string
//     /*
//     May need to change once working with a real database - 
//     ChatGPT suggested that this way joins the tables where as Array doesn't like to a specific table
//     ingredients: RecipieIngredient[]
//     */
//     ingredients: Array<RecipieIngredient>
//     source: Source
//     instructions: string[];
//     image: string;
//     cookTime: number;
//     prepTime?: number;
//     servingSize: number;
// }
export type { Ingredient, RecipeIngredientDTO, Source, RecipeDTO };