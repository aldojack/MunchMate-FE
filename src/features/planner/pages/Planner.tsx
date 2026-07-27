import useMealPlannerContext from "@/hooks/useMealPlannerContext";
import AddIcon from "@mui/icons-material/Add";
import { RecipeDTO, DayPlanner, DaysType, MealType } from "@/types";
import { defaultPlanner } from "../constants";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import { stringToTitleCase } from "@/utils/helperFunction";
import { DAYS, MEAL_TYPES } from "@/constants/constants";

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
  meals,
  mealType,
}: {
  meals?: RecipeDTO[];
  mealType: MealType;
}) => {
  const placeholder = "/images/placeholder.webp";
  return (
    <>
      <p className="rounded-xl border-2 inline-block p-2 text-xs lg:hidden">
        {stringToTitleCase(mealType)}
      </p>
      {meals ? (
        meals.map((meal) => (
          <div
            className="w-full rounded-2xl border-gray-200 border-2 shadow-md h-full lg:grid lg:grid-rows-[1fr_auto]"
            key={meal?.id}
          >
            <img
              src={meal?.image ? meal.image : placeholder}
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
        ))
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

const DailySection = ({ day, meals }: { day: string; meals: DayPlanner }) => {
  //Revist useRecipe name and possible uses
  const { data } = useRecipe(meals);

  return (
    <div className="border-gray-200 border-2 shadow-md rounded-lg flex flex-col lg:flex-row mx-auto gap-2 items-start p-4 w-96 lg:w-full lg:justify-center lg:items-center">
      <header>
        <h1 className="font-bold">{stringToTitleCase(day)}</h1>
      </header>
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        {MEAL_TYPES.map((mealType) => {
          return (
            <MealCard
              key={mealType}
              mealType={mealType}
              meals={data[mealType]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Planner = () => {
  const { planner } = useMealPlannerContext();
  // const DAYS = [
  //   "monday",
  //   "tuesday",
  //   "wednesday",
  //   "thursday",
  //   "friday",
  //   "saturday",
  //   "sunday",
  // ] as const;

  const currentPlanner = planner ?? defaultPlanner;

  const weeklyPlanner = DAYS.map((day: DaysType) => (
    <DailySection day={day} meals={currentPlanner[day]} key={day} />
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
