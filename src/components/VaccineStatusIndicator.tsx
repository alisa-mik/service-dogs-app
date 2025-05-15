import styled from "styled-components";
import { MEDICAL_STATUS } from "../config/colors";
import { VaccineStatus } from "../utils/medicalUtils";
import tinycolor from "tinycolor2";

const StatusDot = styled.div<{ status: VaccineStatus }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    const baseColor = MEDICAL_STATUS[ status ];
    return tinycolor(baseColor).lighten(20).toHexString();
  }};
  border: 3px solid ${({ status }) => MEDICAL_STATUS[ status ]};
  margin-right: 4px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
  return (
    <Container>
      <StatusDot status={status} title={statusLabels[ status ]} />
      {showLabel && <span>{statusLabels[ status ]}</span>}
    </Container>
  );
}; 