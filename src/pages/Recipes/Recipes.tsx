import { useEffect, useState } from "react";
import { RecipeDTO } from "../../types";
import RecipeCard from "../../components/Recipe/RecipeCard";
import { getAllRecipes } from "../../services/recipeServices";
import Select from "react-select";
import { getAllIngredients } from "../../services/ingredientServices";

interface Filters {
  source: string;
  includeIngredients: string[];
  excludeIngredients: string[];
  maxCookingTime: number | null;
}

const Recipes = () => {
  const [recipes, setRecipes] = useState<RecipeDTO[]>();
  const [filters, setFilters] = useState<Filters>({
    source: "",
    includeIngredients: [],
    excludeIngredients: [],
    maxCookingTime: null,
  });
  const [sources, setSources] = useState<string[]>();
  const [ingredients, setIngredients] = useState<string[]>();

  interface SelectOptions {
    label: string;
    value: string | number;
  }

  const cookTimeOptions: SelectOptions[] = [
    { label: "Under 30 Mins", value: 30 },
    { label: "Under an hour", value: 59 },
    { label: "Over an hour", value: 60 },
  ];

  useEffect(() => {
    const updateSourceOptions = (data: RecipeDTO[]) => {
      const uniqueSource = new Set<string>();
      data.forEach((recipe: RecipeDTO) => uniqueSource.add(recipe.source.name));
      setSources([...uniqueSource]);
    };

    const updateIngredientOptions = async () => {
      const data = await getAllIngredients();
      setIngredients(data.map((ingredient) => ingredient.name));
    };

    const fetchRecipes = async () => {
      const data: RecipeDTO[] = await getAllRecipes();
      setRecipes(data);
      updateSourceOptions(data);
      updateIngredientOptions();
    };

    fetchRecipes();
  }, []);

  const filterRecipes = (): RecipeDTO[] => {
    if (!recipes) return [];

    let filteredList = [...recipes];

    if (filters.source && filters.source !== "All") {
      filteredList = filteredList.filter(
        (recipe) => recipe.source.name === filters.source
      );
    }

    if (filters.maxCookingTime) {
      const maxTime = filters.maxCookingTime;

      if (filters.maxCookingTime === 30 || filters.maxCookingTime === 59) {
        filteredList = filteredList.filter(
          (recipe) => recipe.cookTime + recipe.prepTime <= maxTime
        );
      } else if (filters.maxCookingTime >= 100) {
        filteredList = filteredList.filter(
          (recipe) => recipe.cookTime + recipe.prepTime >= maxTime
        );
      }
    }

    if (filters.includeIngredients.length >= 1) {
      //Strict match
      filteredList = filteredList.filter((recipe) =>
        filters.includeIngredients.every((includeIngredient) =>
          recipe.ingredients.some(
            (ingredient) => ingredient.name === includeIngredient
          )
        )
      );
      //Looser match
      // filteredList = filteredList.filter((recipe) =>
      //   recipe.ingredients.some((ingredient) =>
      //     filters.includeIngredients.includes(ingredient.name)
      //   )
      // );
    }

    if (filters.excludeIngredients.length >= 1) {
      filteredList = filteredList.filter((recipe) =>
        !recipe.ingredients.some((ingredient) =>
          filters.excludeIngredients.includes(ingredient.name)
        )
      );
    }
    
    return filteredList;
  };
  const handleChange = (
    selectedOption:
      | { value: string | number; label: string }
      | Array<{ value: string; label: string }>
      | null,
    actionMeta: { name?: string }
  ) => {
    if (actionMeta.name) {
      if (Array.isArray(selectedOption)) {
        // Multi-select: selectedOption is an array
        const values = selectedOption.map((option) => option.value);
        setFilters({ ...filters, [actionMeta.name]: values });
      } else if (selectedOption) {
        // Single-select: selectedOption is an object
        setFilters({ ...filters, [actionMeta.name]: selectedOption.value });
      } else {
        // Handle clearing the selection
        setFilters({ ...filters, [actionMeta.name]: null });
      }
    }
  };

  const populateSelectOptions = (list?: string[]) => {
    if (!list) {
      return [{ label: "loading", value: "loading" }];
    }
    const optionsList = list.map((selection: string) => ({
      value: selection,
      label: selection,
    }));
    optionsList.unshift({ label: "All", value: "All" });
    // console.log(optionsList);
    return optionsList;
  };

  const renderRecipes = (currentRecipes: RecipeDTO[]) => {
    const renderedList = currentRecipes?.map((recipe: RecipeDTO) => {
      return <RecipeCard key={`rc${recipe.id}`} recipe={recipe} />;
    });
    // Possibley handle no matches better later
    return renderedList.length > 0 ? renderedList : <p>No Recipes</p>;
  };

  return (
    <div className="w-full pt-20">
      <div className="container mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-center">Recipes</h1>
          <div>
            <input
              type="search"
              name="search"
              className="border-2 border-blue-600 rounded-md"
              placeholder="Search by recipe"
            />
            <div className="flex space-x-2">
              <label htmlFor="souce">
                Source:
                <Select
                  value={
                    filters.source
                      ? { value: filters.source, label: filters.source }
                      : null
                  }
                  name="source"
                  options={populateSelectOptions(sources)}
                  onChange={(value, action) => handleChange(value, action)}
                />
              </label>
              <label htmlFor="maxCookingTime">
                Total Cooktime:
                <Select
                  name="maxCookingTime"
                  options={cookTimeOptions}
                  onChange={(value, action) => handleChange(value, action)}
                  isClearable
                />
              </label>
              <label>
                Includes:
                <Select
                  isMulti
                  name="includeIngredients"
                  options={populateSelectOptions(ingredients)}
                  onChange={(value, action) => handleChange(value, action)}
                />
              </label>
              <label>
                Excludes:
                <Select
                  isMulti
                  name="excludeIngredients"
                  onChange={(value, action) => handleChange(value, action)}

                  options={populateSelectOptions(
                    ingredients?.filter(
                      (ingredient) =>
                        !filters.includeIngredients.includes(ingredient)
                    )
                  )}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center">
            {recipes && renderRecipes(filterRecipes())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
