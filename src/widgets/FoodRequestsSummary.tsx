import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import styled from "styled-components";
import { selectSelectedGroupId } from "../store/trainingGroupsSlice";
import { useSelector } from "react-redux";
import {
  selectFlatFoodSummary,
  selectFoodSummaryByGroup,
} from "../store/familyUpdatesSlice";
import { foodMap } from "../utils/familyUpdatesUtils";
import { FoodSummary, FoodType } from "../types/familyUpdateTypes";
import { GearItemCard } from "../components/FamilyUpdates/GearItemCard";

const SwidgetBody = styled(WidgetBody)`
  width: 100%;
  justify-content: flex-start;
`;

export default function FoodRequestsSummary() {
  const foodRequests = useSelector(selectFoodSummaryByGroup);
  const foodSummaryRequests = useSelector(selectFlatFoodSummary);

  const selectedGroupId = useSelector(selectSelectedGroupId);
  const selectedGroup = selectedGroupId ?? "all";

  const renderItems = () => {
    const foodTypes = Object.keys(foodMap) as FoodType[];

    const groupsToRender =
      selectedGroup === "all"
        ? foodSummaryRequests
        : foodRequests[selectedGroup];

    if (!groupsToRender) return null;

    return (
      <>
        {foodTypes.map((type) => {
          const foodData = (groupsToRender as FoodSummary)[type];
          //   if (!gearData || gearData.pendingCount === 0) return null;

          return (
            <GearItemCard
              key={type}
              type={type}
              label={foodMap[type]}
              pendingCount={foodData.pendingCount}
              allCount={foodData.allCount}
              requests={foodData.requests}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>אוכל</WidgetTitle>
      </WidgetHeader>
      <SwidgetBody>{renderItems()}</SwidgetBody>
    </>
  );
}
