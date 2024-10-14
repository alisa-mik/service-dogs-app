// src/hooks/useFetchDogProfile.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchDogProfile = (dogId: string) => {
    const [ dog, setDog ] = useState<any>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchDogProfile = async () => {
            try {
                const response = await axios.get(`/api/dogs/${dogId}`);
                setDog(response.data);
            } catch (err) {
                setError(`Failed to fetch dog profile: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchDogProfile();
    }, [ dogId ]);

    return { dog, loading, error };
};
