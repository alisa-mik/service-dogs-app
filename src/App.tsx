import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store"; // Import your RootState type
import { handleAuthToken } from "./utils/authUtils"; // The function for handling token retrieval
import { jwtConfig } from "./config/jwtConfig";
import { createUrl } from "./utils/urlBuilder";
import { Button, Typography, Box } from "@mui/material"; // MUI components
import { styled } from "styled-components"; // Styled-components

// Styled components using styled-components
const FullPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw; /* Full width */
	background-color: #f7f8fa; /* Light, neutral background */
	text-align: center;
	padding: 0; /* Remove padding */
	margin: 0; /* Remove margin */
`;

const StyledButton = styled(Button)`
	background-color: #6c757d; /* Soft, neutral gray */
	color: #fff;
	font-size: 1rem;
	padding: 12px 36px;
	margin-top: 32px;
	border-radius: 8px;
	transition: all 0.3s ease;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	&:hover {
		background-color: #5a6268; /* Slightly darker gray on hover */
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
	}
`;

const App: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isAdmin, userGroup } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const authCode = params.get("code");

		if (authCode) {
			handleAuthToken(authCode, dispatch);
		}
	}, [dispatch]);

	useEffect(() => {
		if (userGroup === "Admin") {
			navigate("/admin");
		} else if (userGroup === "Families") {
			navigate("/family");
		}
	}, [isAdmin, userGroup, navigate]);

	// Handler for initiating the sign-in process
	const handleSignIn = () => {
		const loginUrl = createUrl(jwtConfig.login_url, {
			client_id: jwtConfig.client_id,
			response_type: jwtConfig.response_type,
			scope: jwtConfig.scope,
			redirect_uri: jwtConfig.redirect_uri,
		});

		window.location.href = loginUrl;
	};

	return (
		<FullPageContainer>
			<Box>
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
					color="textPrimary"
				>
					Service Dog Management
				</Typography>
				<Typography variant="body1" color="textSecondary" gutterBottom>
					Manage your service dog profiles with ease.
				</Typography>
				<StyledButton variant="contained" onClick={handleSignIn}>
					Sign In
				</StyledButton>
			</Box>
		</FullPageContainer>
	);
};

export default App;
