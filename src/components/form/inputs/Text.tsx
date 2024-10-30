import React from "react";
import { Input } from "../styledInputs";
import { IInput } from "../InputInjector";

const Text: React.FC<IInput> = ({ path, formik }) => {
  return (
    <Input
      type="text"
      name={path}
      value={formik.values[path]}
      onChange={formik.handleChange}
    />
  );
};

export default Text;
