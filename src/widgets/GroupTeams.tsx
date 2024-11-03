import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../store/trainingGroupsSlice";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";

export const GroupTeams: React.FC = () => {
  const selectedGroup = useSelector(selectSelectedGroup);

  if (!selectedGroup) {
    return <div>בחר קבוצה</div>;
  }

  const { dogs } = selectedGroup;

  if (!dogs || dogs.length === 0) {
    return <div>אין כלבים בקבוצה זו</div>;
  }

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>כלבים בקבוצה</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <div>
          {dogs.map((dog: any) => (
            <div key={dog.dogId}>
              <strong>{dog.dogName}</strong> ({dog.breed})
            </div>
          ))}
        </div>
      </WidgetBody>
    </>
  );
};

export default GroupTeams;
