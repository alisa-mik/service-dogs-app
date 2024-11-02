import { GridCellParams } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import { Row } from "../commonParts/Layouts";
import styled from "styled-components";
import { Label } from "../commonParts/Labels";

const Cell = styled(Row)`
	height: 100%;
	align-items: center;
`;

const Lbl = styled(Label)`
	padding: 5px;
`;

const VCell = ({ value }: GridCellParams): React.ReactElement => {
	return (
		<Cell>{value ? <CheckIcon color={"success"} /> : <Lbl>-</Lbl>}</Cell>
	);
};

export default VCell;
