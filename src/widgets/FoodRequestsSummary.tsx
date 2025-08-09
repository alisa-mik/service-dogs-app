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
import styled from "styled-components";

interface FoodRequestsSummaryProps {
  showOnlyUnread?: boolean;
}

const NoRequestsMessage = styled.div`
  padding: 10px;
  text-align: right;
  color: #888;
`;

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

    if (!groupsToRender) return <NoRequestsMessage>אין הזמנות אוכל</NoRequestsMessage>;

    const items = foodTypes.map((type) => {
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
    });

    if (items.every((item) => item === null)) {
      return <NoRequestsMessage>אין הזמנות אוכל</NoRequestsMessage>;
    }

    return <>{items}</>;
  };

  return (
    <>
      <AlignRightTitle>אוכל</AlignRightTitle>
      {renderItems()}
    </>
  );
}


