import {
  Row,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { useSelector } from "react-redux";
import { selectSelectedFamily } from "../store/familiesSlice";
import { DogCard } from "../components/DogCard";

export default function FamilyDogsList() {
  const selectedFamily = useSelector(selectSelectedFamily);
  const assignedDogs = selectedFamily?.assignedDogs || [];

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>כלבים </WidgetTitle>
      </WidgetHeader>

      <WidgetBody>
        <Row>
          {assignedDogs.map((dog) => {
            return <DogCard dog={dog} showFamily={false} />;
          })}
        </Row>
      </WidgetBody>
    </>
  );
}
