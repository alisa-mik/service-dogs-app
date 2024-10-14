import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import decodeJWT from "../utils/jwtUtils";
import { jwtConfig } from "../config/jwtConfig";
import { FamilyDetails } from "../types/userTypes";

export const useAuthToken = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // State variables
    const [ userGroup, setUserGroup ] = useState<string>("");
    const [ isAdmin, setIsAdmin ] = useState<boolean>(false);
    const [ familyDetails, setFamilyDetails ] = useState<FamilyDetails | null>(null);
    const [ error, setError ] = useState<string | null>(null); // Track error state

    // Function to handle token retrieval and decoding
    const getToken = async (code: string) => {
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

            // Extract id_token (you can also extract the access token if needed)
            const idToken = response.data.id_token;

            // Decode the id_token to get user attributes
            const decodedIdToken = decodeJWT(idToken);

            if (decodedIdToken && decodedIdToken.payload) {
                console.log("Decoded ID Token Payload:", decodedIdToken.payload);

                const userGroups = decodedIdToken.payload[ "cognito:groups" ];
                const username = decodedIdToken.payload[ "cognito:username" ];

                // Validate the required attributes are present
                if (!userGroups || userGroups?.length === 0 || !username) {
                    setError("Invalid token data: Missing user group.");
                    return;
                }
                setUserGroup(userGroups[ 0 ])

                // Set the user group and check role
                setIsAdmin(userGroups.includes("Admin"));


                // If the user is part of the "Families" group, set family details
                if (userGroups.includes("Families")) {
                    setFamilyDetails({
                        username: username,
                        client_id: decodedIdToken.payload.client_id ?? "",
                    });
                }
                if (userGroups.includes("Admin")) {
                    setUserGroup("Admin")
                }

            }
        } catch (error) {
            console.error("Error getting token:", error);
            setError("Failed to retrieve token.");
        }
    };

    // Trigger the token retrieval on component mount or when location changes
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const authCode = params.get("code");

        if (authCode) {
            getToken(authCode);
        }
    }, [ location.search, navigate ]);

    // Return relevant state variables and flags
    return { isAdmin, userGroup, familyDetails, error };
};
