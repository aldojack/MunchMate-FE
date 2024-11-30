import {Ingredient } from "../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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