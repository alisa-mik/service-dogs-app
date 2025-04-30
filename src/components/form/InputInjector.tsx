import { FormikProps } from "formik";
import { configType } from "./Form";
import { FormItem, Label } from "../DogForm/FormStyles";
import Text from "./inputs/Text";
import DatePicker from "./inputs/DatePicker";
import Select from "./inputs/Select";
import Checkbox from "./inputs/CheckBox";
import TextArea from "./inputs/TextArea";
import CategoryInput from "./inputs/CategoryInput";
import styled from "styled-components";
import { AttendanceInput } from "./inputs/AttendanceInput";
import AutoComplete from "./inputs/AutoComplete";
import { get } from "lodash";

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export type InputType =
  | "select"
  | "autoComplete"
  | "text"
  | "date"
  | "checkbox"
  | "textarea"
  | "category"
  | "attendance";

export interface IInput {
  path: string;
  formik: FormikProps<{ [key: string]: any }>;
  value: any;
}

interface IInputInjector {
  path: string;
  label?: string;
  config?: configType[]; // Optional now
  formik: FormikProps<{ [key: string]: any }>;
  inputType: InputType;
  itemProp: { [key: string]: any };
}

const InputInjector: React.FC<IInputInjector> = ({
  formik,
  label,
  path,
  inputType,
  itemProp,
}) => {
  const inputsMap = {
    text: Text,
    date: DatePicker,
    select: Select,
    autoComplete: AutoComplete,
    checkbox: Checkbox,
    textarea: TextArea,
    category: CategoryInput,
    attendance: AttendanceInput,
  };

  const Component = inputsMap[inputType];

  // Check if the Component exists before using it
  if (!Component) {
    throw new Error(`Input type "${inputType}" is not supported.`);
  }

  return (
    <FormItem>
      {label && <Label>{label}</Label>}
      <Component
        options={[]}
        dogs={[]}
        label={""}
        path={path}
        formik={formik}
        value={get(formik.values, path)}
        {...itemProp}
      />
      {get(formik.touched, path) && get(formik.errors, path) && (
        <ErrorText>{get(formik.errors, path) as string}</ErrorText>
      )}
    </FormItem>
  );
};

export default InputInjector;
