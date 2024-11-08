import { useSelector } from "react-redux";
import { useState } from "react";
import CustomDialog from "../components/CustomDialog";
import EditSummaryForm from "../components/EditSummaryForm";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { selectDogProfile } from "../store/dogProfileSlice";

export default function DogSummary() {
  const dog = useSelector(selectDogProfile);
  const [open, setOpen] = useState<boolean>(false);

  if (!dog) {
    return <div>No dog profile available.</div>;
  }
  const { summary, dogId } = dog;

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

        <CustomDialog onClose={handleClose} open={open}>
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
