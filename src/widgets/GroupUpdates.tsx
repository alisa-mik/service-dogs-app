import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../store/trainingGroupsSlice";
import {
  Column,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import GroupUpdateForm from "../components/GroupUpdateForm";
import UpdateCard from "../components/UpdateCard";

export const GroupUpdates: React.FC = () => {
  const selectedGroup = useSelector(selectSelectedGroup);

  if (!selectedGroup) {
    return <div>בחר קבוצה</div>;
  }

  const { updates } = selectedGroup;

  const sortedUpdates = (updates || []).slice().sort((a, b) => b.date - a.date);

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
        <GroupUpdateForm data={{ ...data, type: "meeting" }} />
        <GroupUpdateForm data={{ ...data, type: "update" }} />
      </WidgetHeader>

      <WidgetBody>
        {(!updates || updates.length === 0) && (
          <div>אין עדכונים או מפגשים בקבוצה זו</div>
        )}
        <Column>
          {sortedUpdates.map((update, index) => (
            <UpdateCard
              key={update.updateId}
              type="group"
              update={update}
              index={index}
            />
          ))}
        </Column>
      </WidgetBody>
    </>
  );
};

export default GroupUpdates;
