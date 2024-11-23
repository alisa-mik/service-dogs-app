import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { LabelValue } from "../components/commonParts/LabelValue";
import { useSelector } from "react-redux";
import { selectSelectedFamily } from "../store/familiesSlice";

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function FamilyDetails() {
  return (
    <>
      <WidgetHeader>
        <WidgetTitle>פרטי משפחה</WidgetTitle>
      </WidgetHeader>

      <WidgetBody></WidgetBody>
    </>
  );
}
