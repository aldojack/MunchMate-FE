import FormInput from "@/components/shared/Form/FormInput";
import { RecipeDTO } from "@/types";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const RecipeDetailsSection = ({
  updateFormData,
  formData,
}: {
  updateFormData: (input: Partial<RecipeDTO>) => void;
  formData: Pick<
    RecipeDTO,
    "title" | "image" | "cookTime" | "prepTime" | "servingSize"
  >;
}) => {
  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="md:grid md:col-span-2">
      <fieldset className="border border-accent rounded-xl p-6 shadow-sm bg-background gap-y-8">
        <legend className="font-semibold text-lg px-2 text-secondary flex items-center gap-2">
          <RestaurantMenuIcon className="text-primary" />
          Recipe Details
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
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
        </div>
      </fieldset>
    </div>
  );
};

export default RecipeDetailsSection;
