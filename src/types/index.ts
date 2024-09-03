interface Ingredient{
    id: number | string
    name: string
}

enum MeasurementUnit {
    Teaspoon = 'tsp',
    Tablespoon = 'tbsp',
    Gram = 'g',
    Kilogram = 'kg',
    Pound = 'lb',
    Ounce = 'oz',
    Milliliter = 'ml',
    Liter = 'l',
    Cup = 'cup',
    Whole = 'whole',
    Sachet = 'sachet'
}

interface RecipieIngredient extends Ingredient{
    quantity: number
    unit: MeasurementUnit
}


interface Source{
    name: string
    url?: string
    book?: {title: string, pageNo: number}
}

interface Recipe{
    id: number | string
    title: string
    ingredients: RecipieIngredient[]
    source: Source
    instructions: string[];
    image: string;
    cookTime: number;
    prepTime?: number;
    servingSize: number;
}
export type { Ingredient, MeasurementUnit, RecipieIngredient, Source, Recipe };