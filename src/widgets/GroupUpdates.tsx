import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../store/trainingGroupsSlice";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { Button } from "../components/commonParts/Buttons";

export const GroupUpdates: React.FC = () => {
  const [open, setOpen] = useState(false);

  const selectedGroup = useSelector(selectSelectedGroup);

  if (!selectedGroup) {
    return <div>בחר קבוצה</div>;
  }

  const { meetings, updates } = selectedGroup;

  const normalizedMeetings = (meetings || []).map((meeting) => ({
    ...meeting,
    type: "meeting",
  }));

  const normalizedUpdates = (updates || []).map((update) => ({
    ...update,
    type: "update",
  }));

  const combinedEvents = [...normalizedMeetings, ...normalizedUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>עדכונים ומפגשים</WidgetTitle>
        <Button onClick={() => setOpen(true)}>הוסף סיכום מפגש</Button>
        <Button onClick={() => setOpen(true)}>הוסף עדכון</Button>
      </WidgetHeader>

      <WidgetBody>
        {(!meetings || meetings.length === 0) &&
          (!updates || updates.length === 0) && (
            <div>אין עדכונים או מפגשים בקבוצה זו</div>
          )}
        {combinedEvents.map((event, index) => (
          <div key={index}>
            <strong>{event.type === "meeting" ? "סיכום מפגש" : "עדכון"}</strong>
            : {new Date(event.date).toLocaleDateString()}
            <div>{event.content || ""}</div>
          </div>
        ))}
      </WidgetBody>
    </>
  );
};

export default GroupUpdates;
