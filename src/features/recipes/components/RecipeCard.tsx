import FavoriteIcon from "@mui/icons-material/Favorite";
import { RecipeDTO } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Link } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorageUtil";
import { useMealPlannerContext } from "@/hooks/useMealPlannerContext";

const placeholder = "/images/placeholder.webp";

interface RecipeCardProps {
  recipe: RecipeDTO;
  isPlanner?: boolean;
}

const RecipeCard = ({ recipe, isPlanner = false }: RecipeCardProps) => {
  const context = useMealPlannerContext();
  const { setMeals } = context;

  function addToPlanner(): void {
    const currentMeals: RecipeDTO[] | null =
      getLocalStorage<RecipeDTO[]>("planner");
    if (currentMeals) {
      currentMeals.push(recipe);
      setLocalStorage<RecipeDTO[]>("planner", currentMeals);
      setMeals(currentMeals);
    } else {
      setLocalStorage<RecipeDTO[]>("planner", [recipe]);
      setMeals([recipe]);
    }
  }

  function removeFromPlanner(): void {
    const currentMeals: RecipeDTO[] | null =
      getLocalStorage<RecipeDTO[]>("planner");
    if (currentMeals) {
      const index = currentMeals.findIndex(
        (meal) => meal.title === recipe.title,
      );
      if (index !== -1) {
        currentMeals.splice(index, 1);
        setLocalStorage<RecipeDTO[]>("planner", currentMeals);
        setMeals(currentMeals);
      }
    }
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-background/90 shadow-lg transition duration-300 hover:-translate-y-1">
      <Link to={`/recipe/${recipe.id}`} className="block overflow-hidden">
        <img
          src={recipe?.image ? recipe.image : placeholder}
          alt={
            recipe.title
              ? recipe.title
              : "placeholder for recipe image coming soon"
          }
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text">{recipe.title}</h2>
          <div className="flex flex-wrap gap-2 text-sm text-text/70">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
              Prep {recipe.prepTime}m
            </span>
            <span className="rounded-full border border-primary/20 bg-accent/10 px-3 py-1">
              Cook {recipe.cookTime}m
            </span>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-3">
          {isPlanner ? (
            <>
              <Link
                to={`/recipe/${recipe.id}`}
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Cook <RestaurantIcon className="ml-2" />
              </Link>
              <button
                className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90"
                onClick={() => removeFromPlanner()}
              >
                Remove <DeleteIcon className="ml-2" />
              </button>
            </>
          ) : (
            <>
              <button
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                onClick={() => addToPlanner()}
              >
                Add <AddIcon className="ml-2" />
              </button>
              <button className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90">
                Favourite <FavoriteIcon className="ml-2" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
