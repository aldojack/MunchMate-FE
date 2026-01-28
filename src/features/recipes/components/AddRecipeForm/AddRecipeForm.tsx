import RecipeDetailsSection from "@/features/recipes/components/AddRecipeForm/RecipeDetailsSection";
import { RecipeDTO } from "@/types";
import IngredientsSection from "@/features/recipes/components/AddRecipeForm/IngredientsSection";
import InstructionsSection from "@/features/recipes/components/AddRecipeForm/InstructionsSection";
import SourceSection from "@/features/recipes/components/AddRecipeForm/SourceSection";
import { FormEvent, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/api";

import { toast, ToastContainer } from "react-toastify";
import Button from "@/components/shared/Button/Button";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState<RecipeDTO>({
    title: "",
    image: "",
    ingredients: [],
    instructions: [],
    source: { name: "" },
    cookTime: 0,
    prepTime: 0,
    servingSize: 0,
  });


    const notify = (message: string) =>
      toast.error(message, { pauseOnHover: true, autoClose: 5000 });

    const isValidSubmission = (data: RecipeDTO) => {
    if (data.instructions.length <= 0 || data.ingredients.length <= 0) {
      console.log(
        "Please ensure you have saved Ingredients and Instructions before submitting"
      );
      notify(
        "Please ensure you have saved Ingredients and Instructions before submitting"
      );
      return false;
    }
    return true;
  };

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isValidSubmission(formData)) {
      try {
        const response = await axios.post(`${API_URL}/recipes/add`, formData);
        setFormData({
          title: "",
          image: "",
          ingredients: [],
          instructions: [],
          source: { name: "" },
          cookTime: 0,
          prepTime: 0,
          servingSize: 0,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateFormData = (partialUpdate: Partial<RecipeDTO>) => {
      setFormData(prev => ({ ...prev, ...partialUpdate }));
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-md">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="grid space-y-8 md:grid-cols-2 max-w-5xl mx-auto"
      >
      <RecipeDetailsSection updateFormData={updateFormData} formData={formData} />
      <IngredientsSection formData={formData}  notify={notify} updateFormData={updateFormData}/>
      <InstructionsSection formData={formData}  notify={notify} updateFormData={updateFormData}/>
      <SourceSection formData={formData} updateFormData={updateFormData}/>
      <Button name="Submit" />
      </form>
    </div>
  );
};

export default AddRecipeForm;
