import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleAuthToken } from "../utils/authUtils";
import { jwtConfig } from "../config/jwtConfig";
import { createUrl } from "../utils/urlBuilder";
import { Button, Box, CircularProgress } from "@mui/material";
import { styled } from "styled-components";
import { BROWN_DARK, YELLOW, YELLOW_DARKER } from "../config/colors";

const StyledButton = styled(Button)`
  background-color: ${YELLOW};
  color: ${BROWN_DARK};
  font-size: 1rem;
  font-family: "Rubik", sans-serif;
  padding: 12px 36px;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${YELLOW_DARKER};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }
`;

const MainTiTle = styled.div`
  font-size: 35px;
  color: ${BROWN_DARK};
  padding: 10px;
`;

const Login = () => {
  const params = new URLSearchParams(window.location.search);
  const authCode = params.get("code");
  const dispatch = useDispatch();

  useEffect(() => {
    if (authCode) {
      handleAuthToken(authCode, dispatch);
    }
  }, [dispatch, authCode]);

  const handleSignIn = () => {
    const loginUrl = createUrl(jwtConfig.login_url, {
      client_id: jwtConfig.client_id,
      response_type: jwtConfig.response_type,
      scope: jwtConfig.scope,
      redirect_uri: jwtConfig.redirect_uri,
    });
    window.location.href = loginUrl;
  };

  if (authCode) return <CircularProgress />;

  return (
    <Box>
      <MainTiTle> כלבי שירות באומנה</MainTiTle>
      <StyledButton variant="contained" onClick={handleSignIn}>
        כניסה
      </StyledButton>
    </Box>
  );
};

export default Login;
