import { useSelector } from "react-redux";
import { selectDogProfile } from "../store/dogProfileSlice";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { selectFamilyById } from "../store/familiesSlice";
import { LabelValue } from "../components/commonParts/LabelValue";
import styled from "styled-components";

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function DogFamily() {
  const dog = useSelector(selectDogProfile);
  if (!dog) {
    return <div>No dog profile available.</div>;
  }
  const { assignedFamily } = dog;
  if (!assignedFamily) return <>לא משוייך למשפחה</>;
  const family = useSelector(selectFamilyById(assignedFamily));

  const renderFamilyDetails = () => {
    const { familyName, contactName, generalInfo, contactInfo } = family;
    return (
      <Section>
        <LabelValue label="שם משפחה:" value={familyName} />
        <LabelValue label="שם איש קשר:" value={contactName} />
        <LabelValue label="מספר טלפון:" value={contactInfo.phoneNumber} />
        <LabelValue label="מייל:" value={contactInfo.email} />
        <LabelValue label="עיר מגורים:" value={contactInfo.city} />
        <LabelValue label="כתובת:" value={contactInfo.address} />
        <LabelValue label="מידע נוסף:" value={generalInfo} />
      </Section>
    );
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>המשפחה שלי</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        {family ? renderFamilyDetails() : "No family data available"}
      </WidgetBody>
    </>
  );
}
