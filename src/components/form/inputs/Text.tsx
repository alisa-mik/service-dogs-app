import React from "react";
import { Input } from "../styledInputs";
import { IInput } from "../InputInjector";

const Text: React.FC<IInput> = ({ path, formik, value }) => {
  return (
    <Input
      type="text"
      name={path}
      value={value}
      onChange={formik.handleChange}
    />
  );
};

export default Text;
