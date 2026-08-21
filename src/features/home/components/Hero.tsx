import Button from "@/components/ui/Button/Button";
import lightImg from "/images/landing_pasta.png";
import darkImg from "/images/dark-pasta.png";
import useThemeContext from "@/hooks/useThemeContext";

const Hero = () => {
  const { theme } = useThemeContext();
  const img = theme === "light" ? lightImg : darkImg;
  return (
    <section className="flex flex-col md:grid md:grid-cols-2 min-h-[70vh] items-center py-16 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="flex justify-center items-center flex-col gap-8 animate-fade-in">
        <div className="flex flex-col space-y-6 text-center md:text-left max-w-lg">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
            <span className="text-text">Discover.</span>{" "}
            <span className="text-primary font-bold">Plan. </span>
            <span className="text-text">Cook. </span>
            <span className="text-secondary font-bold">Munch. </span>
          </h1>
          <p className="text-lg md:text-xl text-text/80">
            <span className="text-primary font-semibold">MunchMate</span> makes
            meal planning simple — explore your favourite recipes, create weekly
            plans, and build your shopping list in seconds.
          </p>
          <Button name="Start Now" />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          <div className="flex flex-col bg-primary/10 border border-primary/30 p-4 rounded-xl text-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-2xl text-primary font-bold">80%</p>
            <p className="text-text/70">faster</p>
            <p className="text-text/70">planning</p>
          </div>
          <div className="flex flex-col bg-secondary/10 border border-secondary/30 p-4 rounded-xl text-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-text/70">Over</p>
            <p className="text-2xl text-secondary font-bold">100</p>
            <p className="text-text/70">recipes</p>
          </div>
          <div className="flex flex-col bg-accent/10 border border-accent/30 p-4 rounded-xl text-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-text/70">Recipes from</p>
            <p className="text-text/70">well known</p>
            <p className="text-2xl text-accent font-bold">Chefs</p>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-0 animate-slide-in-right max-w-md md:max-w-lg mx-auto">
        <img
          src={img}
          className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl"
          alt="plate of pasta"
        />
      </div>
    </section>
  );
};

export default Hero;
