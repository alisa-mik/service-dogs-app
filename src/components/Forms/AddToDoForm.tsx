import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { AppDispatch } from "../../store";
import { apiClient, apiConfig } from "../../config/apiConfig";
import { fetchToDos } from "../../store/todosSlice";
import { configType } from "../form/Form";
import FormButtonDialog from "../form/FormButtonDialog";

const validate = (values: { [ key: string ]: any }) => {
  const errors: { [ key: string ]: string } = {};

  const typedValues = values as { text: string; };

  if (!typedValues.text.trim()) {
    errors.content = "שדה התוכן הוא שדה חובה";
  }

  return errors;
};

export const AddToDoForm = ({
  data,
  icon,
  onOpen,
}: {
  icon?: string;
  data: any;
  onOpen?: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: { [ key: string ]: any }) => {
    console.log('sending?');

    const todoId = uuidv4();

    await apiClient
      .post(apiConfig.todos, {
        todoId: todoId,
        text: values.text,
        dueDate: values.dueDate,
      })
      .then(() => {
        enqueueSnackbar(`תזכורת נוספה בהצלחה`, {
          variant: "success",
        });
        dispatch(fetchToDos({ limit: 100 }))

      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        enqueueSnackbar("אירעה שגיעה בעת שליחת הבקשה", {
          variant: "error",
        });
      })
  };

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "text",
          label: "תוכן:",
          itemProps: {
            placeholder: "הכנס תזכורת כאן...",
            showMic: false
          },
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "dueDate",
          label: "לבצע עד תאריך",
        },
      ],
    },
  ];

  return (
    <FormButtonDialog
      data={data}
      buttonText="הוסף תזכורת"
      formConfig={config}
      formType="single"
      onSubmit={onSubmit}
      validate={validate}
      icon={icon}
      onOpen={onOpen}
    />
  );
};

