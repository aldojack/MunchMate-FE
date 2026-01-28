
import RecipeContainer from "@/features/recipes/components/RecipeContainer";
import Hero from "@/features/home/components/Hero";
import ShoppingListInfo from "@/features/home/components/ShoppingListInfo";


const Home = () => {
  return (
    <div className="container mx-auto px-8 md:px-0">
      <Hero />
      <ShoppingListInfo />
      <RecipeContainer />
    </div>
  );
};

export default Home;
