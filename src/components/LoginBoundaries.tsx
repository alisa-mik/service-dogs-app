import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuthError, setError } from "../store/errorsSlice";
import { apiClient } from "../config/apiConfig";
import { AxiosError } from "axios";

interface LoginBoundariesProps {
	children: ReactNode;
}

const LoginBoundaries: FC<LoginBoundariesProps> = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authError = useSelector(getAuthError);

	useEffect(() => {
		apiClient.interceptors.response.use(
			(response) => {
				return response;
			},
			(error: AxiosError) => {
				dispatch(setError(error));
			}
		);
	}, []);

	useEffect(() => {
		if (authError) {
			navigate("/login");
			localStorage.clear();
		}
	}, [authError, navigate]);

	return <>{children}</>;
};

export default LoginBoundaries;
