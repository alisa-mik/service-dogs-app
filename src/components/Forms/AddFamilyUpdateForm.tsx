import { v4 as uuidv4 } from "uuid";
import { configType } from "../form/Form.tsx";
import { enqueueSnackbar } from "notistack";
import { pick } from "lodash";
import { apiClient, apiConfig } from "../../config/apiConfig.ts";
import { FamilyDogEntry } from "../../store/dogsByPhoneNumberSlice.ts";
import { useState } from "react";
import FormButtonDialog from "../form/FormButtonDialog.tsx";

const validate = (values: { [ key: string ]: any }) => {
  const errors: { [ key: string ]: string } = {};

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
    bravecto: false,
    chip: false,
    spay: false,
    other: false,
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
    wastebags: false,
    other: false,
    comments: "",
  },
  other: {
    comments: "",
  },
};

export const AddFamilyUpdateForm = ({ dog }: { dog: FamilyDogEntry }) => {
  const [ status, setStatus ] = useState("done");

  const { dogId, groupId, familyId, dogName, familyName, contactName } = dog;

  const handleSubmit = async (values: { [ key: string ]: any }) => {
    if (status === "loading") return;

    const updateType = values.updateType;
    const details = pick(values, [ updateType ]);

    const formattedValues = {
      updateId: uuidv4(),
      updateType,
      updateContent: details[ updateType ],
      familyId,
      familyName,
      contactName,
      dogId,
      dogName,
      groupId,
    };

    setStatus("loading");

    await apiClient
      .post(apiConfig.familyUpdates, formattedValues)
      .then(() => {
        enqueueSnackbar(`הבקשה נשלחה בהצלחה`, {
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("Error adding/updating family:", error);
        enqueueSnackbar("אירעה שגיעה בעת שליחת הבקשה", {
          variant: "error",
        });
      })
      .finally(() => {
        setStatus("done");
      });
  };

  const updateTypeSelector: configType[] = [
    {
      itemGroup: "input",
      itemType: "select",
      itemProps: {
        options: [
          { value: "", label: "בחר סוג פנייה" },
          { value: "foodRequest", label: "הזמנת אוכל" },
          { value: "gearRequest", label: "הזמנת ציוד" },
          { value: "familyAway", label: "הזמנת פנסיון" },
          { value: "medicalUpdate", label: "דיווח רפואי" },
          { value: "other", label: "אחר" },
        ],
      },
      path: "updateType",
      label: "סוג הפנייה:",
    },
  ];

  const otherItems: configType[] = [
    {
      itemGroup: "input",
      itemType: "textarea",
      path: "other.comments",
      label: "הודעה:",
      itemProps: { showMic: false },
    },
  ];

  const familyAwayItems: configType[] = [
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
      itemProps: { showMic: false },
    },
  ];

  const foodRequestItems: configType[] = [
    {
      itemGroup: "input",
      itemType: "select",
      itemProps: {
        options: [
          { value: "", label: "בחר סוג אוכל" },
          { value: "salmon", label: "סלמון" },
          { value: "bison", label: "ביזון" },
        ],
      },
      path: "foodRequest.foodType",
      label: "סוג האוכל:",
    },
    {
      itemGroup: "input",
      itemType: "textarea",
      path: "foodRequest.comments",
      label: "הערות:",
      itemProps: { showMic: false },
    },
  ];

  const medicalUpdateItems: configType[] = [
    {
      itemGroup: "input",
      itemType: "date",
      path: "medicalUpdate.date",
      label: "תאריך:",
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.vaccine-2",
      itemProps: { label: "חיסון משושה שני" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.vaccine-3",
      itemProps: { label: "חיסון משושה שלישי" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.rabies-1",
      itemProps: { label: "כלבת ראשון" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.rabies-2",
      itemProps: { label: "כלבת שני" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.worms",
      itemProps: { label: "תילוע" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.bravecto",
      itemProps: { label: "טיפול פרעושים וקרציות" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.chip",
      itemProps: { label: "שבב" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.spay",
      itemProps: { label: "עיקור / סירוס" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "medicalUpdate.other",
      itemProps: { label: "אחר- פרטו בהערות" },
    },
    {
      itemGroup: "input",
      itemType: "textarea",
      path: "medicalUpdate.comments",
      label: "הערות:",
      itemProps: { showMic: false },
    },
  ];

  const gearRequestItems: configType[] = [
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "gearRequest.leash",
      itemProps: { label: "רצועה" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "gearRequest.collar",
      itemProps: { label: "קולר" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "gearRequest.easywalk",
      itemProps: { label: "ריתמה" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "gearRequest.bone",
      itemProps: { label: "עצם לעיסה" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "gearRequest.wastebags",
      itemProps: { label: "שקיות איסוף" },
    },
    {
      itemGroup: "input",
      itemType: "checkbox",
      path: "gearRequest.other",
      itemProps: { label: "אחר- פרטו בהודעה" },
    },
  ];

  const config: configType[] = [
    {
      itemGroup: "section",
      itemType: "common",
      items: updateTypeSelector,
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [ { path: "updateType", values: [ "familyAway" ] } ],
      },
      items: familyAwayItems,
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [ { path: "updateType", values: [ "foodRequest" ] } ],
      },
      items: foodRequestItems,
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [ { path: "updateType", values: [ "medicalUpdate" ] } ],
      },
      items: medicalUpdateItems,
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [ { path: "updateType", values: [ "gearRequest" ] } ],
      },
      items: gearRequestItems,
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: { conditions: [ { path: "updateType", values: [ "other" ] } ] },
      items: otherItems,
    },
    {
      itemGroup: "section",
      itemType: "condition",
      itemProps: {
        conditions: [
          { path: "updateType", values: [ "gearRequest" ] },
          { path: "gearRequest.other", values: [ true ] },
        ],
      },
      items: otherItems,
    },
  ];

  return (
    <>
      <FormButtonDialog
        data={initData}
        buttonText="הוסף בקשה"
        formConfig={config}
        formType="single"
        onSubmit={handleSubmit}
        validate={validate}
      />
    </>
  );
};

