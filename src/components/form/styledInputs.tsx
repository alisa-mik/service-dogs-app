import styled, { css } from "styled-components";
import { BROWN_DARK } from "../../config/colors";

const common = css`
  width: 100%;
  font-family: "Rubik";
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  color: ${BROWN_DARK};
  outline: none;
`;

const focus = css`
  &:focus {
    border-color: #007bff;
  }
`

export const Input = styled.input`
  ${common}
  ${focus}
`;

export const TextArea = styled.textarea`
  ${common}
  height: 100px;
  resize: vertical;
  ${focus}
`;

export const Checkbox = styled.input`
    width: fit-content;
`

export const Select = styled.select`
    ${common}
    ${focus}
    -webkit-appearance: none;  /* Chrome, Safari, Edge */
    appearance: none;
`;

export const DateInput = styled.input`
  ${common}
  width: 140px;
`;
