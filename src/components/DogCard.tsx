import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DogBasic, DogWithFamily } from "../types/dogTypes";

const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
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
  dog: DogWithFamily | DogBasic;
  showFamily?: boolean;
}

export const DogCard = ({ dog, showFamily = true }: DogCardProps) => {
  const navigate = useNavigate();

  const { dogId, dogName, gender, breed, dogStatus } = dog;

  const renderFamily = () => {
    if (!showFamily) return undefined;

    if ("family" in dog) {
      return (
        <LabelValue
          label="משפחה:"
          value={dog.family ? dog.family.familyName : "-"}
        />
      );
    }

    return undefined;
  };

  return (
    <Card onClick={() => navigate(`/app/dogs/${dogId}`)}>
      <LabelValue label="שם הכלב:" value={dogName} />
      <LabelValue label="גזע:" value={breed} />
      <LabelValue label="מין:" value={gender} />
      <LabelValue label="סטטוס:" value={dogStatus} />
      {renderFamily()}
    </Card>
  );
};
