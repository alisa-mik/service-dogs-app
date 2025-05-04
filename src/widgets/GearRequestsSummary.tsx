import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { useSelector } from "react-redux";
import {
  selectGearSummaryByGroup,
  selectGearSummaryFlat,
} from "../store/familyUpdatesSlice";
import { GearItemCard } from "../components/FamilyUpdates/GearItemCard";
import styled from "styled-components";
import { selectSelectedGroupId } from "../store/trainingGroupsSlice";
import { GearSummary, GearType } from "../types/familyUpdateTypes";
import { gearMap } from "../utils/familyUpdatesUtils";

const SwidgetBody = styled(WidgetBody)`
  width: 100%;
  justify-content: flex-start;
`;

export default function GearRequestsSummary() {
  const gearRequests = useSelector(selectGearSummaryByGroup);
  const gearSummaryRequests = useSelector(selectGearSummaryFlat);

  const selectedGroupId = useSelector(selectSelectedGroupId);
  const selectedGroup = selectedGroupId ?? "all";

  const renderItems = () => {
    const gearTypes = Object.keys(gearMap) as GearType[];

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
              label={gearMap[type]}
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
        <WidgetTitle>ציוד</WidgetTitle>
      </WidgetHeader>
      <SwidgetBody>{renderItems()}</SwidgetBody>
    </>
  );
}
