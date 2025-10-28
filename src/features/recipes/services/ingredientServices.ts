import {Ingredient } from "../../../types";
import axios from "axios";
import { API_URL } from "../../../config/api";

const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const response = await axios.get<Ingredient[]>(`${API_URL}/ingredients`);
        return response.data;
    } catch (error) {
            console.error("Error from getRecipes")
            console.error(error)
        throw new Error('Network response was not ok');
    }
};



export { getAllIngredients }