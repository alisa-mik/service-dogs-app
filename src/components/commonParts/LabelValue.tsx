import styled from "styled-components";
import { Row } from "./Layouts";

interface LabelValueProps {
  label: string;
  value: React.ReactNode;
}

const Label = styled.span`
  font-weight: bold;
  color: #888888;
`;

const Value = styled.span`
  color: #333;
`;

export const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => (
  <Row>
    <Label>{label}</Label>
    <Value>{value || "-"}</Value>
  </Row>
);
