import styled from "styled-components";
import { BROWN_DARK } from "../../config/colors";

export const Label = styled.label`
	font-family: "Rubik";
`;

export const CardTitle = styled(Label)`
	font-weight: 500;
`;

export const WidgetTitle = styled(Label)`
	color: ${BROWN_DARK};
	font-family: "Rubik";
	font-weight: 500;
	font-size: 20px;
`;
