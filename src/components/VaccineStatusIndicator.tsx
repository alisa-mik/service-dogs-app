import styled from "styled-components";
import { MEDICAL_STATUS } from "../config/colors";
import { VaccineStatus } from "../utils/medicalUtils";
import { PawIcon } from "./PawIcon";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogoWrapper = styled.div`
  width:24px;
  height:24px;
  display: flex;
  align-items: center;
  transform:rotate(-30deg);
  justify-content: center;
`;

interface Props {
  status: VaccineStatus;
  showLabel?: boolean;
}

const statusLabels: Record<VaccineStatus, string> = {
  COMPLETED: "מעודכן",
  UPCOMING: "בקרוב",
  SOON: "קרוב",
  DUE: "הגיע הזמן",
  OVERDUE: "באיחור"
};

export const VaccineStatusIndicator: React.FC<Props> = ({ status, showLabel = false }) => {
  const baseColor = MEDICAL_STATUS[ status ];

  return (
    <Container>
      <LogoWrapper title={statusLabels[ status ]}>
        <PawIcon
          width={24}
          height={24}
          primaryColor={baseColor}
        />
      </LogoWrapper>
      {showLabel && <span>{statusLabels[ status ]}</span>}
    </Container>
  );
}; 