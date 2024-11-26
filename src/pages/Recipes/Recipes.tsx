import { useEffect, useState } from "react";
import { RecipeDTO } from "../../types";
import RecipeCard from "../../components/Recipe/RecipeCard";
import { getAllRecipes } from "../../services/recipeServices";

const Recipes = () => {
  const [recipes, setRecipes] = useState<RecipeDTO[]>();
  const [filters, setFilters] = useState({
    source: "",
    includeIngredients: [],
    excludeIngredients: [],
    maxCookingTime: null,
  });
  const [sources, setSources] = useState<string[]>();

  useEffect(() => {
    const updateSourceOptions = (data: RecipeDTO[]) => {
      const uniqueSource = new Set<string>();
      data.forEach((recipe: RecipeDTO) => uniqueSource.add(recipe.source.name));
      setSources([...uniqueSource]);
    };

    const fetchRecipes = async () => {
      const data: RecipeDTO[] = await getAllRecipes();
      setRecipes(data);
      updateSourceOptions(data);
    };

    fetchRecipes();
  }, []);

  const filterRecipes = (): RecipeDTO[] => {
    if (!recipes) return [];

    let filteredList = [...recipes];
    if (filters.source && filters.source !== "all") {
      filteredList = filteredList.filter(
        (recipe) => recipe.source.name === filters.source
      );
    }
    if(filters.maxCookingTime){
        const maxTime = filters.maxCookingTime;
        switch(filters.maxCookingTime){
            case 30: {
                filteredList = filteredList.filter((recipe) => recipe.cookTime + recipe.prepTime <= maxTime)
                break;
            }
            case 60: {
                filteredList = filteredList.filter((recipe) => recipe.cookTime + recipe.prepTime <= maxTime)
                break;
            }
            case 100: {
                filteredList = filteredList.filter((recipe) => recipe.cookTime + recipe.prepTime >= maxTime)
                break;
            }
            default: {
                break
            }
        }
    }
    console.log(filteredList.length)
    return filteredList;
  };

  const renderRecipes = (currentRecipes: RecipeDTO[]) => {
    const renderedList = currentRecipes?.map((recipe: RecipeDTO) => {
      return <RecipeCard key={`rc${recipe.id}`} recipe={recipe} />;
    });
    // Possibley handle no matches better later
    return renderedList.length >0 ? renderedList : <p>No Recipes</p>
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
            <div  className="flex space-x-2">
              <label htmlFor="souce">
                Source:
                <select
                  name="source"
                  className="border-2 border-black rounded-md"
                  onChange={(e) =>
                    setFilters({ ...filters, [e.target.name]: e.target.value })
                  }
                >
                  <option value="all">All</option>
                  {sources?.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="maxCookingTime">Total Cooktime:
                <select
                  name="maxCookingTime"
                  className="border-2 border-black rounded-md"
                  onChange={(e) =>
                    setFilters({ ...filters, [e.target.name]: parseInt(e.target.value) })
                  }
                >
                    <option value="0">All</option>
                    <option value="30">Under 30 Mins</option>
                    <option value="60">Under an hour</option>
                    <option value="100">Over an hour</option>
                </select>
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
