// import RecipeCard from '@/features/recipes/components/RecipeCard';
// import useMealPlannerContext from '@/hooks/useMealPlannerContext';

import AddIcon from "@mui/icons-material/Add";
import plannerJson from "../../../planner.json";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import { RecipeDTO } from "@/types";

//Make more robust to handle multiple words, handle white spaces
const stringToTitleCase = (day: string) => day[0].toUpperCase() + day.slice(1);
const MEAL_TYPE = ["breakfast", "lunch", "dinner"] as const;
type MealType = (typeof MEAL_TYPE)[number];

const EmptyCard = () => {
  return (
    <div className="flex justify-center rounded-2xl border-gray-200 border-2 shadow-md p-4">
      <button className="flex flex-col justify-center">
        <AddIcon sx={{ fontSize: "10rem" }} />
        Add Meal
      </button>
    </div>
  );
};

const MealCard = ({
  meal,
  mealType,
}: {
  meal?: RecipeDTO;
  mealType: MealType;
}) => {
  return (
    <>
      <p className="rounded-xl border-2 inline-block p-2 text-xs lg:hidden">
        {stringToTitleCase(mealType)}
      </p>
      {meal ? (
        <div className="w-full rounded-2xl border-gray-200 border-2 shadow-md h-full lg:grid lg:grid-rows-[1fr_auto]">
          <img
            src={meal?.image}
            alt={meal?.title}
            className="w-full h-full object-cover rounded-t-xl aspect-16/9"
          />
          <div className="p-4">
            <p className="rounded-xl border-2 inline-block p-2 text-xs">
              {stringToTitleCase(mealType)}
            </p>
            <p>{meal?.title}</p>
          </div>
        </div>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

const DailySection = ({
  day,
  meals,
}: {
  day: string;
  meals?: { breakfast?: number[]; lunch?: number[]; dinner?: number[] };
}) => {
  // Possibley go back to getting getRecipeById instead of using hook, overkill maybe
  const mealData = {
    breakfast: useRecipe(meals?.breakfast?.[0]),
    lunch: useRecipe(meals?.lunch?.[0]),
    dinner: useRecipe(meals?.dinner?.[0]),
  };

  return (
    <div className="border-gray-200 border-2 shadow-md rounded-lg flex flex-col lg:flex-row mx-auto gap-2 items-start p-4 w-96 lg:w-full lg:justify-center lg:items-center">
      <header>
        <h1 className="font-bold">{stringToTitleCase(day)}</h1>
      </header>
      {/* <div className="space-y-4 lg:flex lg:space-x-4"> */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        {MEAL_TYPE.map((mealType) => {
          return (
            <MealCard
              key={mealType}
              mealType={mealType}
              meal={mealData[mealType]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Planner = () => {
  const DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  // const { days: daysJson } = plannerJson;
  const days = plannerJson?.days ?? [];

  type DaysType = (typeof DAYS)[number];

  const weeklyPlanner = DAYS.map((day: DaysType) => (
    <DailySection day={day} meals={days[day]} key={day} />
  ));

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-center">Planner</h1>
          <div className="flex flex-col lg:flex-row md:flex-wrap justify-center">
            {weeklyPlanner}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
