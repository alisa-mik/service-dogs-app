import { useState } from "react";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import TrainingGroupForm from "../components/TrainingGroupForm";
import GroupList1 from "./GroupsList1";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";

export default function GroupsList() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    console.log("close");

    setOpen(false);
  };

  const data = {
    groupId: "",
    startDate: "",
    endDate: "",
    active: true,
    dogIds: [],
    familyIds: [],
    meetings: [],
    updates: [],
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>קבוצות</WidgetTitle>
        <Button onClick={() => setOpen(true)}>הוסף קבוצה</Button>
      </WidgetHeader>
      <WidgetBody>
        <CustomDialog open={open} title="הוספת קבוצה חדשה">
          <TrainingGroupForm onClose={handleClose} data={data} />
        </CustomDialog>
        <GroupList1 />
      </WidgetBody>
    </>
  );
}
