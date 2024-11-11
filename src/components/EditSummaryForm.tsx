import { apiClient, apiConfig } from "../config/apiConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { refetchDogById } from "../store/dogProfileSlice";
import styled from "styled-components";
import FormButtonDialog from "./form/FormButtonDialog";
import { configType } from "./form/Form";

export const FormTitle = styled.h2`
  margin: 0;
  text-align: center;
  color: #333;
`;

export default function EditSummaryForm({ data }: { data: any }) {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: { [key: string]: any }) => {
    const response = await apiClient.put(`${apiConfig.editDog}/${data.dogId}`, {
      summary: values.summary,
    });

    dispatch(refetchDogById(data.dogId));
    return response.data;
  };

  const formConfig: configType[] = [
    {
      itemGroup: "input",
      itemType: "textarea",
      path: "summary",
      label: "התרשמות:",
    },
  ];

  return (
    <FormButtonDialog
      data={data}
      buttonText={"התרשמות"}
      formConfig={formConfig}
      onSubmit={onSubmit}
    />
  );
}
