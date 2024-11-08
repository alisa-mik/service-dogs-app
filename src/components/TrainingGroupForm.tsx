import React from "react";
import { apiClient, apiConfig } from "../config/apiConfig";

import Form, { configType } from "./form/Form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { refetchGroups } from "../store/trainingGroupsSlice";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  if (!values.groupId || typeof values.groupId !== "string") {
    errors.groupId = "שדה הקבוצה הוא שדה חובה";
  }

  return errors;
};

interface TrainingGroupFormProps {
  data: any;
  onClose: () => void;
}

const TrainingGroupForm: React.FC<TrainingGroupFormProps> = ({
  data,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: { [key: string]: any }) => {
    try {
      await apiClient.post(apiConfig.addTrainingGroup, {
        groupId: values.groupId,
        startDate: values.startDate,
        active: values.active,
      });
      onClose();
      dispatch(refetchGroups());
    } catch (error) {
      console.error("Error adding update:", error);
    }
  };

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "groupId",
          label: "קבוצה:",
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "startDate",
          label: "תאריך התחלה",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "active",
          itemProps: {
            label: "פעילה:",
          },
        },
      ],
    },
  ];

  return (
    <Form
      formType="single"
      config={config}
      data={data}
      validate={validate}
      onSubmit={onSubmit}
    />
  );
};

export default TrainingGroupForm;
