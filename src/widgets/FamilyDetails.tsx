import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { LabelValue } from "../components/commonParts/LabelValue";
import { useSelector } from "react-redux";
import { selectSelectedFamily } from "../store/familiesSlice";
import FamilyForm from "../components/FamilyForm";

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export default function FamilyDetails() {
  const selectedFamily = useSelector(selectSelectedFamily);

  const { familyName, contactName, contactInfo } = selectedFamily || {};

  const renderFamilyDetails = () => {
    return (
      <Section>
        <LabelValue label="שם משפחה:" value={familyName} />
        <LabelValue label="שם איש קשר:" value={contactName} />
        <LabelValue label="מספר טלפון:" value={contactInfo?.phoneNumber} />
        <LabelValue label="מייל:" value={contactInfo?.email} />
        <LabelValue label="עיר מגורים:" value={contactInfo?.city} />
        <LabelValue label="כתובת:" value={contactInfo?.address} />
      </Section>
    );
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>פרטי משפחה</WidgetTitle>
        <FamilyForm icon={"edit"} data={selectedFamily} />
      </WidgetHeader>

      <WidgetBody>{renderFamilyDetails()}</WidgetBody>
    </>
  );
}
