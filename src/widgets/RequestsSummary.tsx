import FoodRequestsSummary from "./FoodRequestsSummary";
import GearRequestsSummary from "./GearRequestsSummary";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { useState } from "react";
import { Button } from "../components/commonParts/Buttons";

const SwidgetBody = styled(WidgetBody)`
  gap: 5px;
  justify-content: flex-start;
`;


export function RequestsSummary() {
  const [ showOnlyUnread, setShowOnlyUnread ] = useState(false);

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>
          הזמנות
        </WidgetTitle>
        <Button onClick={() => setShowOnlyUnread((v) => !v)}>
          {showOnlyUnread ? "הצג הכל" : "הצג רק שלא נקראו"}
        </Button>
      </WidgetHeader>
      <SwidgetBody>
        <FoodRequestsSummary showOnlyUnread={showOnlyUnread} />
        <GearRequestsSummary showOnlyUnread={showOnlyUnread} />
      </SwidgetBody>
    </>
  );
}
