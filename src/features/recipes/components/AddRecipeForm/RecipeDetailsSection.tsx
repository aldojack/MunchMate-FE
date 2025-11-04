import FormInput from "../../../../components/Form/FormInput";
import { RecipeDTO } from "../../../../types";

const RecipeDetailsSection = ({updateFormData, formData} : {updateFormData: (input: Partial<RecipeDTO>) => void,formData: Pick<RecipeDTO, "title" | "image" | "cookTime" | "prepTime" | "servingSize">}) => {
  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    updateFormData({[name]: value})
  };

  return (
    <div className="md:grid md:col-span-2">
      <fieldset className="flex flex-col  border-2 border-black p-2 rounded-md">
        <legend>Recipe Details</legend>

        <FormInput
          name="title"
          label="Title"
          required={true}
          type="text"
          placeholder="Prawn and Tomato Risotto"
          data={formData.title}
          handleChange={handleInputChange}
        />

        <FormInput
          name="image"
          label="Image URL"
          type="text"
          data={formData.image}
          handleChange={handleInputChange}
        />

        <FormInput
          name="cookTime"
          label="Cook Time (minutes)"
          required={true}
          type="number"
          data={formData.cookTime}
          handleChange={handleInputChange}
        />

        <FormInput
          name="prepTime"
          label="Prep Time (minutes)"
          required={true}
          type="number"
          data={formData.prepTime}
          handleChange={handleInputChange}
        />

        <FormInput
          name="servingSize"
          label="Serving Size"
          required={true}
          type="number"
          data={formData.servingSize}
          handleChange={handleInputChange}
        />
      </fieldset>
    </div>
  );
};

export default RecipeDetailsSection;
