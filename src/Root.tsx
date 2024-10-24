import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { styled } from "styled-components";
import { checkSessionOnStart } from "./utils/authUtils";
import { BEIGE_LIGHT } from "./config/colors";
import LoginBoundaries from "./components/LoginBoundaries";

const FullPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: ${BEIGE_LIGHT};
	text-align: center;
	padding: 0;
	margin: 0;
	direction: rtl;
`;

const Root = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userGroup } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const hasToken = checkSessionOnStart(dispatch);

		if (!hasToken) return navigate("/login");

		if (userGroup === "Admin") {
			navigate("/app/main");
		} else if (userGroup === "Families") {
			navigate("/family");
		}
	}, [userGroup, navigate, dispatch]);

	return (
		<FullPageContainer>
			<LoginBoundaries>
				<Outlet />
			</LoginBoundaries>
		</FullPageContainer>
	);
};

export default Root;
