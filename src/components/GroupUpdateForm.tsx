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
    console.log({ values });

    // const formattedValues = {
    //   ...values,
    //   dogId: values.dogId ? values.dogId : uuidv4(),
    // };
    // const response = await apiClient.post("add-dog", formattedValues);
    // alert("כלב נוסף בהצלחה!");
    // onClose();
    // {
    //   values.dogId && dispatch(refetchDogById(values.dogId));
    // }
    // dispatch(refetchDogs());
    // return response.data;
  };

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "attendance",
          label: "נוכחות:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "content",
          label: "תוכן:",
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "birthDate",
          label: "תאריך:",
        },
      ],
    },
  ];

  return (
    <Form formType="steps" config={config} data={data} onSubmit={onSubmit} />
  );
};

export default GroupUpdateForm;
