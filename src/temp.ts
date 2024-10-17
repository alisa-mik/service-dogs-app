// utils/authUtils.ts

import { setUser } from "../store/userSlice"; // Redux action to set user
import { AppDispatch } from "../store/index"; // Dispatch type

export const handleAuthToken = async (authCode: string, dispatch: AppDispatch): Promise<void> => {
    try {
        const response = await fetch('https://7cceg043qj.execute-api.eu-west-1.amazonaws.com/exchange-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: authCode }),
        });

        if (!response.ok) {
            throw new Error("Failed to exchange authorization code.");
        }

        const data = await response.json();
        const { accessToken, idToken, isAdmin, userId, userGroup } = data;

        // Dispatch user info to Redux store
        dispatch(setUser({
            isAdmin,
            userId,
            userGroup
        }));

        // Optionally, store tokens in memory (or use HTTP-only cookies)
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("idToken", idToken);

        // Redirect the user after successful login
        window.location.href = "/app";
    } catch (error) {
        console.error("Error during token exchange:", error);
    }
};
