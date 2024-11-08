import { apiClient, apiConfig } from "../config/apiConfig";
import { Button } from "./commonParts/Buttons";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { refetchDogById } from "../store/dogProfileSlice";
import styled from "styled-components";
import { BROWN_DARK } from "../config/colors";

interface EditSummaryFormProps {
  dogId: string;
  currentSummary: string;
  onClose: () => void;
}

const TextArea = styled.textarea`
  width: 100%;
  font-family: "Rubik";
  color: ${BROWN_DARK};
  height: 120px;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const FormContainer = styled.form`
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: right;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  margin: 0;
  text-align: center;
  color: #333;
`;

export default function EditSummaryForm({
  dogId,
  currentSummary,
  onClose,
}: EditSummaryFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      summary: currentSummary,
    },
    onSubmit: async (values) => {
      const response = await apiClient.put(`${apiConfig.editDog}/${dogId}`, {
        summary: values.summary,
      });
      setFormSubmitted(true);
      onClose();
      dispatch(refetchDogById(dogId));
      return response.data;
    },
  });

  return (
    <div>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormTitle>התרשמות</FormTitle>
        <div>
          <TextArea
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            rows={5}
          />
        </div>
        <div>
          <Button type="submit">שלח</Button>
        </div>
      </FormContainer>
      {formSubmitted && <div>התרשמות עודכנה בהצלחה! </div>}
    </div>
  );
}
