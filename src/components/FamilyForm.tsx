import { v4 as uuidv4 } from "uuid";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../store/index.ts";
import Form, { configType } from "./form/Form.tsx";
import {} from "../store/trainingGroupsSlice.ts";
import { apiClient, apiConfig } from "../config/apiConfig.ts";
import { refetchFamilies } from "../store/familiesSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index.ts";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  if (!values.familyName?.trim()) {
    errors.familyName = "שם משפחה הוא שדה חובה";
  }

  if (!values.contactName?.trim()) {
    errors.contactName = "שם איש קשר הוא שדה חובה";
  }

  if (!values["contactInfo.phoneNumber"]?.trim()) {
    errors["contactInfo.phoneNumber"] = "מספר טלפון הוא שדה חובה";
  }

  return errors;
};

const FamilyForm = ({ onClose, data }: { onClose: () => void; data: any }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: { [key: string]: any }) => {
    const formattedValues = {
      ...values,
      familyId: values.familyId ? values.familyId : uuidv4(),
    };

    const response = await apiClient.post(apiConfig.addFamily, formattedValues);
    alert("משפחה נוספה בהצלחה!");
    onClose();
    {
      // values.familyId && dispatch(refetchDogById(values.dogId));
    }
    dispatch(refetchFamilies());
    return response.data;
  };

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "familyName",
          label: "שם משפחה:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "contactName",
          label: "שם איש קשר:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "contactInfo.phoneNumber",
          label: "מספר טלפון:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "contactInfo.address",
          label: "כתובת:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "contactInfo.city",
          label: "עיר:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "contactInfo.email",
          label: "מייל:",
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "joinedAt",
          label: "תאריך הצטרפות:",
        },
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "content",
          label: "כללי:",
        },
      ],
    },
  ];

  return (
    <Form
      validate={validate}
      formType="single"
      config={config}
      data={data}
      onSubmit={onSubmit}
    />
  );
};

export default FamilyForm;
