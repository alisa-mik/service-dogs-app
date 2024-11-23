import { apiClient, apiConfig } from "../config/apiConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { refetchDogById } from "../store/dogProfileSlice";
import styled from "styled-components";
import FormButtonDialog from "./form/FormButtonDialog";
import { configType } from "./form/Form";
import { refetchFamilies } from "../store/familiesSlice";

export const FormTitle = styled.h2`
  margin: 0;
  text-align: center;
  color: #333;
`;

export default function EditFamilyGeneralInfo({ data }: { data: any }) {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: { [key: string]: any }) => {
    const response = await apiClient.put(
      `${apiConfig.editFamily}/${data.familyId}`,
      {
        generalInfo: values.generalInfo,
      }
    );

    await dispatch(refetchFamilies());
    return response.data;
  };

  const formConfig: configType[] = [
    {
      itemGroup: "input",
      itemType: "textarea",
      path: "generalInfo",
      label: "מידע נוסף:",
    },
  ];

  return (
    <FormButtonDialog
      data={data}
      buttonText={"ערוך מידע נוסף"}
      formConfig={formConfig}
      onSubmit={onSubmit}
    />
  );
}
