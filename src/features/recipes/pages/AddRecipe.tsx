import AddRecipeForm from "../components/AddRecipeForm/AddRecipeForm";

const AddRecipe = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto bg-white/5 rounded-2xl p-8 shadow-lg border-accent border-2">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Add New Recipe
          </h1>
          <p className="text-lg text-text opacity-80">
            Share your favorite recipes with the community
          </p>
        </div>
        <AddRecipeForm />
      </div>
    </div>
  );
};

export default AddRecipe;
