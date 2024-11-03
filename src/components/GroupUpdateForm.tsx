import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index.ts";
import { apiClient } from "../config/apiConfig.ts";
import Form, { configType } from "./form/Form.tsx";

const GroupUpdateForm = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values) => {
    const formattedValues = {
      ...values,
      updateId: values.updateId ? values.updateId : uuidv4(),
    };
    // const response = await apiClient.post("add-dog", formattedValues);
    // alert("כלב נוסף בהצלחה!");
    console.log({ formattedValues });
    // onClose();
    // {
    //   values.dogId && dispatch(refetchDogById(values.dogId));
    // }
    // dispatch(refetchDogs());
    // return response.data;
  };

  const attendanceSection: configType = {
    itemGroup: "section",
    itemType: "common",
    items: [
      {
        itemGroup: "input",
        itemType: "text",
        path: "content",
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
          path: "birthDate",
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
