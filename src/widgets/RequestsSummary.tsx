import FoodRequestsSummary from "./FoodRequestsSummary";
import GearRequestsSummary from "./GearRequestsSummary";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGearSummaryFlat, selectFlatFoodSummary } from "../store/familyUpdatesSlice";
import { selectSelectedGroupId } from "../store/trainingGroupsSlice";
import { WhatsAppShareButton } from "../components/commonParts/WhatsAppShareButton";
import { formatRequestsSummary, shareViaWhatsApp } from "../utils/whatsappUtils";
import { WidgetTitle } from "../components/commonParts/Labels";

const SwidgetBody = styled(WidgetBody)`
  gap: 5px;
  justify-content: flex-start;
`;

const ShareButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

export function RequestsSummary() {
  const gearSummaryRequests = useSelector(selectGearSummaryFlat);
  const foodSummaryRequests = useSelector(selectFlatFoodSummary);
  const selectedGroupId = useSelector(selectSelectedGroupId);
  const selectedGroup = selectedGroupId ?? "all";

  const handleShare = () => {
    const message = formatRequestsSummary(
      gearSummaryRequests,
      foodSummaryRequests,
      selectedGroup
    );
    shareViaWhatsApp(message);
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>
          הזמנות
        </WidgetTitle>
        <ShareButtonContainer>
          <WhatsAppShareButton onClick={handleShare} />
        </ShareButtonContainer>
      </WidgetHeader>
      <SwidgetBody>
        <FoodRequestsSummary />
        <GearRequestsSummary />
      </SwidgetBody>
    </>
  );
}
