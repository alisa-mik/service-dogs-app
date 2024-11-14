import { v4 as uuidv4 } from "uuid";
import { apiClient, apiConfig } from "../config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { fetchAllUpdates } from "../store/updatesSlice";
import { configType } from "./form/Form";
import { selectSelectedDogId } from "../store/dogsSlice";
import { enqueueSnackbar } from "notistack";
import FormButtonDialog from "./form/FormButtonDialog";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  const typedValues = values as { content: string; date: string };

  if (!typedValues.content.trim()) {
    errors.content = "שדה התוכן הוא שדה חובה";
  }

  if (!typedValues.date) {
    errors.date = "יש לבחור תאריך";
  }

  return errors;
};

const AddUpdateForm = ({
  data,
  icon,
  onOpen,
}: {
  icon?: string;
  data: any;
  onOpen: () => void;
}) => {
  const dogId = useSelector(selectSelectedDogId);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: { [key: string]: any }) => {
    if (!dogId) {
      console.error("Dog ID is null. Cannot submit the update.");
      return; // Prevent submission if dogId is null
    }

    try {
      const updateId = uuidv4();

      await apiClient.post(apiConfig.addUpdate, {
        updateId: updateId,
        dogId: dogId,
        content: values.content,
        categories: values.categories,
        date: values.date,
      });

      enqueueSnackbar("עדכון נוסף בהצלחה", { variant: "success" });
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
    <FormButtonDialog
      data={data}
      buttonText="הוסף עדכון"
      formConfig={config}
      formType="single"
      onSubmit={onSubmit}
      validate={validate}
      icon={icon}
      onOpen={onOpen}
    />
  );
};

export default AddUpdateForm;
