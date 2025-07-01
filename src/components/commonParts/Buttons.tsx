import styled from "styled-components";
import { BROWN_DARK, WHITE, YELLOW, YELLOW_DARKER } from "../../config/colors";

type ButtonType = {
  weight?: number;
  padding?: string;
};

export const Button = styled.button<ButtonType>`
  background-color: ${YELLOW};
  border-radius: 8px;
  color: ${BROWN_DARK};
  border: 1px solid transparent;
  padding: ${({ padding = "7px" }) => padding};
  /* font-size: 16px; */
  font-weight: ${({ weight = 400 }) => weight};
  cursor: pointer;
  transition: border-color 0.25s;
  font-family: "Rubik";
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;

  &:hover {
    background-color: ${YELLOW_DARKER};
  }
`;

export const SquareButton = styled(Button)`
  background-color: ${YELLOW};
  width: 30px;
  height: 30px;
  font-size: 24px;
  color: ${WHITE};
  cursor: pointer;
`;
