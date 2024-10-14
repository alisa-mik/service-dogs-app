import { useState, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../config/apiConfig";

interface DogProfile {
    id: string;
    name: string;
    age: number;
    breed: string;
    image: string; // Ensure the image is a valid URL
}

export const useFetchDogs = () => {
    const [ dogs, setDogs ] = useState<DogProfile[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await axios.get(apiConfig.dogsEndpoint);
                const dogsData = response.data;

                // Fetch actual image URLs for each dog
                const updatedDogs = await Promise.all(
                    dogsData.map(async (dog: DogProfile) => {
                        try {
                            const imageResponse = await axios.get("https://dog.ceo/api/breeds/image/random");
                            return { ...dog, image: imageResponse.data.message };
                        } catch {
                            return { ...dog, image: "" }; // Fallback if image fetch fails
                        }
                    })
                );

                setDogs(updatedDogs);
            } catch (error) {
                console.error("Error fetching dogs:", error);
                setError("Failed to fetch dog profiles.");
            } finally {
                setLoading(false);
            }
        };

        fetchDogs();
    }, []);

    return { dogs, loading, error };
};
