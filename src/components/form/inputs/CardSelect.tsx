import styled from "styled-components";
import { BEIGE_LIGHT, YELLOW_DARKER } from "../../../config/colors";
import { IInput } from "../InputInjector";

const TypeList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TypeCard = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 18px 16px;
  background: ${({ selected }) => (selected ? BEIGE_LIGHT : '#fff')};
  border: 2px solid ${({ selected }) => (selected ? YELLOW_DARKER : "#f3f1e7")};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 400;
  color: #222;
  text-align: right;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: border 0.2s, box-shadow 0.2s, background 0.2s;
  direction: rtl;
  &:active, &:focus {
    border: 2px solid ${YELLOW_DARKER};
    box-shadow: 0 2px 8px rgba(255, 221, 51, 0.08);
    background: #fffbe6;
  }
`;

type option = {
  value: string | number;
  label: string;
};

interface ISelect extends IInput {
  options: option[];
}

export const CardSelect: React.FC<ISelect> = ({ path, formik, value, options }) => {
  return (
    <div>
      <TypeList>
        {options.map(opt => (
          <TypeCard
            key={opt.value}
            selected={value === opt.value}
            onClick={() => formik.setFieldValue(path, opt.value)}>
            {opt.label}
          </TypeCard>
        ))}
      </TypeList>
    </div>
  );
}
