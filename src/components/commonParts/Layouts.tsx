import styled from "styled-components";

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
