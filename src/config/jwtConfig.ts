

const HOST_NAME = window.location.origin;

export const jwtConfig = {
    client_id: "5o5mor0u37aqmanfu3ahl0i3hl",
    redirect_uri: `${HOST_NAME}/login`,
    response_type: "code",
    grant_type: "authorization_code",
    scope: "email openid",
    token_url: "https://service-dogs-app.auth.eu-west-1.amazoncognito.com/oauth2/token",
    login_url: "https://service-dogs-app.auth.eu-west-1.amazoncognito.com/login",
    user_pool_id: "eu-west-1_VO7l8G34F"
};

