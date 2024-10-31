import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/index.ts";
import { refetchDogs } from "../../store/dogsSlice.ts";
import { apiClient } from "../../config/apiConfig.ts";
import Form, { configType } from "../form/Form.tsx";

const DogForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values) => {
    console.log({ values });

    const formattedValues = {
      ...values,
      dogId: uuidv4(),
      birthDate: Math.floor(new Date(values.birthDate).getTime() / 1000),
    };

    console.log("Submitted values:", formattedValues);

    const response = await apiClient.post("add-dog", formattedValues);
    alert("כלב נוסף בהצלחה!");
    onClose();
    dispatch(refetchDogs());
    return response.data;
  };

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

  const data = {
    dogName: "",
    birthDate: "",
    gender: "",
    breed: "",
    color: "",
    momDog: "",
    dadDog: "",
    groupId: null,
    assignedFamily: null,
    active: true,
    dogStatus: "",
    dropDate: "",
    dropReason: "",
    chipNumber: "",
    medicalInfo: "",
    summary: "",
  };

  return (
    <>
      <Form formType="steps" config={config} data={data} onSubmit={onSubmit} />
    </>
  );
};

export default DogForm;
