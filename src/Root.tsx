import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { styled } from "styled-components";

const FullPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: #264653;
	text-align: center;
	padding: 0;
	margin: 0;
	direction: rtl;
`;

const Root = () => {
	const navigate = useNavigate();

	const { isAdmin, userGroup } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (userGroup === "Admin") {
			navigate("/app");
		} else if (userGroup === "Families") {
			navigate("/family");
		} else {
			navigate("/login");
		}
	}, [isAdmin, userGroup, navigate]);

	return (
		<FullPageContainer>
			<Outlet />
		</FullPageContainer>
	);
};

export default Root;
