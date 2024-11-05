import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../store/trainingGroupsSlice";
import {
  Column,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { DogCard } from "../components/DogCard";

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
        <Column>
          {dogs.map((dog: any) => (
            <DogCard dog={dog} />
          ))}
        </Column>
      </WidgetBody>
    </>
  );
};

export default GroupTeams;
