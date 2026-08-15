import { RecipeDTO } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import PlannerModal from "./PlannerModal";
import { useState } from "react";

const placeholder = "/images/placeholder.webp";

type RecipeCardProps = {
  recipe: RecipeDTO;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-background/90 shadow-lg transition duration-300 hover:-translate-y-1 min-w-[340px]">
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
        <div className="flex flex-1 flex-col px-6 py-4 gap-4">
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
            <button
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              onClick={() => setOpen(true)}
              type="button"
            >
              Add <AddIcon className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <PlannerModal
        open={open}
        toggleModal={() => setOpen((prev) => !prev)}
        mealId={recipe.id}
      />
    </>
  );
};

export default RecipeCard;
