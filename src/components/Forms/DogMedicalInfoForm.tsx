import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { AppDispatch } from "../../store";
import { apiClient, apiConfig } from "../../config/apiConfig";
import { fetchToDos } from "../../store/todosSlice";
import { configType } from "../form/Form";
import FormButtonDialog from "../form/FormButtonDialog";

const validate = (values: { [ key: string ]: any }) => {
  const errors: { [ key: string ]: string } = {};

  const typedValues = values as { date: string };

  if (!typedValues.date) {
    errors.content = "שדה התוכן הוא שדה חובה";
  }

  return errors;
};

export const DogMedicalInfoForm = ({
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
        dispatch(fetchToDos({ limit: 100 }));
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        enqueueSnackbar("אירעה שגיעה בעת שליחת הבקשה", {
          variant: "error",
        });
      });
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
          itemType: "checkbox",
          path: "bp",

          itemProps: { label: "חיסון BP" },
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "vaccine",
          itemProps: { label: "משושה" },
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "rabies",
          itemProps: { label: "כלבת" },
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "worms",
          itemProps: { label: "תילוע" },
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "bravecto",
          itemProps: { label: "ברבקטו" },
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "spay",
          itemProps: { label: "עיקור/ סירוס" },
        },
      ],
    },
  ];

  return (
    <FormButtonDialog
      data={data}
      buttonText="הוסף מידע רפואי"
      formConfig={config}
      formType="single"
      onSubmit={onSubmit}
      validate={validate}
      icon={icon}
      onOpen={onOpen}
    />
  );
};
