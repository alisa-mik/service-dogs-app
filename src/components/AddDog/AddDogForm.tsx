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
import Form, { configType } from "../form/Form.tsx";

const AddDogForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formik: FormikProps<AddDogFormValues> = useFormik<AddDogFormValues>({
    initialValues: {
      dogName: "",
      birthDate: "",
      gender: "",
      breed: "",
      color: "",
      momDog: "",
      dadDog: "",
      groupId: null,
      assignedFamily: null,
      active: true,
      dogStatus: "",
      dropDate: "",
      dropReason: "",
      chipNumber: "",
      medicalInfo: "",
      summary: "",
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

  const renderButtons = () => {
    return (
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
    );
  };

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "dogName",
          label: "שם הכלב:",
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "birthDate",
          label: "תאריך לידה:",
        },
        {
          itemGroup: "input",
          itemType: "select",
          label: "בחר מין",
          itemProps: {
            options: [
              {
                value: "",
                label: "בחר מין",
              },
              {
                value: "זכר",
              },
              {
                value: "נקבה",
              },
            ],
          },
          path: "gender",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "breed",
          label: "גזע:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "color",
          label: "צבע:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "momDog",
          label: "שם האם:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "dadDog",
          label: "שם האב:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "פעיל:",
          },
          path: "active",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "groupId",
          label: "קבוצה:",
        },
        {
          itemGroup: "input",
          itemType: "select",
          label: "סטטוס:",
          itemProps: {
            options: [
              {
                value: "",
                label: "בחר סטטוס",
              },
              {
                value: "לפני אומנה",
              },
              {
                value: "באומנה",
              },
              {
                value: "בהכשרה",
              },
              {
                value: "מצוות",
              },
              {
                value: "עובד",
              },
              {
                value: "בפנסיה",
              },
              {
                value: "נשר",
              },
              {
                value: "עבר להרבעה",
              },
              {
                value: "מת",
              },
            ],
          },
          path: "dogStatus",
        },
        {
          itemGroup: "section",
          itemType: "condition",
          itemProps: {
            conditions: [
              {
                path: "dogStatus",
                values: ["נשר"],
              },
            ],
          },
          items: [
            {
              itemGroup: "input",
              itemType: "text",
              path: "dogName",
              label: "סיבת נשירה:",
            },
            {
              itemGroup: "input",
              itemType: "date",
              path: "birthDate",
              label: "תאריך נשירה:",
            },
          ],
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "chipNumber",
          label: "מספר שבב:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "done",
    },
  ];

  const data = {
    dogName: "",
    birthDate: "",
    gender: "",
    breed: "",
    color: "",
    momDog: "",
    dadDog: "",
    groupId: null,
    assignedFamily: null,
    active: true,
    dogStatus: "",
    dropDate: "",
    dropReason: "",
    chipNumber: "",
    medicalInfo: "",
    summary: "",
  };

  return (
    <>
      {/* <FormContainer>
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
      </FormContainer> */}
      <Form
        formType="steps"
        config={config}
        data={data}
        onSubmit={(values) => console.log(values)}
      />
      {formSubmitted && <SuccessMessage>כלב נוסף בהצלחה!</SuccessMessage>}
    </>
  );
};

export default AddDogForm;
