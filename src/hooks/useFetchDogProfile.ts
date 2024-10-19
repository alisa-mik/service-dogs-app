import { useState, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../config/apiConfig";

export const useFetchDogProfile = (dogId: string) => {
    const [ dog, setDog ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<null | Error>(null);

    useEffect(() => {
        const fetchDogProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${apiConfig.dogByIdEndPoint}/${dogId}`
                );
                setDog(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDogProfile();

        return () => {
            setDog(null);
            setLoading(false);
            setError(null);
        };
    }, [ dogId ]);

    return { dog, loading, error };
};