import React from "react";
import { Checkbox as StyledCheckbox } from "../styledInputs";
import { IInput } from "../InputInjector";
import { Label } from "../../DogForm/FormStyles";

interface ICheckbox extends IInput {
  label: string;
}

const Checkbox: React.FC<ICheckbox> = ({ path, formik, value, label }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <StyledCheckbox
        type="checkbox"
        name={path}
        checked={value}
        onChange={formik.handleChange}
      />
      <Label>{label}</Label>
    </div>
  );
};

export default Checkbox;
