import { useSelector } from "react-redux";
import { selectDogProfile } from "../store/dogProfileSlice";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";

export default function DogFamily() {
  const dog = useSelector(selectDogProfile);
  if (!dog) {
    return <div>No dog profile available.</div>;
  }
  const { assignedFamilyId } = dog;
  return (
    <>
      <WidgetHeader>
        <WidgetTitle>המשפחה שלי</WidgetTitle>
      </WidgetHeader>
      <WidgetBody></WidgetBody>
    </>
  );
}
