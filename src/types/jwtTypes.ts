
export type JWTHeader = {
    alg: string;
    typ?: string;
    kid?: string;
};

export type JWTPayload = {
    sub: string; // Subject (User ID)
    iss: string; // Issuer
    exp: number; // Expiration time
    iat: number; // Issued at time
    aud?: string; // Audience (optional)
    jti?: string; // JWT ID (optional)
    "cognito:groups"?: string[]; // Groups array (optional)
    "cognito:username"?: string; // Groups array (optional)
    username?: string; // Username (optional)
    client_id?: string; // Client ID (optional)
    [ key: string ]: unknown; // Allow additional custom claims
};
export type DecodedJWT = {
    header: JWTHeader;
    payload: JWTPayload;
    signature: string;
};