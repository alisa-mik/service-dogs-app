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

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export type InputType =
  | "select"
  | "text"
  | "date"
  | "checkbox"
  | "texterea"
  | "category";

export interface IInput {
  path: string;
  formik: FormikProps<{ [key: string]: any }>;
}

interface IInputInjector {
  path: string;
  label: string | undefined;
  config: configType[];
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
    checkbox: Checkbox,
    texterea: TextArea,
    category: CategoryInput,
  };

  const Component = inputsMap[inputType];

  return (
    <FormItem>
      {label && <Label>{label}</Label>}
      <Component path={path} formik={formik} {...itemProp} />
      {formik.touched[path] && formik.errors[path] && (
        <ErrorText>{formik.errors[path] as string}</ErrorText>
      )}
    </FormItem>
  );
};

export default InputInjector;
