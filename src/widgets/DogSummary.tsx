import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import CustomDialog from "../components/CustomDialog";
import EditSummaryForm from "../components/EditSummaryForm";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";

export default function DogSummary() {
  const dog = useSelector((state: RootState) => state.dogProfile.dog);
  const [open, setOpen] = useState<boolean>(false);

  if (!dog) {
    return <div>No dog profile available.</div>;
  }
  const { summary, dogId } = dog;
  console.log({ summary });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>התרשמות</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <div>{summary}</div>
        <Button onClick={() => setOpen(true)}>ערוך התרשמות</Button>

        <CustomDialog open={open} setOpen={setOpen} title="עדכון התרשמות">
          <EditSummaryForm
            dogId={dogId}
            currentSummary={summary ?? ""}
            onClose={handleClose}
          />
        </CustomDialog>
      </WidgetBody>
    </>
  );
}
