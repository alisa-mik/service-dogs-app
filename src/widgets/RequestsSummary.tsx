import FoodRequestsSummary from "./FoodRequestsSummary";
import GearRequestsSummary from "./GearRequestsSummary";
import { WidgetBody } from "../components/commonParts/Layouts";
import styled from "styled-components";

const SwidgetBody = styled(WidgetBody)`
  gap: 5px;
  justify-content: flex-start;
`;

export function RequestsSummary() {
  return (
    <>
      <SwidgetBody>
        <FoodRequestsSummary />
        <GearRequestsSummary />
      </SwidgetBody>
    </>
  );
}
