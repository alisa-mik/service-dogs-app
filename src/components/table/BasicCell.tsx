import { GridCellParams } from "@mui/x-data-grid";
import styled from "styled-components";

const Cell = styled.div`
  text-align: start;
  font-family: "Rubik", "sans-serif";
  font-weight: 400;
`;

const isValue = (value: any) => {
  return (
    value !== null &&
    value !== "undefined" &&
    value !== undefined &&
    value !== ""
  );
};

const BasicCell = ({ value }: GridCellParams): React.ReactElement => {
  const displayValue = isValue(value) ? String(value) : "-";

  return <Cell>{displayValue}</Cell>;
};

export default BasicCell;
