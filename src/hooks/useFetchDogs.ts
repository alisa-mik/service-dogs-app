import { useState, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../config/apiConfig";
import { Dog } from "../types/dogTypes";

export const useFetchDogs = () => {
    const [ dogs, setDogs ] = useState<Dog[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await axios.get(apiConfig.dogsBasicInfoEndpoint);
                const dogsData = response.data;

                // Fetch actual image URLs for each dog
                // const updatedDogs = await Promise.all(
                //     dogsData.map(async (dog: DogProfile) => {
                //         try {
                //             const imageResponse = await axios.get("https://dog.ceo/api/breeds/image/random");
                //             return { ...dog, image: imageResponse.data.message };
                //         } catch {
                //             return { ...dog, image: "" }; // Fallback if image fetch fails
                //         }
                //     })
                // );

                setDogs(dogsData);
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
