import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormikProps, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { ButtonGroup, FormContainer, SuccessMessage } from "./FormStyles";
import FormStep1 from "./FormStep1.tsx";
import FormStep2 from "./FormStep2.tsx";
import FormStep3 from "./FormStep3.tsx";
import FormStep4 from "./FormStep4.tsx";
import { AddDogFormValues } from "../../types/dogTypes.ts";
import { AppDispatch } from "../../store/index.ts";
import { refetchDogs } from "../../store/dogsSlice.ts";
import { Button } from "../commonParts/Buttons.tsx";
import { apiClient } from "../../config/apiConfig.ts";

const AddDogForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formik: FormikProps<AddDogFormValues> = useFormik<AddDogFormValues>({
    initialValues: {
      dogName: "",
      birthDate: "",
      gender: null,
      breed: null,
      color: "",
      momDog: null,
      dadDog: null,
      groupId: null,
      assignedFamily: null,
      assignedProject: null,
      active: true,
      dogStatus: "",
      dropDate: "",
      dropReason: "",
      chipNumber: "",
      medicalInfo: "",
      summary: null,
    },
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        dogId: uuidv4(),
        birthDate: Math.floor(new Date(values.birthDate).getTime() / 1000),
      };

      console.log("Submitted values:", formattedValues);

      const response = await apiClient.post("add-dog", formattedValues);

      setFormSubmitted(true);
      dispatch(refetchDogs());
      return response.data;
    },
  });

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1 formik={formik} />;
      case 2:
        return <FormStep2 formik={formik} />;
      case 3:
        return <FormStep3 formik={formik} />;
      case 4:
        return <FormStep4 />;
      default:
        return null;
    }
  };

  return (
    <>
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
          <ButtonGroup>
            {currentStep > 1 && (
              <Button type="button" onClick={prevStep}>
                חזור
              </Button>
            )}
            {currentStep < 4 && (
              <Button type="button" onClick={nextStep}>
                הבא
              </Button>
            )}
            {currentStep === 4 && <Button type="submit">שלח</Button>}
          </ButtonGroup>
        </form>
      </FormContainer>
      {formSubmitted && <SuccessMessage>כלב נוסף בהצלחה!</SuccessMessage>}
    </>
  );
};

export default AddDogForm;
