import { GridCellParams } from "@mui/x-data-grid";
import styled from "styled-components";

const Cell = styled.div`
	text-align: start;
	font-family: "Rubik", "sans-serif";
	font-weight: 400;
`;

const BasicCell = ({ value }: GridCellParams): React.ReactElement => {
	const displayValue =
		value !== null && value !== undefined ? String(value) : "-";

	return <Cell>{displayValue}</Cell>;
};

export default BasicCell;
