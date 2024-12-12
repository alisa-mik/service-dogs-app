import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedGroupDogs } from "../store/trainingGroupsSlice";
import {
  Column,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { DogCard } from "../components/DogCard";

export const GroupTeams: React.FC = () => {
  const selectedGroupDogs = useSelector(selectSelectedGroupDogs);

  if (!selectedGroupDogs || selectedGroupDogs.length === 0) {
    return <div>אין כלבים בקבוצה זו</div>;
  }

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>
          <div> כלבים בקבוצה</div>
          <div>{`(${selectedGroupDogs.length || 0})`}</div>
        </WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <Column>
          {selectedGroupDogs.map((dog: any) => (
            <DogCard key={dog.dogId} dog={dog} />
          ))}
        </Column>
      </WidgetBody>
    </>
  );
};

export default GroupTeams;
