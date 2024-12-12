import styled from "styled-components";
import { BROWN_DARK } from "../../config/colors";

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Gap = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${({ gap = "10px" }) => gap};
`;

export const Column = styled.div<{ gap?: string }>`
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: ${({ gap = "10px" }) => gap};
`;

export const Row = styled.div<{ gap?: string }>`
  direction: rtl;
  display: flex;
  gap: ${({ gap = "10px" }) => gap};
  width: 100%;
`;

export const RowWrap = styled(Row)`
  flex-wrap: wrap;
`;

export const WidgetHeader = styled(Row)`
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const WidgetBody = styled(Column)`
  flex: 1;
  padding: 0 10px 10px 10px;
  justify-content: space-between;
  text-align: right;
  gap: 10px;
  width: 100%;
  overflow: auto;
  color: ${BROWN_DARK};
`;
