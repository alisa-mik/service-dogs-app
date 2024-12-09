import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/index.ts";
import { refetchDogs } from "../../store/dogsSlice.ts";
import { apiClient, apiConfig } from "../../config/apiConfig.ts";
import { configType } from "../form/Form.tsx";
import { refetchDogById } from "../../store/dogProfileSlice.ts";
import { selectFamiliesArray } from "../../store/familiesSlice.ts";
import FormButtonDialog from "../form/FormButtonDialog.tsx";
import { enqueueSnackbar } from "notistack";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  if (!values.dogName?.trim()) {
    errors.dogName = "שם הכלב הוא שדה חובה";
  }
  return errors;
};

const DogForm = ({ data, icon }: { data: any; icon?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const families = useSelector(selectFamiliesArray);

  const onSubmit = async (values: { [key: string]: any }) => {
    const formattedValues = {
      ...values,
      groupId: values.groupId !== "" ? values.groupId : null,
      dogId: values.dogId ? values.dogId : uuidv4(),
    };

    const response = await apiClient.post(apiConfig.addDog, formattedValues);
    enqueueSnackbar(`כלב ${values.dogName} נוסף/עודכן בהצלחה`, {
      variant: "success",
    });

    {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      values.dogId && dispatch(refetchDogById(values.dogId));
    }
    dispatch(refetchDogs());
    return response.data;
  };

  const assignedFamilyOptions = families.map((fam) => {
    return {
      label: `${fam.familyName} ${fam.contactName}`,
      value: fam.familyId,
    };
  });

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "dogName",
          label: "שם הכלב:",
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "birthDate",
          label: "תאריך לידה:",
        },
        {
          itemGroup: "input",
          itemType: "select",
          label: "בחר מין",
          itemProps: {
            options: [
              {
                value: "",
                label: "בחר מין",
              },
              {
                value: "זכר",
              },
              {
                value: "נקבה",
              },
            ],
          },
          path: "gender",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "breed",
          label: "גזע:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "color",
          label: "צבע:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "momDog",
          label: "שם האם:",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "dadDog",
          label: "שם האב:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "פעיל:",
          },
          path: "active",
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "groupId",
          label: "קבוצה:",
        },
        {
          itemGroup: "input",
          itemType: "select",
          label: "אומנה:",
          itemProps: {
            options: [
              {
                value: "",
                label: "בחר אומנה",
              },
              ...assignedFamilyOptions,
            ],
          },
          path: "assignedFamily",
        },
        {
          itemGroup: "input",
          itemType: "select",
          label: "סטטוס:",
          itemProps: {
            options: [
              {
                value: "",
                label: "בחר סטטוס",
              },
              {
                value: "לפני אומנה",
              },
              {
                value: "באומנה",
              },
              {
                value: "בהכשרה",
              },
              {
                value: "מצוות",
              },
              {
                value: "עובד",
              },
              {
                value: "בפנסיה",
              },
              {
                value: "נשר",
              },
              {
                value: "עבר להרבעה",
              },
              {
                value: "מת",
              },
            ],
          },
          path: "dogStatus",
        },
        {
          itemGroup: "section",
          itemType: "condition",
          itemProps: {
            conditions: [
              {
                path: "dogStatus",
                values: ["נשר"],
              },
            ],
          },
          items: [
            {
              itemGroup: "input",
              itemType: "text",
              path: "dogName",
              label: "סיבת נשירה:",
            },
            {
              itemGroup: "input",
              itemType: "date",
              path: "birthDate",
              label: "תאריך נשירה:",
            },
          ],
        },
        {
          itemGroup: "input",
          itemType: "text",
          path: "chipNumber",
          label: "מספר שבב:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "done",
    },
  ];

  return (
    <FormButtonDialog
      data={data}
      buttonText="הוסף כלב"
      formConfig={config}
      formType="steps"
      onSubmit={onSubmit}
      validate={validate}
      icon={icon}
    />
  );
};

export default DogForm;
