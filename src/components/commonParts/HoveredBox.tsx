import { FC, useState } from "react";
import styled from "styled-components";
import { WHITE } from "../../config/colors";

const StyledHoveredBox = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100%;
  inset: 0;
  position: absolute;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-inline-end: 30px;
  background: linear-gradient(90deg, ${WHITE} 10%, ${WHITE}00 100%);
  opacity: ${({ show }) => (show ? 1 : 0)};
  border-radius: 20px;
`;

interface IdateText {
  size?: string;
  children: React.ReactNode;
}

const HoveredBox: FC<IdateText> = ({ children }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <StyledHoveredBox
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      show={isHover}
    >
      {children}
    </StyledHoveredBox>
  );
};

export default HoveredBox;
