import { useEffect, useState, FC } from "react";
import { RecipeDTO } from "@/types/index";
import { useParams } from "react-router-dom";
import { getRecipeById } from "@/features/recipes/services/recipeServices";

const placeholder = "/images/placeholder.webp";

const Recipe: FC = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeDTO>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setIsLoading(true);
        const data: RecipeDTO = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (recipeId) {
      getRecipe();
    }
  }, [recipeId]);

  return (
    <main className="min-h-screen bg-background/50 py-16 text-text">
      {!recipe || isLoading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-xl text-text/70">Loading recipe...</p>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img
              className="w-full h-72 object-cover md:h-[38rem]"
              src={recipe?.image ? recipe.image : placeholder}
              alt={
                recipe?.image ? recipe.title : "coming soon image for recipe"
              }
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] mt-10">
            <section className="rounded-[2rem] border border-primary/10 bg-background/95 p-8 shadow-xl">
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-text">
                  {recipe.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm text-text/70">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                    Cook Time: {recipe.cookTime} mins
                  </span>
                  <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1">
                    Prep Time: {recipe.prepTime} mins
                  </span>
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1">
                    Serves: {recipe.servingSize}
                  </span>
                </div>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-text">
                    Ingredients
                  </h2>
                  <ul className="mt-4 grid gap-3 text-text/80 list-disc list-inside">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={`${ingredient.name}${ingredient.id}`}>
                        {ingredient.quantity} {ingredient.unit}{" "}
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-text">
                    Instructions
                  </h2>
                  <ol className="mt-4 space-y-3 text-text/80 list-decimal list-inside">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={`step-${instruction.slice(0, 8)}-${index}`}>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                {recipe.source.url && (
                  <a
                    href={recipe.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                  >
                    Source: {recipe.source.name}
                  </a>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-primary/10 bg-background/95 p-6 shadow-xl">
                <h2 className="text-2xl font-semibold text-text">
                  Recipe details
                </h2>
                <div className="mt-4 space-y-3 text-text/80">
                  {/*Maybe revisit for more details for recipe */}
                  <p>
                    <span className="font-semibold text-text">Category: </span>
                    Everyday
                  </p>
                  <p>
                    <span className="font-semibold text-text">Source: </span>
                    {recipe.source.name}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
};

export default Recipe;
