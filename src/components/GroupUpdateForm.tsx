import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index.ts";
import { apiClient, apiConfig } from "../config/apiConfig.ts";
import Form, { configType } from "./form/Form.tsx";
import { selectSelectedGroupDogs } from "../store/trainingGroupsSlice.ts";

const GroupUpdateForm = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedGroupDogs = useSelector(selectSelectedGroupDogs);

  const onSubmit = async (values) => {
    const formattedValues = {
      ...values,
      updateId: values.updateId ? values.updateId : uuidv4(),
    };
    console.log({ formattedValues });
    const response = await apiClient.post(
      apiConfig.addGroupTrainingUpdate,
      formattedValues
    );
    alert("עדכון קבוצתי נוסף בהצלחה!");
    // onClose();
    // {
    //   values.dogId && dispatch(refetchDogById(values.dogId));
    // }
    // dispatch(refetchDogs());
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

  return (
    <Form
      formType="steps"
      config={modifiedConfig}
      data={data}
      onSubmit={onSubmit}
    />
  );
};

export default GroupUpdateForm;
