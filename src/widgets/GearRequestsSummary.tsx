import { AlignRightTitle } from "../components/commonParts/Labels";
import { useSelector } from "react-redux";
import {
  selectGearSummaryByGroup,
  selectGearSummaryFlat,
} from "../store/familyUpdatesSlice";
import { GearItemCard } from "../components/FamilyUpdates/GearItemCard";
import { selectSelectedGroupId } from "../store/trainingGroupsSlice";
import { GearSummary, GearType } from "../types/familyUpdateTypes";
import { gearMap } from "../utils/familyUpdatesUtils";
import styled from "styled-components";

interface GearRequestsSummaryProps {
  showOnlyUnread?: boolean;
}

const NoRequestsMessage = styled.div`
  padding: 10px;
  text-align: right;
  color: #888;
`;

export default function GearRequestsSummary({ showOnlyUnread = false }: GearRequestsSummaryProps) {
  const gearRequests = useSelector(selectGearSummaryByGroup);
  const gearSummaryRequests = useSelector(selectGearSummaryFlat);

  const selectedGroupId = useSelector(selectSelectedGroupId);
  const selectedGroup = selectedGroupId ?? "all";

  const renderItems = () => {
    const gearTypes = Object.keys(gearMap) as GearType[];

    const groupsToRender =
      selectedGroup === "all"
        ? gearSummaryRequests
        : gearRequests[ selectedGroup ];

    if (!groupsToRender) return <NoRequestsMessage>אין הזמנות ציוד</NoRequestsMessage>;

    const items = gearTypes.map((type) => {
      const gearData = (groupsToRender as GearSummary)[ type ];

      if (!gearData) return null;
      const filteredRequests = showOnlyUnread
        ? gearData.requests.filter((req) => !req.resolved)
        : gearData.requests;
      const pendingCount = filteredRequests.length;
      if (pendingCount === 0) return null;

      return (
        <GearItemCard
          key={type}
          type={type}
          label={gearMap[ type ]}
          pendingCount={pendingCount}
          allCount={gearData.allCount}
          requests={filteredRequests}
        />
      );
    });

    if (items.every((item) => item === null)) {
      return <NoRequestsMessage>אין הזמנות ציוד</NoRequestsMessage>;
    }

    return <>{items}</>;
  };
  return (
    <>
      <AlignRightTitle>ציוד</AlignRightTitle>
      {renderItems()}
    </>
  );
}


