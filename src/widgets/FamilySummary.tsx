import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import EditFamilySummaryForm from "../components/EditFamilySummaryForm";
import { useState } from "react";

export default function FamilySummary() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>מידע נוסף</WidgetTitle>
        <Button onClick={() => setOpen(true)}>עריכה</Button>
        <CustomDialog onClose={handleClose} open={open} title="הוספת משפחה">
          <EditFamilySummaryForm />
          {/* <EditFamilySummaryForm onClose={handleClose} data={data} /> */}
        </CustomDialog>
      </WidgetHeader>

      <WidgetBody></WidgetBody>
    </>
  );
}
