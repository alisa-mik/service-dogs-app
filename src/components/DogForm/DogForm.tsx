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
import {
  refetchGroups,
  selectGroupIds,
} from "../../store/trainingGroupsSlice.ts";

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
  const GroupIds = useSelector(selectGroupIds);

  const onSubmit = async (values: { [key: string]: any }) => {
    const formattedValues = {
      ...values,
      groupId: values.groupId !== "" ? values.groupId : null,
      dogId: values.dogId ? values.dogId : uuidv4(),
    };

    const response = await apiClient.post(apiConfig.addDog, formattedValues);
    const action = values.dogId ? "עודכן" : "נוסף";
    enqueueSnackbar(`כלב ${values.dogName} ${action} בהצלחה`, {
      variant: "success",
    });

    {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      values.dogId && dispatch(refetchDogById(values.dogId));
    }
    dispatch(refetchDogs());
    dispatch(refetchGroups());
    return response.data;
  };

  const assignedFamilyOptions = families.map((fam) => {
    return {
      label: `${fam.contactName} ${fam.familyName}`,
      value: fam.familyId,
    };
  });

  const assignedGroupOptions = GroupIds.map((groupId) => {
    return {
      label: groupId,
      value: groupId,
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
          itemType: "select",
          itemProps: {
            options: [
              {
                value: "",
                label: "בחר קבוצה",
              },
              ...assignedGroupOptions,
            ],
          },
          path: "groupId",
          label: "קבוצה:",
        },
        {
          itemGroup: "input",
          itemType: "autoComplete",
          label: "אומנה:",
          itemProps: {
            options: [
              {
                value: "",
                label: "לא משוייך למשפחה",
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
                value: "נפסל",
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
                values: ["נפסל"],
              },
            ],
          },
          items: [
            {
              itemGroup: "input",
              itemType: "text",
              path: "dropReason",
              label: "סיבת פסילה:",
            },
            {
              itemGroup: "input",
              itemType: "date",
              path: "dropDate",
              label: "תאריך פסילה:",
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
