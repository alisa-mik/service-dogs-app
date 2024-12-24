import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateInput } from "../styledInputs";
import { IInput } from "../InputInjector";
import { isNumber } from "lodash";

const getDatePickerFormat = (initialDate: string | number) => {
  const formatSecondsForDatePicker = (seconds: number): string => {
    return dayjs.unix(seconds).format("YYYY-MM-DD");
  };

  const datePickerFormat = isNumber(initialDate)
    ? formatSecondsForDatePicker(initialDate)
    : initialDate;

  return datePickerFormat;
};

const DatePicker: React.FC<IInput> = ({ path, formik, value }) => {
  const [date, setDate] = useState(getDatePickerFormat(value));

  useEffect(() => {
    const datePickerFormat = getDatePickerFormat(date);

    if (
      dayjs(datePickerFormat).isAfter("2020", "year") &&
      dayjs(datePickerFormat).isBefore("2090", "year")
    ) {
      formik.setFieldValue(path, dayjs(date).unix());
    }
  }, [date]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <DateInput type="date" name={path} value={date} onChange={handleChange} />
  );
};

export default DatePicker;
