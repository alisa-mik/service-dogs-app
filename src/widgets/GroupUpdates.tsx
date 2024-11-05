import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../store/trainingGroupsSlice";
import {
  Column,
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
            <UpdateCard key={update.updateId} update={update} index={index} />
          ))}
        </Column>
      </WidgetBody>
    </>
  );
};

export default GroupUpdates;
