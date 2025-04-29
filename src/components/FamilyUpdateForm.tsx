import { v4 as uuidv4 } from "uuid";
import Form, { configType } from "./form/Form.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index.ts";
import { enqueueSnackbar } from "notistack";

const validate = (values: { [key: string]: any }) => {
  const errors: { [key: string]: string } = {};

  if (!values.familyName?.trim()) {
    errors.familyName = "שם משפחה הוא שדה חובה";
  }

  if (!values.contactName?.trim()) {
    errors.contactName = "שם איש קשר הוא שדה חובה";
  }

  // if (!values["contactInfo.phoneNumber"]?.trim()) {
  //   errors["contactInfo.phoneNumber"] = "מספר טלפון הוא שדה חובה";
  // }

  return errors;
};

const FamilyUpdateForm = ({ data, icon }: { data: any; icon?: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: { [key: string]: any }) => {
    console.log({ values });

    const formattedValues = {
      ...values,
      familyId: values.familyId ? values.familyId : uuidv4(),
    };

    // const response = await apiClient.post(apiConfig.addFamily, formattedValues);

    enqueueSnackbar(`משפחה ${values.familyId ? "עודכנה" : "נוספה"} בהצלחה`, {
      variant: "success",
    });
    alert("yey");
    // dispatch(refetchFamilies());
    // return response.data;
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
          path: "updateContent.startDate",
          label: "מתאריך:",
        },
        {
          itemGroup: "input",
          itemType: "date",
          path: "updateContent.endDate",
          label: "עד תאריך:",
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
          path: "updateContent.foodType",
          label: "סוג האוכל:",
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
          path: "updateContent.date",
          label: "תאריך:",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "חיסון משושה שני",
          },
          path: "updateContent.vaccine-2",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "חיסון משושה שלישי",
          },
          path: "updateContent.vaccine-3",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "כלבת ראשון",
          },
          path: "updateContent.rabies-1",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "כלבת שני",
          },
          path: "updateContent.rabies-2",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "תילוע",
          },
          path: "updateContent.worms",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "שבב",
          },
          path: "updateContent.chip",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "אחר- פרטו בהערות",
          },
          path: "updateContent.isOther",
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
          path: "leash",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "קולר",
          },
          path: "updateContent.collar",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "ריתמה",
          },
          path: "updateContent.easywalk",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "עצם לעיסה",
          },
          path: "updateContent.bone",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "שקיות איסוף",
          },
          path: "updateContent.wastebag",
        },
        {
          itemGroup: "input",
          itemType: "checkbox",
          itemProps: {
            label: "אחר- פרטו בהערות",
          },
          path: "updateContent.other",
        },
      ],
    },
    {
      itemGroup: "input",
      itemType: "textarea",
      path: "updateContent.comments",
      label: "הערות:",
    },
  ];

  return (
    <Form
      formType="single"
      config={config}
      data={data}
      onSubmit={handleSubmit}
      //   {...validateProps}
    />
  );
};

export default FamilyUpdateForm;
