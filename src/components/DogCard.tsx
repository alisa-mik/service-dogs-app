import styled from "styled-components";

const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 250px;
  overflow: auto;
  direction: rtl;
  border: 1px solid #cccccc;
  border-radius: 16px;
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

export const DogCard = ({ dog }) => {
  const { dogId, dogName, dogStatus, active, groupId } = dog;

  return (
    <Card>
      <LabelValue label="שם הכלב:" value={dogName} />
      <LabelValue label="סטטוס:" value={dogStatus} />
      <LabelValue label="פעיל:" value={active ? "כן" : "לא"} />
      <LabelValue label="קבוצה:" value={groupId} />

      {/* <LabelValue label="גזע:" value={breed} /> */}
      {/* <LabelValue
          label="תאריך לידה:"
          value={formatDateFromSeconds(birthDate)}
        /> */}
      {/* <LabelValue label="גיל:" value={getAgeFromSeconds(birthDate)} /> */}
      {/* <LabelValue label="שם האם:" value={momDog.dogName} /> */}
      {/* <LabelValue label="שם האב:" value={dadDog.dogName} /> */}
    </Card>
  );
};
