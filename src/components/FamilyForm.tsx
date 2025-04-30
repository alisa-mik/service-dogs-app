import { v4 as uuidv4 } from "uuid";
import { configType } from "./form/Form.tsx";
import { apiClient, apiConfig } from "../config/apiConfig.ts";
import { refetchFamilies } from "../store/familiesSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index.ts";
import FormButtonDialog from "./form/FormButtonDialog.tsx";
import { enqueueSnackbar } from "notistack";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  if (!values.familyName?.trim()) {
    errors.familyName = "שם משפחה הוא שדה חובה";
  }

  if (!values.contactName?.trim()) {
    errors.contactName = "שם איש קשר הוא שדה חובה";
  }

  if (!values.phoneNumber?.trim()) {
    errors.phoneNumber = "מספר טלפון הוא שדה חובה";
  }

  return errors;
};

const FamilyForm = ({ data, icon }: { data: any; icon?: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: { [key: string]: any }) => {
    const formattedValues = {
      ...values,
      familyId: values.familyId ? values.familyId : uuidv4(),
      contactInfo: {
        ...(values.contactInfo || {}),
        phoneNumber: values.phoneNumber,
      },
    };

    try {
      const response = await apiClient.post(
        apiConfig.addFamily,
        formattedValues
      );
      enqueueSnackbar(`משפחה ${values.familyId ? "עודכנה" : "נוספה"} בהצלחה`, {
        variant: "success",
      });
      dispatch(refetchFamilies());
      return response.data;
    } catch (error) {
      console.error("Error adding/updating family:", error);
      enqueueSnackbar("אירעה שגיאה בעת שמירת המשפחה", { variant: "error" });
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
          path: "phoneNumber",
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
          path: "generalInfo",
          label: "מידע נוסף:",
        },
      ],
    },
  ];

  return (
    <FormButtonDialog
      data={data}
      buttonText="הוסף משפחה"
      formConfig={config}
      formType="single"
      onSubmit={handleSubmit}
      validate={validate}
      icon={icon}
    />
  );
};

export default FamilyForm;
