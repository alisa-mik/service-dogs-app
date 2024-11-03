import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../store/trainingGroupsSlice";
import {
  Column,
  Gap,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import GroupUpdateForm from "../components/GroupUpdateForm";
import UpdateCard from "../components/UpdateCard";

export const GroupUpdates: React.FC = () => {
  const [openMeeting, setOpenMeetingForm] = useState<boolean>(false);
  const [openUpdate, setOpenUpdateForm] = useState<boolean>(false);

  const selectedGroup = useSelector(selectSelectedGroup);

  if (!selectedGroup) {
    return <div>בחר קבוצה</div>;
  }

  const { updates } = selectedGroup;

  const sortedUpdates = (updates || [])
    .slice()
    .sort((a, b) => b.date - a.date)
    .reverse();

  const handleClose = () => {
    setOpenMeetingForm(false);
    setOpenUpdateForm(false);
  };

  const data = {
    date: "",
    content: "",
    attendance: [],
    groupId: selectedGroup.groupId,
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>עדכונים ומפגשים</WidgetTitle>
        <Button onClick={() => setOpenMeetingForm(true)}>
          הוסף סיכום מפגש
        </Button>
        <Button onClick={() => setOpenUpdateForm(true)}>הוסף עדכון</Button>
        <CustomDialog onClose={handleClose} open={openMeeting}>
          <GroupUpdateForm
            onClose={handleClose}
            data={{ ...data, type: "meeting" }}
          />
        </CustomDialog>
        <CustomDialog onClose={handleClose} open={openUpdate}>
          <GroupUpdateForm
            onClose={handleClose}
            data={{ ...data, type: "update" }}
          />
        </CustomDialog>
      </WidgetHeader>

      <WidgetBody>
        {(!updates || updates.length === 0) && (
          <div>אין עדכונים או מפגשים בקבוצה זו</div>
        )}
        <Column>
          {sortedUpdates.map((update, index) => (
            <UpdateCard update={update} index={index} />
            // <div key={event.id}>
            //   <strong>{event.type === "meeting" ? "סיכום מפגש" : "עדכון"}</strong>
            //   : {new Date(event.date * 1000).toLocaleDateString()}
            //   <div>{event.content || ""}</div>
            //   {event.type === "meeting" && event.attendance && (
            //     <div>משתתפים: {event.attendance.join(", ")}</div>
            //   )}
            // </div>
          ))}
        </Column>
      </WidgetBody>
    </>
  );
};

export default GroupUpdates;
