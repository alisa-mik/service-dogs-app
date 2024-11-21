import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index.ts";
import { apiClient, apiConfig } from "../config/apiConfig.ts";
import { configType } from "./form/Form.tsx";
import {
  refetchGroups,
  selectSelectedGroupDogs,
} from "../store/trainingGroupsSlice.ts";
import FormButtonDialog from "./form/FormButtonDialog.tsx";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  if (!values.date) {
    errors.date = "תאריך הוא שדה חובה";
  }

  if (!values.content?.trim()) {
    errors.content = "תוכן הוא שדה חובה";
  }

  if (
    values.type === "meeting" &&
    (!values.attendance || values.attendance.length === 0)
  ) {
    errors.attendance = "נוכחות היא שדה חובה בפגישות";
  }

  return errors;
};

const GroupUpdateForm = ({
  data,
  icon,
  onOpen,
}: {
  data: any;
  icon?: string;
  onOpen?: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedGroupDogs = useSelector(selectSelectedGroupDogs);

  const onSubmit = async (values: { [key: string]: any }) => {
    const formattedValues = {
      ...values,
      updateId: values.updateId ? values.updateId : uuidv4(),
    };
    const response = await apiClient.post(
      apiConfig.addGroupTrainingUpdate,
      formattedValues
    );
    // alert("עדכון קבוצתי נוסף בהצלחה!");

    // {
    //   values.dogId && dispatch(refetchDogById(values.dogId));
    // }
    // dispatch(refetchDogs());
    dispatch(refetchGroups());
    return response.data;
  };

  const attendanceSection: configType = {
    itemGroup: "section",
    itemType: "common",
    items: [
      {
        itemGroup: "input",
        itemType: "attendance",
        itemProps: {
          dogs: selectedGroupDogs,
        },
        path: "attendance",
        label: "נוכחות:",
      },
    ],
  };

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "date",
          path: "date",
          label: "תאריך:",
        },
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "content",
          label: "תוכן:",
        },
      ],
    },
  ];

  const modifiedConfig =
    data.type === "meeting" ? [attendanceSection, ...config] : config;
  const formType = data.type === "meeting" ? "steps" : "single";
  const buttonText = data.type === "meeting" ? "הוסף סיכום מפגש" : "הוסף עדכון";

  return (
    <FormButtonDialog
      data={data}
      icon={icon}
      buttonText={buttonText}
      formConfig={modifiedConfig}
      formType={formType}
      onSubmit={onSubmit}
      validate={validate}
      onOpen={onOpen}
    />
  );
};

export default GroupUpdateForm;
