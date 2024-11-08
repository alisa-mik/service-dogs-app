import { v4 as uuidv4 } from "uuid";
import { apiClient, apiConfig } from "../config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { fetchAllUpdates } from "../store/updatesSlice";
import Form, { configType } from "./form/Form";
import { selectSelectedDogId } from "../store/dogsSlice";

const validate = (values: { content: string; date: string }) => {
  const errors: { content?: string; date?: string } = {};

  if (!values.content.trim()) {
    errors.content = "שדה התוכן הוא שדה חובה";
  }

  if (!values.date) {
    errors.date = "יש לבחור תאריך";
  }

  return errors;
};

const AddUpdateForm = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: any;
}) => {
  const dogId = useSelector(selectSelectedDogId);
  const dispatch = useDispatch<AppDispatch>();
  console.log({ data });

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

      onClose();
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
          itemType: "textarea",
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
      formType="single"
      config={config}
      data={data}
      validate={validate}
      onSubmit={onSubmit}
    />
  );
};

export default AddUpdateForm;
