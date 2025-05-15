import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { AppDispatch } from "../../store";
import { apiClient, apiConfig } from "../../config/apiConfig";
import { configType } from "../form/Form";
import FormButtonDialog from "../form/FormButtonDialog";
import { refetchDogById } from "../../store/dogProfileSlice";

const validate = (values: { [ key: string ]: any }) => {
  const errors: { [ key: string ]: string } = {};

  if (!values.date) {
    errors.date = "תאריך הוא שדה חובה";
  }

  const hasSelectedTreatment = [ 'dp', 'vaccination', 'rabies', 'deworming', 'bravecto', 'spay' ]
    .some(key => values[ key ]);

  if (!hasSelectedTreatment) {
    errors.spay = "יש לבחור לפחות טיפול אחד";
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
    const submitData = {
      date: values.date,
      treatments: Object.entries(values)
        .filter(([ key, value ]) =>
          key !== 'date' && value === true
        )
        .map(([ key ]) => key)
    };

    console.log({ submitData });

    await apiClient
      .post(`${apiConfig.medicalInfo}/${data.dogId}`, submitData)
      .then(() => {
        enqueueSnackbar(`מידע רפואי נוסף בהצלחה`, {
          variant: "success",
        });
        dispatch(refetchDogById(data.dogId));
      })
      .catch((error) => {
        console.error("Error adding medical info:", error);
        enqueueSnackbar("אירעה שגיאה בעת שליחת הבקשה", {
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
          path: "dp",
          itemProps: { label: "חיסון DP" },
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "vaccination",
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
          path: "deworming",
          itemProps: { label: "תילוע" },
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          path: "bravecto",
          itemProps: { label: "פרעושים וקרציות" },
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
