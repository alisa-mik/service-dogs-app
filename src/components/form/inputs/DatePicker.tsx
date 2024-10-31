import React from "react";
import dayjs from "dayjs";
import { DateInput } from "../styledInputs";
import { IInput } from "../InputInjector";
import { isNumber } from "lodash";

const DatePicker: React.FC<IInput> = ({ path, formik }) => {
  const formatSecondsForDatePicker = (seconds: number): string => {
    return dayjs.unix(seconds).format("YYYY-MM-DD");
  };

  const val = formik.values[path];
  const datePickerFormat = isNumber(val)
    ? formatSecondsForDatePicker(val)
    : val;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(path, dayjs(event.target.value).unix());
  };

  return (
    <DateInput
      type="date"
      name={path}
      value={datePickerFormat}
      onChange={handleChange}
    />
  );
};

export default DatePicker;
