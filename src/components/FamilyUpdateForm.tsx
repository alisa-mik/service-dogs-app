import { v4 as uuidv4 } from "uuid";
import Form, { configType } from "./form/Form.tsx";
import { enqueueSnackbar } from "notistack";
import { pick } from "lodash";
import { apiClient, apiConfig } from "../config/apiConfig.ts";
import { FamilyDogEntry } from "../store/dogsByPhoneNumberSlice.ts";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  if (!values.updateType?.trim()) {
    errors.updateType = "סוג עדכון הוא שדה חובה";
  }

  return errors;
};

const initData = {
  updateType: "",
  medicalUpdate: {
    date: "",
    "vaccine-2": false,
    "vaccine-3": false,
    "rabies-1": false,
    "rabies-2": false,
    worms: false,
    chip: false,
    isOther: false,
    comments: "",
  },
  foodRequest: {
    foodType: "",
    comments: "",
  },
  gearRequest: {
    leash: false,
    collar: false,
    easywalk: false,
    bone: false,
    wastebag: false,
    other: false,
    comments: "",
  },
  other: {
    comments: "",
  },
};

const FamilyUpdateForm = ({ dog }: { dog: FamilyDogEntry }) => {
  const { dogId, groupId, familyId } = dog;

  const handleSubmit = async (values: { [key: string]: any }) => {
    const updateType = values.updateType;
    const details = pick(values, [updateType]);

    const formattedValues = {
      updateId: uuidv4(),
      updateType,
      updateContent: details[updateType],
      familyId,
      dogId,
      groupId,
    };

    console.log({ formattedValues });

    try {
      const response = await apiClient.post(
        apiConfig.familyUpdates,
        formattedValues
      );

      enqueueSnackbar(`הבקשה נשלחה בהצלחה`, {
        variant: "success",
      });
    } catch (error) {
      console.error("Error adding/updating family:", error);
      enqueueSnackbar("אירעה שגיאה בעת שליחת הבקשה", { variant: "error" });
    }
  };

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: [
        {
          itemGroup: "input",
          itemType: "select",
          itemProps: {
            options: [
              {
                value: "",
                label: "בחר סוג פנייה",
              },
              {
                value: "foodRequest",
                label: "הזמנת אוכל",
              },
              {
                value: "gearRequest",
                label: "הזמנת ציוד",
              },
              {
                value: "familyAway",
                label: "הזמנת פנסיון",
              },
              {
                value: "medicalUpdate",
                label: "דיווח רפואי",
              },
              {
                value: "other",
                label: "אחר",
              },
            ],
          },
          path: "updateType",
          label: "סוג הפנייה:",
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [
          {
            path: "updateType",
            values: ["familyAway"],
          },
        ],
      },
      items: [
        {
          itemGroup: "input",
          itemType: "date",
          path: "familyAway.startDate",
          label: "מתאריך:",
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "familyAway.endDate",
          label: "עד תאריך:",
        },
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "familyAway.comments",
          label: "הערות:",
          itemProps: {
            showMic: false,
          },
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [
          {
            path: "updateType",
            values: ["foodRequest"],
          },
        ],
      },
      items: [
        {
          itemGroup: "input",
          itemType: "text",
          path: "foodRequest.foodType",
          label: "סוג האוכל:",
        },
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "foodRequest.comments",
          label: "הערות:",
          itemProps: {
            showMic: false,
          },
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [
          {
            path: "updateType",
            values: ["medicalUpdate"],
          },
        ],
      },
      items: [
        {
          itemGroup: "input",
          itemType: "date",
          path: "medicalUpdate.date",
          label: "תאריך:",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "חיסון משושה שני",
          },
          path: "medicalUpdate.vaccine-2",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "חיסון משושה שלישי",
          },
          path: "medicalUpdate.vaccine-3",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "כלבת ראשון",
          },
          path: "medicalUpdate.rabies-1",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "כלבת שני",
          },
          path: "medicalUpdate.rabies-2",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "תילוע",
          },
          path: "medicalUpdate.worms",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "שבב",
          },
          path: "medicalUpdate.chip",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "אחר- פרטו בהערות",
          },
          path: "medicalUpdate.isOther",
        },
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "medicalUpdate.comments",
          label: "הערות:",
          itemProps: {
            showMic: false,
          },
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [
          {
            path: "updateType",
            values: ["gearRequest"],
          },
        ],
      },
      items: [
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "רצועה",
          },
          path: "gearRequest.leash",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "קולר",
          },
          path: "gearRequest.collar",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "ריתמה",
          },
          path: "gearRequest.easywalk",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "עצם לעיסה",
          },
          path: "gearRequest.bone",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "שקיות איסוף",
          },
          path: "gearRequest.wastebag",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "אחר- פרטו בהערות",
          },
          path: "gearRequest.other",
        },
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "gearRequest.comments",
          label: "הערות:",
          itemProps: {
            showMic: false,
          },
        },
      ],
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [
          {
            path: "updateType",
            values: ["other"],
          },
        ],
      },
      items: [
        {
          itemGroup: "input",
          itemType: "textarea",
          path: "other.comments",
          label: "הערות:",
          itemProps: {
            showMic: false,
          },
        },
      ],
    },
  ];

  return (
    <Form
      formType="single"
      config={config}
      data={initData}
      onSubmit={handleSubmit}
      validate={validate}
    />
  );
};

export default FamilyUpdateForm;
