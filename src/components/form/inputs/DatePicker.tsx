import React from "react";
import { DateInput } from "../styledInputs";
import { IInput } from "../InputInjector";

const DatePicker: React.FC<IInput> = ({ path, formik }) => {
  return (
    <DateInput
      type="date"
      name={path}
      value={formik.values[path]}
      onChange={formik.handleChange}
    />
  );
};

export default DatePicker;
