import { useEffect, useState } from "react";
import type { Recipe } from "../types";
import RecipeCard from "@/features/recipes/components/RecipeCard";
import type { SingleValue, MultiValue, StylesConfig } from "react-select";
import Select from "react-select";
import { getAllIngredients } from "@/features/recipes/api/ingredients";
import useRecipeContext from "@/hooks/useRecipeContext";

type Filters = {
  source: string;
  includeIngredients: string[];
  excludeIngredients: string[];
  maxCookingTime: string | null;
};

const FilterRecipes = () => {
  const { recipes } = useRecipeContext();
  const [filters, setFilters] = useState<Filters>({
    source: "",
    includeIngredients: [],
    excludeIngredients: [],
    maxCookingTime: null,
  });
  const [sources, setSources] = useState<string[]>();
  const [ingredients, setIngredients] = useState<string[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  type SelectOptions = {
    label: string;
    value: string;
  };

  const cookTimeOptions: SelectOptions[] = [
    { label: "Under 30 Mins", value: "30" },
    { label: "Under an hour", value: "59" },
    { label: "Over an hour", value: "60" },
  ];

  useEffect(() => {
    const updateSourceOptions = (data: Recipe[]) => {
      const uniqueSource = new Set<string>();
      data.forEach((recipe: Recipe) => uniqueSource.add(recipe.source.name));
      setSources([...uniqueSource]);
    };

    const updateIngredientOptions = async () => {
      const data = await getAllIngredients();
      setIngredients(data.map((ingredient) => ingredient.name));
    };

    const fetchRecipes = () => {
      if (!recipes) return;
      updateSourceOptions(recipes);
      updateIngredientOptions();
    };

    fetchRecipes();
  }, [recipes]);

  const filterRecipes = (): Recipe[] => {
    if (!recipes) return [];

    let filteredList = [...recipes];

    if (filters.source && filters.source !== "All") {
      filteredList = filteredList.filter(
        (recipe) => recipe.source.name === filters.source,
      );
    }

    if (filters.maxCookingTime) {
      const maxTime = Number(filters.maxCookingTime);

      if (
        Number(filters.maxCookingTime) === 30 ||
        Number(filters.maxCookingTime) === 59
      ) {
        filteredList = filteredList.filter(
          (recipe) =>
            Number(recipe.cookTime) + Number(recipe.prepTime) <= maxTime,
        );
      } else if (Number(filters.maxCookingTime) >= 60) {
        filteredList = filteredList.filter(
          (recipe) => recipe.cookTime + recipe.prepTime >= maxTime,
        );
      }
    }

    if (filters.includeIngredients.length >= 1) {
      //Strict match
      filteredList = filteredList.filter((recipe) =>
        filters.includeIngredients.every((includeIngredient) =>
          recipe.ingredients.some(
            (ingredient) => ingredient.name === includeIngredient,
          ),
        ),
      );
      //Looser match
      // filteredList = filteredList.filter((recipe) =>
      //   recipe.ingredients.some((ingredient) =>
      //     filters.includeIngredients.includes(ingredient.name)
      //   )
      // );
    }

    if (filters.excludeIngredients.length >= 1) {
      filteredList = filteredList.filter(
        (recipe) =>
          !recipe.ingredients.some((ingredient) =>
            filters.excludeIngredients.includes(ingredient.name),
          ),
      );
    }

    if (searchTerm) {
      filteredList = filteredList.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filteredList;
  };
  const handleChange = (
    selectedOption:
      | SingleValue<{ value: string; label: string }>
      | MultiValue<{ value: string; label: string }>,
    actionMeta: { name?: string },
  ) => {
    if (actionMeta.name) {
      if (Array.isArray(selectedOption)) {
        // Multi-select: selectedOption is an array
        const values = selectedOption.map((option) => option.value);
        setFilters({ ...filters, [actionMeta.name]: values });
      } else if (
        selectedOption &&
        !Array.isArray(selectedOption) &&
        "value" in selectedOption
      ) {
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

  const renderRecipes = (currentRecipes: Recipe[]) => {
    const renderedList = currentRecipes?.map((recipe: Recipe) => {
      return <RecipeCard key={`rc${recipe.id}`} recipe={recipe} />;
    });
    // Possibley handle no matches better later
    return renderedList.length > 0 ? renderedList : <p>No Recipes</p>;
  };

  const selectStyles: StylesConfig<SelectOptions, boolean> = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "var(--background)",
      borderColor: "var(--text)",
      minHeight: "48px",
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      color: "black",
    }),
  };

  return (
    <main className="min-h-screen bg-background/50 py-16 text-text">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Discover recipes
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-text">
            Find the perfect meal for any moment.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-text/70">
            Search, filter, and refine your recipe collection by source, prep
            time, and ingredients.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-12">
          <div className="rounded-[2rem] border border-primary/10 bg-background/95 p-6 shadow-xl">
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-text/70 mb-2"
                htmlFor="search"
              >
                Search recipes
              </label>
              <input
                id="search"
                type="search"
                name="search"
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-3xl border border-text bg-background px-4 py-3 text-text shadow-sm outline-none transition focus:border-primary/50"
                placeholder="Search by recipe"
                value={searchTerm}
              />
            </div>

            <div className="grid gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-text/70 mb-2"
                  htmlFor="source-select"
                >
                  Source
                </label>
                <Select
                  inputId="source-select"
                  value={
                    filters.source
                      ? { value: filters.source, label: filters.source }
                      : null
                  }
                  name="source"
                  options={populateSelectOptions(sources)}
                  onChange={(value, action) => handleChange(value, action)}
                  styles={selectStyles}
                  placeholder="All sources"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-text/70 mb-2"
                  htmlFor="cooktime-select"
                >
                  Total cook time
                </label>
                <Select
                  inputId="cooktime-select"
                  name="maxCookingTime"
                  options={cookTimeOptions}
                  onChange={(value, action) => handleChange(value, action)}
                  isClearable
                  styles={selectStyles}
                  placeholder="Any time"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-text/70 mb-2"
                  htmlFor="includes-select"
                >
                  Includes
                </label>
                <Select
                  inputId="includes-select"
                  isMulti
                  name="includeIngredients"
                  options={populateSelectOptions(
                    ingredients?.filter(
                      (ingredient) =>
                        !filters.excludeIngredients.includes(ingredient),
                    ),
                  )}
                  onChange={(value, action) => handleChange(value, action)}
                  styles={selectStyles}
                  placeholder="Any ingredient"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-text/70 mb-2"
                  htmlFor="excludes-select"
                >
                  Excludes
                </label>
                <Select
                  inputId="excludes-select"
                  isMulti
                  name="excludeIngredients"
                  onChange={(value, action) => handleChange(value, action)}
                  styles={selectStyles}
                  placeholder="Exclude ingredients"
                  options={populateSelectOptions(
                    ingredients?.filter(
                      (ingredient) =>
                        !filters.includeIngredients.includes(ingredient),
                    ),
                  )}
                />
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-primary/10 bg-background/95 p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-text/70">Total recipes</p>
                <p className="mt-2 text-3xl font-semibold text-text">
                  {filterRecipes().length}
                </p>
              </div>
              <div className="rounded-3xl bg-primary/10 p-5">
                <p className="text-sm font-semibold text-primary">Tip</p>
                <p className="mt-2 text-text/80">
                  Use the ingredient selectors to narrow results quickly and
                  find meals you already have the ingredients for.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {recipes && renderRecipes(filterRecipes())}
        </div>
      </div>
    </main>
  );
};

export default FilterRecipes;
