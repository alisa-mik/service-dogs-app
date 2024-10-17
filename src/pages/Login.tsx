import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAuthToken } from "../utils/authUtils"; // The function for handling token retrieval
import { jwtConfig } from "../config/jwtConfig";
import { createUrl } from "../utils/urlBuilder";
import { Button, Typography, Box, CircularProgress } from "@mui/material"; // MUI components
import { styled } from "styled-components"; // Styled-components
// import { setUser } from "../store/userSlice";

const StyledButton = styled(Button)`
	background-color: #2a9d8f; /* Soft, neutral gray */
	color: #fff;
	font-size: 1rem;
	padding: 12px 36px;
	margin-top: 32px;
	border-radius: 8px;
	transition: all 0.3s ease;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	&:hover {
		background-color: #247b71; /* Slightly darker gray on hover */
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
	}
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
		// dispatch(setUser({ isAdmin: true, userId: "111", userGroup: "Admin" }));
		// return;

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
			<Typography variant="h3" component="h1" gutterBottom color="#fff">
				Service Dog Management
			</Typography>
			<Typography variant="body1" color="#fff" gutterBottom>
				Manage your service dog profiles with ease.
			</Typography>
			<StyledButton variant="contained" onClick={handleSignIn}>
				Sign In
			</StyledButton>
			<Outlet />
		</Box>
	);
};

export default Login;
