import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { apiClient, apiConfig } from "../config/apiConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import styled from "styled-components";
import { BROWN_DARK, YELLOW, YELLOW_DARKER } from "../config/colors";
import { fetchUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { fetchAllUpdates } from "../store/updatesSlice";
import Form, { configType } from "./form/Form";

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${YELLOW};
  color: ${BROWN_DARK};
  font-size: 16px;
  font-family: "Rubik";
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${YELLOW_DARKER};
  }
`;

// const ErrorText = styled.div`
//   color: red;
//   font-size: 14px;
//   margin-top: 5px;
// `;

// const validate = (values: { content: string; date: string }) => {
//   const errors: { content?: string; date?: string } = {};

//   if (!values.content.trim()) {
//     errors.content = "שדה התוכן הוא שדה חובה";
//   }

//   if (!values.date) {
//     errors.date = "יש לבחור תאריך";
//   }

//   return errors;
// };

interface AddUpdateFormProps {
  dogId: string;
  handleClose: () => void;
}

const AddUpdateForm: React.FC<AddUpdateFormProps> = ({
  dogId,
  handleClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    content: "",
    categories: [],
    date: new Date().toISOString().split("T")[0],
  };

  const onSubmit = async (values) => {
    try {
      const updateId = uuidv4();

      await apiClient.post(apiConfig.addUpdate, {
        updateId: updateId,
        dogId: dogId,
        content: values.content,
        categories: values.categories,
        date: values.date,
      });

      handleClose();
      dispatch(fetchUpdatesByDogId(dogId));
      dispatch(fetchAllUpdates({}));
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
          itemType: "texterea",
          path: "content",
          label: "תוכן:",
          itemProps: {
            placeholder: "הכנס תוכן כאן...",
          },
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "date",
          label: "תאריך",
        },
        {
          itemGroup: "input",
          itemType: "category",
          path: "categories",
        },
      ],
    },
  ];

  return (
    <Form
      formType="steps"
      config={config}
      data={initialValues}
      onSubmit={onSubmit}
    />
  );
};

export default AddUpdateForm;
