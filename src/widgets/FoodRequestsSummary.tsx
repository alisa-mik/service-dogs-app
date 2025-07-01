import { selectSelectedGroupId } from "../store/trainingGroupsSlice";
import { useSelector } from "react-redux";
import {
  selectFlatFoodSummary,
  selectFoodSummaryByGroup,
} from "../store/familyUpdatesSlice";
import { foodMap } from "../utils/familyUpdatesUtils";
import { FoodSummary, FoodType } from "../types/familyUpdateTypes";
import { GearItemCard } from "../components/FamilyUpdates/GearItemCard";
import { AlignRightTitle } from "../components/commonParts/Labels";

interface FoodRequestsSummaryProps {
  showOnlyUnread?: boolean;
}

export default function FoodRequestsSummary({ showOnlyUnread = false }: FoodRequestsSummaryProps) {
  const foodRequests = useSelector(selectFoodSummaryByGroup);
  const foodSummaryRequests = useSelector(selectFlatFoodSummary);

  const selectedGroupId = useSelector(selectSelectedGroupId);
  const selectedGroup = selectedGroupId ?? "all";

  const renderItems = () => {
    const foodTypes = Object.keys(foodMap) as FoodType[];

    const groupsToRender =
      selectedGroup === "all"
        ? foodSummaryRequests
        : foodRequests[ selectedGroup ];

    if (!groupsToRender) return null;

    return (
      <>
        {foodTypes.map((type) => {
          const foodData = (groupsToRender as FoodSummary)[ type ];
          if (!foodData) return null;
          const filteredRequests = showOnlyUnread
            ? foodData.requests.filter((req) => !req.resolved)
            : foodData.requests;
          const pendingCount = filteredRequests.length;
          if (pendingCount === 0) return null;

          return (
            <GearItemCard
              key={type}
              type={type}
              label={foodMap[ type ]}
              pendingCount={pendingCount}
              allCount={foodData.allCount}
              requests={filteredRequests}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <AlignRightTitle>אוכל</AlignRightTitle>
      {renderItems()}
    </>
  );
}
