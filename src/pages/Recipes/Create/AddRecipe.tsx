import AddIcon from "@mui/icons-material/Add";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Ingredient, RecipeDTO, RecipeIngredientDTO } from "../../../types";
import axios from "axios";
import FormInput from "../Components/Form/FormInput";

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
    instructions: [""],
    source: { name: "", url: "", book: "", pageNo: 0 },
    image: "",
    cookTime: 0,
    prepTime: 0,
    servingSize: 0,
  });
  const [ingredient, setIngredient] = useState<Omit<RecipeIngredientDTO, "id">>(
    { name: "", quantity: 0, unit: "" }
  );

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleIngredientChange = (
  //   index: number,
  //   e: { target: HTMLInputElement }
  // ) => {
  //   const { name, value } = e.target;
  //   const newIngredients = [...formData.ingredients];
  //   newIngredients[index][name] = value;
  //   setFormData({
  //     ...formData,
  //     ingredients: newIngredients,
  //   });
  // };

  const handleIngredientChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    console.log(name);
    console.log(value);

    setIngredient((previousState: Omit<RecipeIngredientDTO, "id">) => ({
      ...previousState,
      [name]: value,
    }));
    console.log(ingredient);
  };

  const handleInstructionChange = (
    index: number,
    e: { target: HTMLInputElement }
  ) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = e.target.value;
    setFormData({
      ...formData,
      instructions: newInstructions,
    });
  };

  const handleSourceChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    setFormData((prevData: RecipeDTO) => ({
      ...prevData,
      source: {
        ...prevData.source,
        [name]: value,
      },
    }));
  };

  const saveIngredient = () => {

    setFormData((previousData:RecipeDTO) => ({
      ...previousData,
      ingredients:[...previousData.ingredients, ingredient]
    }));
    setIngredient({name:"", quantity:0,unit: ""})
  };

  // const addIngredient = () => {
  //   setFormData({
  //     ...formData,
  //     ingredients: [
  //       ...formData.ingredients,
  //       { name: "", quantity: 0, unit: "" },
  //     ],
  //   });
  // };

  const saveInstruction = () => {
    setFormData({ ...formData });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("form data");
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/recipes/add",
        formData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-form h-fit space-y-2 mx-auto w-fit"
      >
        {/* Recipe Details */}
        <div className="grid grid-cols-subgrid col-span-2">
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
              required={false}
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
        <div className="grid grid-cols-subgrid col-span-2">
          <fieldset className="col-span-2 border-2 border-black px-2 rounded-md">
            <legend>Ingredients:</legend>

            {/* {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr] gap-2 col-start-2 my-2"
              >
                <label htmlFor="ingredient--name">
                  Name:<span className="text-red-600 text-xl">*</span>
                </label>
                <select
                  className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 rounded-md"
                  name="name"
                  id="ingredient--name"
                  onChange={(e) => handleIngredientChange(index, e)}
                  defaultValue={ingredient.name ? ingredient.name : ""}
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
                <div className="flex border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 flex-1 rounded-md ">
                  <input
                    type="number"
                    name="quantity"
                    id="ingredient--quantity"
                    placeholder="Quantity"
                    className="pl-2 focus:outline-2 focus:outline-blue-600"
                    defaultValue={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, e)}
                  />
                  <select
                    className="border-2 border-l-2 focus:outline-2 focus:outline-blue-600"
                    name="unit"
                    defaultValue={ingredient.unit ? ingredient.unit : ""}
                    onChange={(e) => handleIngredientChange(index, e)}
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
              </div>
            ))} */}

            <div className="grid grid-cols-[auto_1fr] gap-2 col-start-2 my-2">
              <label htmlFor="ingredient--name">
                Name:<span className="text-red-600 text-xl">*</span>
              </label>
              <select
                className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 rounded-md"
                name="name"
                id="ingredient--name"
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
              <div className="flex border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 flex-1 rounded-md ">
                <input
                  type="number"
                  name="quantity"
                  id="ingredient--quantity"
                  placeholder="Quantity"
                  className="pl-2 focus:outline-2 focus:outline-blue-600"
                  value={ingredient?.quantity}
                  onChange={(e) => handleIngredientChange(e)}
                />
                <select
                  className="border-2 border-l-2 focus:outline-2 focus:outline-blue-600"
                  name="unit"
                  value={ingredient.unit}
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
            </div>

            <div className="flex space-x-2 col-start-2 my-4">
              <button
                className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit "
                type="button"
                onClick={saveIngredient}
              >
                Save
                <AddIcon />
              </button>
              {/* <button
                className="bg-green-600 rounded-lg text-white px-4 py-2 w-fit"
                type="button"
                onClick={addIngredient}
              >
                Add Another
                <AddIcon />
              </button> */}
            </div>
          </fieldset>
        </div>
        {/* Instructions */}
        <div className="grid grid-cols-subgrid col-span-2">
          <fieldset className="col-span-2 border-2 border-black px-2 rounded-md">
            <legend>
              Instructions:<span className="text-red-600 text-xl">*</span>
            </legend>

            <ol className=" list-decimal list-inside">
              {formData.instructions.map((instruction, index) => (
                <li key={index} className="before:content-['step: ']">
                  <div
                    id="instructions"
                    className="flex flex-col col-start-2 my-2"
                  >
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e)}
                      className="border-2 border-gray-400 focus:outline-2 focus:outline-blue-600 pl-2 rounded-md"
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div className="flex space-x-2 col-start-2 my-4">
              <button
                className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit "
                type="button"
              >
                Save
                <AddIcon onClick={saveInstruction} />
              </button>
              <button
                className="bg-green-600 rounded-lg text-white px-4 py-2 w-fit"
                type="button"
              >
                Add Another
                <AddIcon onClick={addInstruction} />
              </button>
            </div>
          </fieldset>
        </div>
        {/* Source */}
        <div className="grid grid-cols-subgrid col-span-2">
          <fieldset className="col-span-2 border-2 border-black px-2 rounded-md">
            <legend>Source</legend>

            <div className="grid grid-cols-[auto_1fr] gap-2 col-start-2 my-2">
              <FormInput
                name="name"
                label="Name"
                required={true}
                type="text"
                data={formData.source.name}
                handleChange={handleSourceChange}
              />
              <FormInput
                name="url"
                label="URL"
                required={false}
                type="text"
                data={formData.source.url}
                handleChange={handleSourceChange}
              />

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
            </div>
          </fieldset>
        </div>

        <Button name="Submit" />
      </form>
    </div>
  );
};

export default AddRecipe;
