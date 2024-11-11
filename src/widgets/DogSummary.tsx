import { useSelector } from "react-redux";
import EditSummaryForm from "../components/EditSummaryForm";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { selectDogProfile } from "../store/dogProfileSlice";

export default function DogSummary() {
  const dog = useSelector(selectDogProfile);

  if (!dog) {
    return <div>No dog profile available.</div>;
  }
  const { summary, dogId } = dog;

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>התרשמות</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <div>{summary}</div>
        <EditSummaryForm
          data={{
            summary: summary || "",
            dogId,
          }}
        />
      </WidgetBody>
    </>
  );
}
