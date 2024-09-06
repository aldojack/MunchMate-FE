import {RecipeDTO } from "../types";
import axios from "axios";
const API_URL = 'http://localhost:8000/recipes';

const getAllRecipes = async (): Promise<RecipeDTO[]> => {
    try {
        const response = await axios.get<RecipeDTO[]>(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error from getRecipes")
        throw new Error('Network response was not ok');
    }
};


const getRecipeById = async (id: string | undefined): Promise<RecipeDTO> => {
    try {
        const response = await axios.get<RecipeDTO>(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error("Error from getRecipeById")
        throw new Error('Network response was not ok');
    }
};

// const getRecipeById = async (id: string | undefined): Promise<RecipeDTO> => {
//     try {
//         const response = await axios.get<RecipeDTO>(`${API_URL}/?id=${id}`)
//         return response.data
//     } catch (error) {
//         console.error("Error from getRecipeById")
//         throw new Error('Network response was not ok');
//     }
// };

export { getAllRecipes, getRecipeById }