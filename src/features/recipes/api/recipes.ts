import { Recipe } from "../types";
import axios from "axios";
import { API_URL } from "@/config/api";

const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error("Error from getRecipes");
    console.error(error);
    throw new Error("Network response was not ok");
  }
};

const getRecipeById = async (id: string | undefined): Promise<Recipe> => {
  try {
    const response = await axios.get<Recipe>(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error from getRecipeById");
    console.error(error);
    throw new Error("Network response was not ok");
  }
};

export { getAllRecipes, getRecipeById };
