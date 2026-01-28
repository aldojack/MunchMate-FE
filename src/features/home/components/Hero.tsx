import Button from "@/components/shared/Button/Button";
import lightImg from "/images/landing_pasta.png";
import darkImg from "/images/dark-pasta.png"
import useThemeContext from "@/hooks/useThemeContext";

const Hero = () => {
  const {theme} = useThemeContext();
  const img = theme === 'light' ? lightImg : darkImg
  return (
    <section className="flex flex-col md:grid md:grid-cols-2">
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg md:text-2xl ">
            <span className="">Discover.</span>{" "}
            <span className="text-primary font-bold">Plan. </span>Cook.{" "}
            <span className="text-primary font-bold">Munch. </span>
          </h1>
          <p>
            <span className="text-primary foont-bold">MunchMate</span> makes
            meal planning simple — explore your favourite recipes, create weekly
            plans, and build your shopping list in seconds.
          </p>
          <Button name="Start Now" />
        </div>
        <div className="flex space-x-6 md:space-x-12">
          <div className="flex flex-col border-2 border-primary p-2 rounded-md text-sm shadow-lg">
            <p className="text-lg text-primary font-bold">80%</p>
            <p>faster</p>
            <p>planning</p>
          </div>
          <div className="flex flex-col border-2 border-primary p-2 rounded-md text-sm shadow-lg">
            <p>Over</p>
            <p className="text-lg text-primary font-bold">100</p>
            <p>recipes</p>
          </div>
          <div className="flex flex-col border-2 border-primary p-2 rounded-md text-sm shadow-lg">
            <p>Recipes from</p>
            <p>well known</p>
            <p className="text-lg text-primary font-bold">Chefs</p>
          </div>
        </div>
      </div>
      <div>
        <img src={img} className="w-full object-cover" alt="plate of pasta" />
      </div>
    </section>
  );
};

export default Hero;
