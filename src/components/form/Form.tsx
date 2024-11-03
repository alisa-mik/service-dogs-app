import { useState } from "react";
import { FormikProps, useFormik } from "formik";
import { Button } from "../commonParts/Buttons.tsx";
import { FormContainer } from "../DogForm/FormStyles.ts";
import SectionInjector from "./SectionInjector.tsx";
import styled from "styled-components";
import { noop } from "lodash";
import { InputType } from "./InputInjector.tsx";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonSingleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export type configType = {
  itemGroup: "section" | "input";
  itemType: InputType | string; // secionType
  label?: string;
  itemProps?: { [key: string]: any };
  items?: configType[];
  path?: string;
};

interface Iform {
  formType: "steps" | "single";
  data: { [key: string]: any };
  config: configType[];
  validate: (values: { [key: string]: any }) => { [key: string]: any };
  onSubmit: (values: { [key: string]: any }) => void;
}

const Form = ({ data, config, onSubmit, formType, validate }: Iform) => {
  const [currentStep, setCurrentStep] = useState(0);
  const lastStepIndex = config.length - 1;

  const formik: FormikProps<{ [key: string]: any }> = useFormik<{
    [key: string]: any;
  }>({
    initialValues: data,
    validate: validate,
    onSubmit: onSubmit,
  });

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const renderStep = () => {
    if (formType === "single") {
      return (
        <SectionInjector sectionType="common" config={config} formik={formik} />
      );
    }

    return (
      <SectionInjector
        sectionType={config[currentStep].itemType}
        config={config[currentStep].items as configType[]}
        formik={formik}
        itemProps={config[currentStep].itemProps}
      />
    );
  };

  const renderButton = (
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    type: "button" | "submit" = "button"
  ) => {
    return (
      <Button type={type} onClick={onClick}>
        {text}
      </Button>
    );
  };

  const renderButtons = () => {
    if (formType === "single")
      return (
        <ButtonSingleContainer>
          {renderButton("שלח", noop, "submit")}
        </ButtonSingleContainer>
      );

    return (
      <ButtonGroup>
        {currentStep > 0 ? renderButton("חזור", prevStep) : <span></span>}
        {currentStep < lastStepIndex && renderButton("הבא", nextStep)}
        {currentStep === lastStepIndex && renderButton("שלח", noop, "submit")}
      </ButtonGroup>
    );
  };

  return (
    <FormContainer>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onSubmit={formik.handleSubmit}
      >
        {renderStep()}
        {renderButtons()}
      </form>
    </FormContainer>
  );
};

export default Form;
