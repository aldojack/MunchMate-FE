import Hero from "@/features/home/components/Hero";
import HowItWorks from "@/features/home/components/HowItWorks";
import ShoppingListInfo from "@/features/home/components/ShoppingListInfo";
import RecipeContainer from "@/features/recipes/components/RecipeContainer";

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
