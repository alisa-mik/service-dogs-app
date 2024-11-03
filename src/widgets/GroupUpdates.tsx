import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../store/trainingGroupsSlice";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import GroupUpdateForm from "../components/GroupUpdateForm";

export const GroupUpdates: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const selectedGroup = useSelector(selectSelectedGroup);

  if (!selectedGroup) {
    return <div>בחר קבוצה</div>;
  }

  const { updates } = selectedGroup;

  const sortedUpdates = (updates || []).slice().sort((a, b) => b.date - a.date);

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    type: "meeting",
    date: "",
    content: "",
    attendance: [],
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>עדכונים ומפגשים</WidgetTitle>
        <Button onClick={() => setOpen(true)}>הוסף סיכום מפגש</Button>
        <Button onClick={() => setOpen(true)}>הוסף עדכון</Button>
        <CustomDialog onClose={handleClose} open={open}>
          <GroupUpdateForm onClose={handleClose} data={data} type="meeting" />
        </CustomDialog>
      </WidgetHeader>

      <WidgetBody>
        {(!updates || updates.length === 0) && (
          <div>אין עדכונים או מפגשים בקבוצה זו</div>
        )}
        {sortedUpdates.map((event) => (
          <div key={event.id}>
            <strong>{event.type === "meeting" ? "סיכום מפגש" : "עדכון"}</strong>
            : {new Date(event.date * 1000).toLocaleDateString()}
            <div>{event.content || ""}</div>
            {event.type === "meeting" && event.attendance && (
              <div>משתתפים: {event.attendance.join(", ")}</div>
            )}
          </div>
        ))}
      </WidgetBody>
    </>
  );
};

export default GroupUpdates;
