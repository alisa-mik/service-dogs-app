import React from "react";
import { TextArea as StyledArea } from "../styledInputs";
import { IInput } from "../InputInjector";

const TextArea: React.FC<IInput> = ({ path, formik }) => {
  return (
    <StyledArea
      name={path}
      value={formik.values[path]}
      onChange={formik.handleChange}
    />
  );
};

export default TextArea;
