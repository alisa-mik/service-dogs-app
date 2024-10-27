import styled from "styled-components";

const Section = styled.section`
  flex: 1;
`;

const Body = styled.div`
  flex: 1;
  padding: 0 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  text-align: right;
  gap: 10px;
  width: 100%;
  overflow: auto;
  direction: rtl;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
`;

const Label = styled.span`
  font-weight: bold;
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

export const DogCard = () => {
  return (
    <Body>
      {" "}
      dogCard
      {/* <Section>
      <LabelValue label="שם הכלב:" value={dogName} />
      <LabelValue label="צבע:" value={color} />
      <LabelValue label="גזע:" value={breed} />
      <LabelValue
        label="תאריך לידה:"
        value={formatDateFromSeconds(birthDate)}
      />
      <LabelValue label="גיל:" value={getAgeFromSeconds(birthDate)} />
      <LabelValue label="שם האם:" value={momDog.dogName} />
      <LabelValue label="שם האב:" value={dadDog.dogName} />
    </Section> */}
      {/* <Section>
      <LabelValue label="קבוצה:" value={groupId} />
      <LabelValue label="משויך למשפחה:" value={assignedFamily.familyName} />
      <LabelValue label="פרויקט:" value={assignedProject.projectName} />
      <LabelValue label="סטטוס:" value={dogStatus} />
      <LabelValue label="מספר שבב:" value={chipNumber} />
      <LabelValue label="תאריך פרישה:" value={dropDate} />
      <LabelValue label="סיבת פרישה:" value={dropReason} />
    </Section> */}
    </Body>
  );
};
