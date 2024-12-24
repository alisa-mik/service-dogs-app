import React from "react";
import { Select as StyledSelect } from "../styledInputs";
import { IInput } from "../InputInjector";

type option = {
  value: string | number;
  label: string;
};

interface ISelect extends IInput {
  options: option[];
}

const Select: React.FC<ISelect> = ({ path, formik, value, options }) => {
  const renderOptions = () => {
    return options.map((op) => (
      <option
        key={op.value}
        value={op.value}
        label={op.label || (op.value as string)}
      />
    ));
  };
  return (
    <StyledSelect name={path} value={value} onChange={formik.handleChange}>
      {renderOptions()}
    </StyledSelect>
  );
};

export default Select;
