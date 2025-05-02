import {
  Column,
  Row,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { useSelector } from "react-redux";
import {
  selectGearSummaryByGroup,
  selectGearSummaryFlat,
} from "../store/familyUpdatesSlice";
import { Select } from "../components/form/styledInputs";
import { GearItemCard } from "../components/FamilyUpdates/GearItemCard";
import styled from "styled-components";
import { selectSelectedGroupId } from "../store/trainingGroupsSlice";
import { GearSummary } from "../types/familyUpdateTypes";

const SwidgetBody = styled(WidgetBody)`
  width: 100%;
  justify-content: flex-start;
`;

const StyledWidgetTitle = styled(WidgetTitle)``;

const labelMap: Record<string, string> = {
  leash: "רצועה",
  collar: "קולר",
  easywalk: "ריתמה",
  bone: "עצם לעיסה",
  wastebags: "שקיות איסוף",
  other: "אחר",
};

export default function GearRequestsSummary() {
  const gearRequests = useSelector(selectGearSummaryByGroup);
  const gearSummaryRequests = useSelector(selectGearSummaryFlat);

  const selectedGroupId = useSelector(selectSelectedGroupId);
  const selectedGroup = selectedGroupId ?? "all";

  console.log({ gearSummaryRequests });

  const renderItems = () => {
    const gearTypes = [
      "leash",
      "collar",
      "easywalk",
      "bone",
      "wastebags",
      "other",
    ] as const;

    const groupsToRender =
      selectedGroup === "all"
        ? gearSummaryRequests
        : gearRequests[selectedGroup];

    if (!groupsToRender) return null;

    return (
      <>
        {gearTypes.map((type) => {
          const gearData = (groupsToRender as GearSummary)[type];
          //   if (!gearData || gearData.pendingCount === 0) return null;

          return (
            <GearItemCard
              key={type}
              type={type}
              label={labelMap[type]}
              pendingCount={gearData.pendingCount}
              allCount={gearData.allCount}
              requests={gearData.requests}
            />
          );
        })}
      </>
    );
  };
  return (
    <>
      <WidgetHeader>
        <StyledWidgetTitle>ציוד</StyledWidgetTitle>
      </WidgetHeader>
      <SwidgetBody>{renderItems()}</SwidgetBody>
    </>
  );
}
