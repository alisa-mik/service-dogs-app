import axios from "axios";
import decodeJWT from "../utils/jwtUtils";
import { jwtConfig } from "../config/jwtConfig";
import { setUser } from "../store/userSlice";
import { Dispatch } from "@reduxjs/toolkit";

// Regular function to handle token retrieval and decoding
export const handleAuthToken = async (code: string, dispatch: Dispatch) => {
    try {
        // Build the token request parameters
        const params = new URLSearchParams({
            grant_type: jwtConfig.grant_type,
            client_id: jwtConfig.client_id,
            code: code,
            redirect_uri: jwtConfig.redirect_uri,
        });

        // Make the request to get the tokens
        const response = await axios.post(
            jwtConfig.token_url,
            params.toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        // Extract id_token
        const idToken = response.data.id_token;

        // Decode the id_token to get user attributes
        const decodedIdToken = decodeJWT(idToken);

        if (decodedIdToken && decodedIdToken.payload) {
            console.log("Decoded ID Token Payload:", decodedIdToken.payload);

            const userGroups = decodedIdToken.payload[ "cognito:groups" ];
            const userId = decodedIdToken.payload.sub; // User ID (sub)

            // Validate the required attributes are present
            if (!userGroups || userGroups.length === 0 || !userId) {
                console.error("Invalid token data: Missing user group or userId.");
                return;
            }

            const isAdmin = userGroups.includes("Admin");
            const userGroup = userGroups[ 0 ]; // Assuming user is in one group

            // Dispatch the user info to the Redux store
            dispatch(setUser({ isAdmin, userId, userGroup }));
        }
    } catch (error) {
        console.error("Error getting token:", error);
    }
};
