import axios from "axios";
import decodeJWT from "../utils/jwtUtils";
import { jwtConfig } from "../config/jwtConfig";
import { setUser } from "../store/userSlice";
import { Dispatch } from "@reduxjs/toolkit";

const setUserOnStore = (accessToken: string, idToken: string, dispatch: Dispatch): void => {
    const decodedIdToken = decodeJWT(idToken);
    const userId = decodedIdToken.payload.sub;
    const userGroups = decodedIdToken.payload[ "cognito:groups" ] ?? [];
    const isAdmin = userGroups?.includes("Admin") ?? false;
    const userGroup = userGroups[ 0 ];

    axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${accessToken}`;

    dispatch(setUser({ userId, userGroup, isAdmin, accessToken, idToken }));
}

export const handleAuthToken = async (code: string, dispatch: Dispatch) => {
    try {
        const params = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: jwtConfig.client_id,
            code,
            redirect_uri: jwtConfig.redirect_uri,
        });

        // Exchange code for tokens
        const response = await axios.post(jwtConfig.token_url, params.toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        // Extract tokens
        const { id_token: idToken, access_token: accessToken } = response.data;

        const token = JSON.stringify({ accessToken, idToken });
        localStorage.setItem("token", token);

        setUserOnStore(accessToken, idToken, dispatch);
    } catch (error) {
        console.error("Error exchanging token:", error);
    }
};

export const checkSessionOnStart = (dispatch: Dispatch): boolean => {

    try {
        const { accessToken, idToken } = JSON.parse(localStorage.getItem("token") as string);
        setUserOnStore(accessToken, idToken, dispatch);

        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return false;
    }

}