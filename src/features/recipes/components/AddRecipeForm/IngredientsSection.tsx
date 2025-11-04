import { useEffect, useState } from "react";
import { Ingredient, RecipeDTO, RecipeIngredientDTO } from "../../../../types";
import AddIcon from "@mui/icons-material/Add";
import { Id } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../../../config/api";

const IngredientsSection = ({
  formData,
  notify,
  updateFormData,
}: {
  formData: RecipeDTO;
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
      <fieldset className="border-2 border-black px-2 rounded-md">
        <legend>Ingredients:</legend>
        {formData.ingredients.length > 0 && (
          <div>
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
        <div className="grid grid-cols-[auto_1fr] gap-2 col-start-2 my-2">
          {isAddingIngredient ? (
            <>
              <label htmlFor="ingredient--name">
                Name:<span className="text-red-600 text-xl">*</span>
              </label>
              <select
                className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 rounded-md w-[95%] md:w-full"
                name="name"
                id="ingredient--name"
                required
                value={ingredient?.name}
                onChange={(e) => handleIngredientChange(e)}
              >
                <option disabled value={""}>
                  -- Select Ingredient --
                </option>
                {ingredientOptions?.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
              </select>

              <label htmlFor="ingredient--quantity">
                Quantity:<span className="text-red-600 text-xl">*</span>
              </label>
              <div className="flex border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 rounded-md w-[95%] md:w-full">
                <input
                  type="number"
                  name="quantity"
                  step={0.1}
                  id="ingredient--quantity"
                  placeholder="Quantity"
                  required
                  min={0}
                  className="pl-2 focus:outline-2 focus:outline-blue-600 sm:w-40"
                  value={ingredient?.quantity <= 0 ? "" : ingredient.quantity}
                  onChange={(e) => handleIngredientChange(e)}
                />
                <select
                  className="border-2 border-l-2 focus:outline-2 focus:outline-blue-600 md:grow-[1] w-full"
                  name="unit"
                  value={ingredient.unit}
                  required
                  onChange={(e) => handleIngredientChange(e)}
                >
                  <option disabled value={""}>
                    -- Select UNIT --
                  </option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2 my-4 col-span-2 place-content-center">
                <button
                  className="bg-green-600 rounded-lg text-white px-4 py-2 w-fit "
                  type="button"
                  onClick={() => saveIngredient(true)}
                >
                  Done
                  <AddIcon />
                </button>
                <button
                  className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit "
                  type="button"
                  onClick={() => saveIngredient()}
                >
                  Add Another
                  <AddIcon />
                </button>
                <button
                  className="bg-red-600 rounded-lg text-white px-4 py-2 w-fit "
                  type="button"
                  onClick={() => setIsAddingIngredient(false)}
                >
                  Remove
                  <AddIcon />
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2 col-start-2 my-4 place-content-center">
              <button
                className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit "
                type="button"
                onClick={() => setIsAddingIngredient(true)}
              >
                Add Ingredient
                <AddIcon />
              </button>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default IngredientsSection;
