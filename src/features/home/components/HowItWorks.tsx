const HowItWorks = () => {
  const steps = [
    {
      title: "Explore Recipes",
      description:
        "Browse our curated collection of recipes from top chefs and community favorites.",
      icon: "🔍",
    },
    {
      title: "Plan Your Meals",
      description:
        "Select recipes for your weekly meal plan and customize portions as needed.",
      icon: "📅",
    },
    {
      title: "Generate Shopping List",
      description:
        "Get an automatically compiled shopping list with all ingredients organized and quantified.",
      icon: "🛒",
    },
    {
      title: "Cook & Enjoy",
      description:
        "Follow step-by-step instructions and enjoy your perfectly planned meals.",
      icon: "🍽️",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light text-text mb-4">
          How <span className="text-secondary font-bold">MunchMate</span> Works
        </h2>
        <p className="text-lg text-text/70 mb-12 max-w-2xl mx-auto">
          Simple steps to transform your cooking experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center p-6 bg-background/50 border border-primary/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-text mb-2">
                {step.title}
              </h3>
              <p className="text-text/70 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
