import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { styled } from "styled-components";
import { checkSessionOnStart } from "./utils/authUtils";

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
	const dispatch = useDispatch();

	const { userGroup } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const hasToken = checkSessionOnStart(dispatch);

		if (!hasToken) return navigate("/login");

		if (userGroup === "Admin") {
			navigate("/app");
		} else if (userGroup === "Families") {
			navigate("/family");
		}
	}, [userGroup, navigate, dispatch]);

	return (
		<FullPageContainer>
			<Outlet />
		</FullPageContainer>
	);
};

export default Root;
