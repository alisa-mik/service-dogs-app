import styled from "styled-components";
import { CardSimpleContainer } from "../../widgets/GroupsList";
import { Title } from "../commonParts/Labels";
import { BEAMING_SUN, PAINTED_PONY } from "../../config/colors";
import { RequestInfo } from "../../types/familyUpdateTypes";
import { Column, Row } from "../commonParts/Layouts";
import { RequestsDetails } from "./RequestsDetails";
import { useState } from "react";
import { uniqueId } from "lodash";

interface GearItemCardProps {
  type: string;
  label: string;
  pendingCount: number;
  allCount: number;
  requests: RequestInfo[];
}

interface StyledGearItemProps {
  $open: boolean;
}

const ColoredNum = styled.div`
  font-size: 14px;
  /* font-weight: 500; */
  color: ${PAINTED_PONY};
`;

const SRow = styled(Row)`
  cursor: pointer;
  align-items: center;
`;

const StyledGearItem = styled(CardSimpleContainer)<StyledGearItemProps>`
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.$open ? `${BEAMING_SUN}` : "white")};
`;

export const GearItemCard = ({
  type,
  label,
  pendingCount,
  allCount,
  requests,
}: GearItemCardProps) => {
  const isTypeOther = type === "other";
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledGearItem $open={isOpen}>
      <Column>
        <SRow onClick={handleToggleOpen}>
          <img
            style={{ height: "20px" }}
            src={`/${type}.png?v=${uniqueId()}`}
          />
          <Title>{label}</Title>
          <ColoredNum>({pendingCount} בקשות פתוחות)</ColoredNum>
        </SRow>
        {isOpen && (
          <RequestsDetails requests={requests} isTypeOther={isTypeOther} />
        )}
      </Column>
    </StyledGearItem>
  );
};
