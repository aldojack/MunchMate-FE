import { useEffect, useState } from "react";
import { Ingredient, RecipeDTO, RecipeIngredientDTO } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import { Id } from "react-toastify";
import axios from "axios";
import { API_URL } from "@/config/api";
import FormButton from "@/components/shared/Form/FormButton";

const IngredientsSection = ({
  formData,
  notify,
  updateFormData,
}: {
  formData: Pick<RecipeDTO, "ingredients">;
  notify: (message: string) => Id;
  updateFormData: (formData: Partial<RecipeDTO>) => void;
}) => {
  const [ingredient, setIngredient] = useState<Omit<RecipeIngredientDTO, "id">>(
    { name: "", quantity: 0, unit: "" }
  );
  const [ingredientOptions, setIngredientOptions] = useState<Ingredient[]>();
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const units = [
    "tsp",
    "tbsp",
    "g",
    "kg",
    "lb",
    "oz",
    "ml",
    "l",
    "cup",
    "clove",
    "whole",
    "sachet",
  ];
  const saveIngredient = (done: boolean = false) => {
    //validate the data before setting it into form
    if (
      ingredient.name.trim() === "" ||
      ingredient.quantity <= 0 ||
      ingredient.unit === ""
    ) {
      console.log(
        "Unable to save as some required fields Are missing, alternatively press cancel"
      );
      notify(
        "Unable to save as some required fields Are missing, alternatively press cancel"
      );
      return;
    }
    updateFormData({
      ingredients: [...formData.ingredients, ingredient],
    });
    setIngredient((previousState: RecipeIngredientDTO) => {
      return { ...previousState, name: "", quantity: 0, unit: "" };
    });
    if (done) setIsAddingIngredient(false);
  };
  const handleIngredientChange = (e: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    const { name, value } = e.target;

    setIngredient((previousState: Omit<RecipeIngredientDTO, "id">) => ({
      ...previousState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/ingredients`);
        setIngredientOptions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIngredients();
  }, []);
  return (
    <div className="md:grid md:col-span-2">
      <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm bg-white gap-y-8">
        <legend className="font-semibold text-lg px-2">Ingredients:</legend>
        {/* Maybe change out to Tab later */}
        {formData.ingredients.length > 0 && (
          <div className="overflow-x-auto whitespace-nowrap flex gap-2">
            {formData.ingredients.map((ingredient) => (
              <button
                key={ingredient.id}
                className="border-blue-600 border-2 p-2 rounded-md text-sm"
                onClick={(e) => {
                  e?.preventDefault();
                  const updatedIngredientList = [
                    ...formData.ingredients,
                  ].filter((i) => i.name !== ingredient.name);
                  updateFormData({ ingredients: updatedIngredientList });
                }}
              >
                {ingredient.name}
              </button>
            ))}
          </div>
        )}
<div className="space-y-4">
  {isAddingIngredient ? (
    <>
      {/* Ingredient inputs */}
      <div className="grid space-y-6 items-center">
        <div className="flex flex-col">
          <label htmlFor="ingredient--name" className="text-sm font-medium text-gray-700">
            Name: <span className="text-red-600 text-lg">*</span>
          </label>
          <select
            id="ingredient--name"
            name="name"
            required
            value={ingredient?.name}
            onChange={handleIngredientChange}
            className="border-2 border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary"
          >
            <option disabled value="">
              -- Select Ingredient --
            </option>
            {ingredientOptions?.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="ingredient--quantity" className="text-sm font-medium text-gray-700">
            Quantity: <span className="text-red-600 text-lg">*</span>
          </label>
          <div className="flex border-2 border-gray-300 rounded-md overflow-hidden">
            <input
              type="number"
              id="ingredient--quantity"
              name="quantity"
              min={0}
              step={0.1}
              placeholder="Qty"
              required
              value={ingredient?.quantity <= 0 ? "" : ingredient.quantity}
              onChange={handleIngredientChange}
              className="w-24 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              name="unit"
              required
              value={ingredient.unit}
              onChange={handleIngredientChange}
              className="border-l-2 border-gray-300 px-2 py-1 w-full focus:ring-2 focus:ring-primary"
            >
              <option disabled value="">
                -- Select Unit --
              </option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <FormButton name="save" handler={() => saveIngredient(true)}/>
        <FormButton name="add" handler={() => saveIngredient(false)}/>
        <FormButton name="cancel" handler={() => setIsAddingIngredient(false)}/>
      </div>
    </>
  ) : (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => setIsAddingIngredient(true)}
        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        Add Ingredient <AddIcon />
      </button>
    </div>
  )}
</div>

      </fieldset>
    </div>
  );
};

export default IngredientsSection;
