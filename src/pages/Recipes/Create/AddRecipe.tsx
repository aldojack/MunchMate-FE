import AddIcon from "@mui/icons-material/Add";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Ingredient, RecipeDTO, RecipeIngredientDTO } from "../../../types";
import axios from "axios";
import FormInput from "../Components/Form/FormInput";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  "whole",
  "sachet",
];

const AddRecipe = () => {
  const notify = (message: string) => toast.error(message,{pauseOnHover: true, autoClose: 5000});
  const [ingredientOptions, setIngredientOptions] = useState<Ingredient[]>();
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/ingredients");
        setIngredientOptions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIngredients();
  }, []);

  const [formData, setFormData] = useState<RecipeDTO>({
    title: "",
    ingredients: [],
    instructions: [],
    source: { name: "" },
    cookTime: 0,
    prepTime: 0,
    servingSize: 0,
  });
  const [ingredient, setIngredient] = useState<Omit<RecipeIngredientDTO, "id">>(
    { name: "", quantity: 0, unit: "" }
  );
  const [instruction, setInstruction] = useState<string>("");
  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);
  const [isAddingInstruction, setIsAddingInstruction] =
    useState<boolean>(false);
  const [isWebsiteSource, setIsWebsiteSource] = useState<boolean>(false);
  const [isBookSource, setIsBookSource] = useState<boolean>(false);

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleInstructionChange = (e: { target: HTMLTextAreaElement }) => {
    const { value } = e.target;

    setInstruction(value);
  };

  const handleSourceChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setFormData((prevData: RecipeDTO) => ({
      ...prevData,
      source: {
        ...prevData.source,
        [name]: value,
      },
    }));
  };

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
      notify("Unable to save as some required fields Are missing, alternatively press cancel")
      return;
    }

    setFormData((previousData: RecipeDTO) => ({
      ...previousData,
      ingredients: [...previousData.ingredients, ingredient],
    }));
    setIngredient((previousState: Omit<RecipeIngredientDTO, "id">) => {
      return { ...previousState, name: "", quantity: 0, unit: "" };
    });
    if (done) setIsAddingIngredient(false);
  };

  const saveInstruction = (done: boolean = false) => {
    if (instruction.trim() === "") {
      console.log(
        "Unable to save blank text, please enter instruction or alternatively press cancel"
      );
      notify(
        "Unable to save blank text, please enter instruction or alternatively press cancel"
      );
      return;
    }
    setFormData((previousData: RecipeDTO) => {
      return {
        ...previousData,
        instructions: [...previousData.instructions, instruction],
      };
    });
    setInstruction("");
    if (done) setIsAddingInstruction(false);
  };

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
        const response = await axios.post(
          "http://localhost:8080/recipes/add",
          formData
        );
        setFormData({
          title: "",
          ingredients: [],
          instructions: [],
          source: { name: "" },
          cookTime: 0,
          prepTime: 0,
          servingSize: 0,
        });
        setIsWebsiteSource(false);
        setIsBookSource(false);
        console.log(response);
        // console.log("sent data to backend");
        // console.log(formData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <ToastContainer/>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-form h-fit space-y-2 mx-auto place-content-center"
      >
        {/* Recipe Details */}
        <div className="grid col-span-2">
          <fieldset className="col-span-2 flex flex-col  border-2 border-black p-2 rounded-md">
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
        {/* Ingredients */}
        <div className="grid col-span-2">
          <fieldset className="col-span-2 border-2 border-black px-2 rounded-md">
            <legend>Ingredients:</legend>

            <div className="grid grid-cols-[auto_1fr] gap-2 col-start-2 my-2">
              {isAddingIngredient ? (
                <>
                  <label htmlFor="ingredient--name">
                    Name:<span className="text-red-600 text-xl">*</span>
                  </label>
                  <select
                    className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 rounded-md"
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
                  <div className="flex border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 rounded-md ">
                    <input
                      type="number"
                      name="quantity"
                      id="ingredient--quantity"
                      placeholder="Quantity"
                      required
                      className="pl-2 focus:outline-2 focus:outline-blue-600"
                      value={
                        ingredient?.quantity <= 0 ? "" : ingredient.quantity
                      }
                      onChange={(e) => handleIngredientChange(e)}
                    />
                    <select
                      className="border-2 border-l-2 focus:outline-2 focus:outline-blue-600 grow-[1]"
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
        {/* Instructions */}
        <div className="grid col-span-2">
          <fieldset className="col-span-2 border-2 border-black px-2 rounded-md">
            <legend>
              Instructions:<span className="text-red-600 text-xl">*</span>
            </legend>

            {isAddingInstruction ? (
              <>
                <div
                  id="instructions"
                  className="flex flex-col col-start-2 my-2"
                >
                  <textarea
                    name="instructions"
                    required
                    value={instruction}
                    onChange={(e) => handleInstructionChange(e)}
                    className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 pl-2 rounded-md"
                  ></textarea>
                </div>

                <div className="flex space-x-2 my-4 col-span-2 place-content-center">
                  <button
                    className="bg-green-600 rounded-lg text-white px-4 py-2 w-fit "
                    type="button"
                    onClick={() => saveInstruction(true)}
                  >
                    Done
                    <AddIcon />
                  </button>
                  <button
                    className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit "
                    type="button"
                    onClick={() => saveInstruction()}
                  >
                    Next Step
                    <AddIcon />
                  </button>
                  <button
                    className="bg-red-600 rounded-lg text-white px-4 py-2 w-fit "
                    type="button"
                    onClick={() => setIsAddingInstruction(false)}
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
                  onClick={() => setIsAddingInstruction(true)}
                >
                  {formData.instructions.length <= 0
                    ? "First Step"
                    : "Next Step"}

                  <AddIcon />
                </button>
              </div>
            )}
          </fieldset>
        </div>
        {/* Source */}
        <div className="grid col-span-2">
          <fieldset className="col-span-2 border-2 border-black px-2 rounded-md">
            <legend>Source</legend>
            <div className="flex space-x-4 items-center">
              <label htmlFor="websiteCheck">
                Website
                <input
                  type="checkbox"
                  name="websiteCheck"
                  id="websiteCheck"
                  onChange={() =>
                    setIsWebsiteSource((previousState) => !previousState)
                  }
                  className="ml-2"
                  checked={isWebsiteSource}
                />
              </label>
              <label htmlFor="bookCheck">
                Book
                <input
                  type="checkbox"
                  name="bookCheck"
                  id="bookCheck"
                  className="ml-2"
                  onChange={() =>
                    setIsBookSource((previousState) => !previousState)
                  }
                  checked={isBookSource}
                />
              </label>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2 col-start-2 my-2">
              <FormInput
                name="name"
                label="Name"
                required={true}
                type="text"
                data={formData.source.name}
                handleChange={handleSourceChange}
              />
              {isWebsiteSource && (
                <FormInput
                  name="url"
                  label="URL"
                  required={false}
                  type="text"
                  data={formData.source.url}
                  handleChange={handleSourceChange}
                />
              )}
              {isBookSource && (
                <>
                  <FormInput
                    name="book"
                    label="Book"
                    required={false}
                    type="text"
                    data={formData.source.book}
                    handleChange={handleSourceChange}
                  />

                  <FormInput
                    name="pageNo"
                    label="Page Number"
                    required={false}
                    type="number"
                    data={formData.source.pageNo}
                    handleChange={handleSourceChange}
                  />
                </>
              )}
            </div>
          </fieldset>
        </div>

        <Button name="Submit"/>
      </form>
    </div>
  );
};

export default AddRecipe;
