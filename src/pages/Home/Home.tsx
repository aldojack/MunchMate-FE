
import RecipeContainer from "../../features/recipes/RecipeContainer";
import Hero from "./Hero";
import ShoppingListInfo from "./ShoppingListInfo";


const Home = () => {
  return (
    <div className="container mx-auto">
      <Hero />
      <ShoppingListInfo />
      <RecipeContainer />
    </div>
  );
};

export default Home;
