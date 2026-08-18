import RecipeCard from "@/features/recipes/components/RecipeCard";
import { Link } from "react-router-dom";
import useRecipeContext from "@/hooks/useRecipeContext";

const RecipeContainer = () => {
  const { recipes } = useRecipeContext();

  const renderRecipeCards: JSX.Element[] | undefined = recipes?.map(
    (recipe, index) => {
      return <RecipeCard key={`rc${recipe.id}-${index}`} recipe={recipe} />;
    },
  );

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-text mb-4">
            Popular <span className="text-primary font-bold">Recipes</span>
          </h1>
          <p className="text-lg text-text/70 max-w-2xl mb-8">
            Discover mouthwatering dishes from renowned chefs and home cooks
            alike. Save your favorites and build your personal recipe
            collection.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/recipes"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Recipes
            </Link>
            <Link
              to="/planner"
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Plan Your Meals
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
          {recipes ? (
            renderRecipeCards
          ) : (
            <div className="text-text/50 text-xl">
              Loading delicious recipes...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeContainer;
