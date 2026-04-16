import RecipeContainer from "@/features/recipes/components/RecipeContainer";
import Hero from "@/features/home/components/Hero";
import ShoppingListInfo from "@/features/home/components/ShoppingListInfo";
import HowItWorks from "@/features/home/components/HowItWorks";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ShoppingListInfo />
      <HowItWorks />
      <RecipeContainer />
    </div>
  );
};

export default Home;
