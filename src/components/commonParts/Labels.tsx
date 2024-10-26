import styled from "styled-components";
import { BROWN_DARK } from "../../config/colors";

export const Label = styled.label`
	font-family: "Rubik";
	color: ${BROWN_DARK};
`;

export const CardTitle = styled(Label)`
	font-weight: 500;
`;

export const WidgetTitle = styled(Label)`
	color: ${BROWN_DARK};
	font-family: "Rubik";
	font-weight: 500;
	flex: 1;
	text-align: start;
	font-size: 20px;
`;
