import React from "react";
import { apiClient, apiConfig } from "../config/apiConfig";

import Form, { configType } from "./form/Form";

const validate = (values: { groupId: string }) => {
  const errors: { groupId?: string } = {};

  if (!values.groupId) {
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
  const onSubmit = async (values) => {
    console.log({ values });

    try {
      await apiClient.post(apiConfig.addTrainingGroup, {
        groupId: values.groupId,
        startDate: values.startDate,
        active: values.active,
      });
      alert("yey");
      onClose();
      //   dispatch(fetchUpdatesByDogId(dogId));
      //   dispatch(fetchAllUpdates({}));
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
          //   itemProps: {
          //     placeholder: "הכנס תוכן כאן...",
          //   },
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
