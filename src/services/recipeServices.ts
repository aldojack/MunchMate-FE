import { Recipe } from "../types";
import axios from "axios";
const API_URL = 'http://localhost:8000/recipes';

const getRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await axios.get<Recipe[]>(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error from getRecipes")
        throw new Error('Network response was not ok');
    }
};


const getRecipeById = async (id: number): Promise<Recipe> => {
    try {
        const response = await axios.get<Recipe>(`${API_URL}/?id=${id}`)
        return response.data
    } catch (error) {
        console.error("Error from getRecipeById")
        throw new Error('Network response was not ok');
    }
};

export { getRecipes, getRecipeById }