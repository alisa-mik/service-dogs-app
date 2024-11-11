import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DogBasic } from "../types/dogTypes";

const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: right;
  overflow: auto;
  direction: rtl;
  border: 1px solid #cccccc;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
`;

const Label = styled.span`
  color: #888888;
`;

const Value = styled.span`
  color: #333;
`;

interface LabelValueProps {
  label: string;
  value: React.ReactNode;
}

const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => (
  <Row>
    <Label>{label}</Label>
    <Value>{value || "-"}</Value>
  </Row>
);

interface DogCardProps {
  dog: DogBasic;
}

export const DogCard = ({ dog }: DogCardProps) => {
  const navigate = useNavigate();
  const { dogId, dogName, gender, assignedFamily, breed, dogStatus } = dog;

  return (
    <Card onClick={() => navigate(`/app/dogs/${dogId}`)}>
      <LabelValue label="שם הכלב:" value={dogName} />
      <LabelValue label="גזע:" value={breed} />
      <LabelValue label="מין:" value={gender} />

      <LabelValue label="סטטוס:" value={dogStatus} />
      <LabelValue
        label="משפחה:"
        value={assignedFamily ? assignedFamily : "-"}
      />
    </Card>
  );
};
