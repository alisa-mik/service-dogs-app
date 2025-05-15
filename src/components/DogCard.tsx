import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DogBasic, DogWithFamily, Dog } from "../types/dogTypes";
import { VaccineStatusIndicator } from "./VaccineStatusIndicator";
import { getOverallVaccineStatus } from "../utils/medicalUtils";

const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  text-align: right;
  overflow: hidden;
  direction: rtl;
  border: 1px solid #cccccc;
  border-radius: 16px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StatusContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
  align-items: center;
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

const LabelValue = ({ label, value }: LabelValueProps) => (
  <Row>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </Row>
);

interface DogCardProps {
  dog: DogWithFamily | DogBasic;
  showFamily?: boolean;
}

const isDogHaveMedicalInfo = (dog: DogWithFamily | DogBasic): dog is Dog => {
  return 'medicalInfo' in dog && 'birthDate' in dog;
};

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

  const renderVaccineStatusIndicator = () => {
    const vaccineStatus = isDogHaveMedicalInfo(dog) ? getOverallVaccineStatus(dog) : undefined;

    if (!vaccineStatus) return undefined;

    return (
      <StatusContainer>
        <VaccineStatusIndicator status={vaccineStatus} />
      </StatusContainer>
    )
  }

  return (
    <Card onClick={() => navigate(`/app/dogs/${dogId}`)}>
      {renderVaccineStatusIndicator()}
      <LabelValue label="שם הכלב:" value={dogName} />
      <LabelValue label="גזע:" value={breed} />
      <LabelValue label="מין:" value={gender} />
      <LabelValue label="סטטוס:" value={dogStatus} />
      {renderFamily()}
    </Card>
  );
};
