import { useEffect, useState } from "react";
import { RecipeDTO } from "../../types";
import RecipeCard from "../../components/Recipe/RecipeCard";
import { getAllRecipes } from "../../services/recipeServices";
import Select, {SingleValue, MultiValue} from "react-select";
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
  const [searchTerm, setSearchTerm] = useState<string>("");

  interface SelectOptions {
    label: string;
    value: string;
  }

  const cookTimeOptions: SelectOptions[] = [
    { label: "Under 30 Mins", value: '30' },
    { label: "Under an hour", value: '59' },
    { label: "Over an hour", value: '60' },
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

    if(searchTerm){
      filteredList = filteredList.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    

    return filteredList;
  };
  const handleChange = (
    selectedOption: SingleValue<{ value: string ; label: string }> | MultiValue<{ value: string; label: string }>,
    actionMeta: { name?: string }
  ) => {
    if (actionMeta.name) {
      if (Array.isArray(selectedOption)) {
        // Multi-select: selectedOption is an array
        const values = selectedOption.map((option) => option.value);
        setFilters({ ...filters, [actionMeta.name]: values });
      } else if (selectedOption && !Array.isArray(selectedOption) && 'value' in selectedOption) {
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
          <div className="flex flex-col justify-center items-center">
            <input
              type="search"
              name="search"
              onChange={(event) => setSearchTerm(event.target.value)}
              className="border-2 border-blue-600 rounded-md w-2/3 p-2 text-center"
              placeholder="Search by recipe"
              value={searchTerm}
            />
            <div className="grid grid-cols-2 md:flex space-x-4 place-content-center">
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
              <label htmlFor="includeIngredients">
                Includes:
                <Select
                  isMulti
                  name="includeIngredients"
                  options={populateSelectOptions(
                    ingredients?.filter(
                      (ingredient) =>
                        !filters.excludeIngredients.includes(ingredient)
                    )
                  )}
                  onChange={(value, action) => handleChange(value, action)}
                />
              </label>
              <label htmlFor="excludeIngredients">
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
