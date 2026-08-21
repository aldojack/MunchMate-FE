import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import type { DayPlanner, DaysType, MealType } from "../types";
import type { Recipe } from "@/features/recipes/types";
import { defaultPlanner } from "../constants";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import { stringToTitleCase } from "@/utils/stringUtils";
import { DAYS, MEAL_TYPES } from "../types";
import useMealPlannerContext from "@/hooks/useMealPlannerContext";
import useRecipeContext from "@/hooks/useRecipeContext";
import { Link } from "react-router-dom";

type EditorMode = "add" | "move";

type EditorState = {
  open: boolean;
  mode: EditorMode;
  sourceDay: DaysType | null;
  sourceMealType: MealType | null;
  mealId: number | null;
};

const RecipeTile = ({
  meal,
  day,
  mealType,
  onMove,
  onRemove,
}: {
  meal: Recipe;
  day: DaysType;
  mealType: MealType;
  onMove: (day: DaysType, mealType: MealType, mealId: number) => void;
  onRemove: (day: DaysType, mealType: MealType, mealId: number) => void;
}) => {
  const placeholder = "/images/placeholder.webp";

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
      <Link to={`/recipe/${meal.id}`}>
        <img
          src={meal.image ? meal.image : placeholder}
          alt={meal.title}
          className="h-28 w-full object-cover"
        />
      </Link>
      <div className="space-y-3 p-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{meal.title}</p>
          <p className="mt-1 text-xs text-slate-500">
            Prep {meal.prepTime}m • Cook {meal.cookTime}m
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onMove(day, mealType, meal.id)}
            className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
          >
            <OpenWithIcon sx={{ fontSize: "0.9rem" }} />
            <span className="ml-1">Move</span>
          </button>
          <button
            type="button"
            onClick={() => onRemove(day, mealType, meal.id)}
            className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600"
          >
            <span className="ml-1">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MealSlotCard = ({
  day,
  mealType,
  meals,
  onAdd,
  onMove,
  onRemove,
}: {
  day: DaysType;
  mealType: MealType;
  meals: Recipe[];
  onAdd: (day: DaysType, mealType: MealType) => void;
  onMove: (day: DaysType, mealType: MealType, mealId: number) => void;
  onRemove: (day: DaysType, mealType: MealType, mealId: number) => void;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">
          {stringToTitleCase(mealType)}
        </p>
      </div>

      {meals.length > 0 ? (
        <div className="space-y-2">
          {meals.map((meal) => (
            <RecipeTile
              key={meal.id}
              meal={meal}
              day={day}
              mealType={mealType}
              onMove={onMove}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-3 py-4 text-sm text-slate-500">
          <div className="flex items-center justify-between gap-2">
            <span>No recipe planned yet.</span>
            <button
              type="button"
              onClick={() => onAdd(day, mealType)}
              className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary"
            >
              <AddIcon sx={{ fontSize: "0.9rem" }} />
              <span className="ml-1">Add</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DailySection = ({
  day,
  meals,
  onAdd,
  onMove,
  onRemove,
}: {
  day: DaysType;
  meals: DayPlanner;
  onAdd: (day: DaysType, mealType: MealType) => void;
  onMove: (day: DaysType, mealType: MealType, mealId: number) => void;
  onRemove: (day: DaysType, mealType: MealType, mealId: number) => void;
}) => {
  const { data } = useRecipe(meals);
  const mealCount = MEAL_TYPES.reduce(
    (total, mealType) => total + data[mealType].length,
    0,
  );

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-background p-5 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-xl font-semibold">{stringToTitleCase(day)}</h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {mealCount} planned meals
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {MEAL_TYPES.map((mealType) => (
          <MealSlotCard
            key={mealType}
            day={day}
            mealType={mealType}
            meals={data[mealType]}
            onAdd={onAdd}
            onMove={onMove}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
};

const Planner = () => {
  const { planner, addToPlanner, removeFromPlanner, moveMeal } =
    useMealPlannerContext();
  const { recipes } = useRecipeContext();
  const [editor, setEditor] = useState<EditorState>({
    open: false,
    mode: "add",
    sourceDay: null,
    sourceMealType: null,
    mealId: null,
  });
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [targetDay, setTargetDay] = useState<DaysType>("monday");
  const [targetMealType, setTargetMealType] = useState<MealType>("breakfast");

  const currentPlanner = planner ?? defaultPlanner;

  const openEditor = (
    mode: EditorMode,
    day: DaysType,
    mealType: MealType,
    mealId?: number,
  ) => {
    setEditor({
      open: true,
      mode,
      sourceDay: day,
      sourceMealType: mealType,
      mealId: mealId ?? null,
    });
    setSelectedRecipeId(mealId ?? null);
    setTargetDay(day);
    setTargetMealType(mealType);
  };

  const closeEditor = () => {
    setEditor({
      open: false,
      mode: "add",
      sourceDay: null,
      sourceMealType: null,
      mealId: null,
    });
    setSelectedRecipeId(null);
    setTargetDay("monday");
    setTargetMealType("breakfast");
  };

  const handleSave = () => {
    if (editor.mode === "add") {
      if (!selectedRecipeId || !targetDay || !targetMealType) return;
      addToPlanner({
        day: targetDay,
        mealType: targetMealType,
        mealId: selectedRecipeId,
      });
    }

    if (
      editor.mode === "move" &&
      editor.sourceDay &&
      editor.sourceMealType &&
      editor.mealId &&
      targetDay &&
      targetMealType
    ) {
      moveMeal({
        fromDay: editor.sourceDay,
        fromMealType: editor.sourceMealType,
        mealId: editor.mealId,
        toDay: targetDay,
        toMealType: targetMealType,
      });
    }

    closeEditor();
  };

  return (
    <div className="w-full bg-background px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Weekly planning
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Shape your week with ease
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base">
            Add meals to any day, swap them between slots, and remove anything
            that no longer fits your plan.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {DAYS.map((day: DaysType) => (
            <DailySection
              day={day}
              meals={currentPlanner[day]}
              key={day}
              onAdd={(selectedDay, selectedMealType) =>
                openEditor("add", selectedDay, selectedMealType)
              }
              onMove={(selectedDay, selectedMealType, mealId) =>
                openEditor("move", selectedDay, selectedMealType, mealId)
              }
              onRemove={(selectedDay, selectedMealType, mealId) =>
                removeFromPlanner({
                  day: selectedDay,
                  mealType: selectedMealType,
                  mealId,
                })
              }
            />
          ))}
        </div>
      </div>

      {editor.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {editor.mode === "add" ? "Add a recipe" : "Move this meal"}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {editor.mode === "add"
                    ? "Choose a recipe and decide where it belongs in your week."
                    : "Select a new home for this meal in your planner."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {editor.mode === "add" ? (
                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Recipe</span>
                  <select
                    value={selectedRecipeId ?? ""}
                    onChange={(event) =>
                      setSelectedRecipeId(Number(event.target.value))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800"
                  >
                    <option value="">Select a recipe</option>
                    {recipes?.map((recipe) => (
                      <option key={recipe.id} value={recipe.id}>
                        {recipe.title}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <div className="rounded-2xl bg-primary/5 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Moving from</p>
                  <p className="mt-1">
                    {editor.sourceDay
                      ? stringToTitleCase(editor.sourceDay)
                      : ""}{" "}
                    ·{" "}
                    {editor.sourceMealType
                      ? stringToTitleCase(editor.sourceMealType)
                      : ""}
                  </p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Day</span>
                  <select
                    value={targetDay}
                    onChange={(event) =>
                      setTargetDay(event.target.value as DaysType)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800"
                  >
                    {DAYS.map((day) => (
                      <option key={day} value={day}>
                        {stringToTitleCase(day)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Meal slot</span>
                  <select
                    value={targetMealType}
                    onChange={(event) =>
                      setTargetMealType(event.target.value as MealType)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800"
                  >
                    {MEAL_TYPES.map((mealType) => (
                      <option key={mealType} value={mealType}>
                        {stringToTitleCase(mealType)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                {editor.mode === "add" ? "Save meal" : "Move meal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;
