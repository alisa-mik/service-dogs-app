import dayjs from "dayjs";
import {
  FamilyAwayContent,
  OtherContent,
  FamilyUpdate,
  MedicalUpdateContent,
} from "../../types/familyUpdateTypes";
import { isEmpty } from "lodash";
import { proceduresMap } from "../../utils/familyUpdatesUtils";

type Props = {
  update: FamilyUpdate;
};

// Renderers by update type
const renderers: Record<string, (update: FamilyUpdate) => JSX.Element> = {
  medicalUpdate: (update) => {
    const content = update.updateContent as MedicalUpdateContent;
    const showComments = !isEmpty(content.comments);
    const formattedDate = dayjs(content.date * 1000).format("D/M/YYYY");

    const procedures = Object.entries(proceduresMap)
      .filter(([key]) => content[key as keyof MedicalUpdateContent])
      .map(([, label]) => label)
      .join(", ");

    return (
      <>
        <div> תאריך: {formattedDate}</div>
        <div>פעולות שבוצעו: {procedures}</div>
        {showComments && <div>הערות: {content.comments}</div>}
      </>
    );
  },
  familyAway: (update) => {
    const content = update.updateContent as FamilyAwayContent;
    const showComments = !isEmpty(content.comments);
    const formattedStartDate = dayjs(content.startDate * 1000).format(
      "D/M/YYYY"
    );
    const formattedEndDate = dayjs(content.endDate * 1000).format("D/M/YYYY");
    return (
      <>
        <div>
          תאריכים: {formattedStartDate} - {formattedEndDate}
        </div>
        {showComments && <div>הערות: {content.comments}</div>}
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
