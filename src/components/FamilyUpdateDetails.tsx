import {
  FamilyAwayContent,
  FamilyNoticeContent,
  FamilyUpdate,
  FoodRequestContent,
  GearRequestContent,
  MedicalUpdateContent,
} from "../types/familyUpdateTypes";

type Props = {
  update: FamilyUpdate;
};

// Renderers by update type
const renderers: Record<string, (update: FamilyUpdate) => JSX.Element> = {
  foodRequest: (update) => {
    const content = update.updateContent as FoodRequestContent;
    return <div>סוג אוכל: {content.foodType || "לא צויין"}</div>;
  },
  gearRequest: (update) => {
    const content = update.updateContent as GearRequestContent;
    return <div>פריט נדרש: {content.comments || "לא צויין"}</div>;
  },
  medicalUpdate: (update) => {
    const content = update.updateContent as MedicalUpdateContent;
    return <div>תיאור: {content.comments || "לא צויין"}</div>;
  },
  familyAway: (update) => {
    const content = update.updateContent as FamilyAwayContent;
    return (
      <div>
        תאריכים: {content.startDate || "?"} - {content.endDate || "?"}
      </div>
    );
  },
  familyNotice: (update) => {
    const content = update.updateContent as FamilyNoticeContent;
    return <div>הערה: {content.message || "לא צויין"}</div>;
  },
};

export const FamilyUpdateDetails = ({ update }: Props) => {
  const renderer = renderers[update.updateType];

  return (
    <div>
      <div>{renderer ? renderer(update) : <div>אין פרטים להצגה</div>}</div>
    </div>
  );
};
