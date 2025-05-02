import dayjs from "dayjs";
import {
  FamilyAwayContent,
  OtherContent,
  FamilyUpdate,
  FoodRequestContent,
  GearRequestContent,
  MedicalUpdateContent,
} from "../../types/familyUpdateTypes";
import { isEmpty } from "lodash";

type Props = {
  update: FamilyUpdate;
};

// Renderers by update type
const renderers: Record<string, (update: FamilyUpdate) => JSX.Element> = {
  foodRequest: (update) => {
    const content = update.updateContent as FoodRequestContent;
    const comments = isEmpty(content.comments) ? "-" : content.comments;

    return (
      <>
        <div>סוג אוכל: {content.foodType || "לא צויין"} </div>
        <div>הערות: {comments}</div>
      </>
    );
  },
  gearRequest: (update) => {
    const content = update.updateContent as GearRequestContent;
    const comments = isEmpty(content.comments) ? "-" : content.comments;

    const requestedItems = Object.entries({
      leash: "רצועה",
      collar: "קולר",
      easywalk: "ריתמה",
      bone: "עצם לעיסה",
      wastebag: "שקיות איסוף",
      other: "אחר",
    })
      .filter(([key]) => content[key as keyof GearRequestContent])
      .map(([, label]) => label)
      .join(", ");

    return (
      <>
        <div>פריטים נדרשים: {requestedItems || "לא צויינו"} </div>
        <div>הערות: {comments}</div>
      </>
    );
  },
  medicalUpdate: (update) => {
    const content = update.updateContent as MedicalUpdateContent;
    const comments = isEmpty(content.comments) ? "-" : content.comments;

    return <div>הערות: {comments}</div>;
  },
  familyAway: (update) => {
    const content = update.updateContent as FamilyAwayContent;
    const comments = isEmpty(content.comments) ? "-" : content.comments;
    const formattedStartDate = dayjs(content.startDate * 1000).format(
      "D/M/YYYY"
    );
    const formattedEndDate = dayjs(content.endDate * 1000).format("D/M/YYYY");
    return (
      <>
        <div>
          תאריכים: {formattedStartDate} - {formattedEndDate}
        </div>
        <div>הערות: {comments}</div>
      </>
    );
  },
  other: (update) => {
    const content = update.updateContent as OtherContent;
    return <div>הודעה: {content.comments || "לא צויין"}</div>;
  },
};

export const FamilyUpdateDetails = ({ update }: Props) => {
  const renderer = renderers[update.updateType];

  return <div>{renderer ? renderer(update) : <div>אין פרטים להצגה</div>}</div>;
};
