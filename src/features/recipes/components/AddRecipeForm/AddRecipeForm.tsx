import RecipeDetailsSection from "./RecipeDetailsSection";
import { RecipeDTO } from "../../../../types";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import SourceSection from "./SourceSection";
import { FormEvent, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../config/api";

import { toast, ToastContainer } from "react-toastify";

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

  //Maybe move this to each section instead
  const [formState, setFormState] = useState({
    isAddingIngredient: false,
    isAddingInstruction: false,
    sourceType: {
      websiteChecked: false,
      bookChecked: false
    }
  })

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
        setFormState(prevState => {
          return {...prevState, sourceType: {bookChecked: false, websiteChecked: false}}
        })
        console.log(formState)
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
    <div className="container mx-auto mt-20">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="space-y-2 md:grid md:grid-cols-form md:place-content-center mx-4"
      >
      <RecipeDetailsSection updateFormData={updateFormData} formData={formData} />
      <IngredientsSection formData={formData}  notify={notify} updateFormData={updateFormData}/>
      <InstructionsSection />
      <SourceSection />
      </form>
    </div>
  );
};

export default AddRecipeForm;
