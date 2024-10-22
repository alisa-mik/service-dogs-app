import axios from 'axios';
import { apiConfig } from '../config/apiConfig';

export const deleteDog = async (dogId: string) => {
    try {
        const response = await axios.delete(`${apiConfig.deleteDog}/${dogId}`, {});
        return response.data;
    } catch (error) {
        console.error('DeleteDog API Error:', error);
        throw error;
    }
};