import styled from "styled-components";

export const Elevation = styled.div<{ level: number }>`
  box-shadow: ${({ level }) => {
    switch (level) {
      case 1:
        return "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12)";
      case 2:
        return "0px 3px 6px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 1px 4px rgba(0, 0, 0, 0.12)";
      case 3:
        return "0px 10px 20px rgba(0, 0, 0, 0.2), 0px 6px 6px rgba(0, 0, 0, 0.14), 0px 3px 6px rgba(0, 0, 0, 0.12)";
      case 4:
        return "0px 14px 28px rgba(0, 0, 0, 0.2), 0px 10px 10px rgba(0, 0, 0, 0.14), 0px 5px 10px rgba(0, 0, 0, 0.12)";
      case 5:
        return "0px 19px 38px rgba(0, 0, 0, 0.2), 0px 15px 12px rgba(0, 0, 0, 0.14), 0px 7px 10px rgba(0, 0, 0, 0.12)";
      default:
        return "none";
    }
  }};
`;
