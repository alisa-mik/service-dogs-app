import { DecodedJWT, JWTHeader, JWTPayload } from "../types/jwtTypes";

export const decodeJWT = (token: string): DecodedJWT => {
    const [ header, payload, signature ] = token.split(".");

    const base64UrlDecode = (base64Url: string): string => {
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return atob(base64);
    };

    // Decode the base64 strings and then parse them into the appropriate type
    const decodedHeader: JWTHeader = JSON.parse(base64UrlDecode(header)) as JWTHeader;
    const decodedPayload: JWTPayload = JSON.parse(base64UrlDecode(payload)) as JWTPayload;

    return {
        header: decodedHeader,
        payload: decodedPayload,
        signature: signature,
    };
};

export default decodeJWT;