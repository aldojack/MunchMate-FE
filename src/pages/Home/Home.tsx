
import RecipeContainer from "../../features/recipes/RecipeContainer";
import Hero from "./Hero";
import ShoppingListInfo from "./ShoppingListInfo";


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
