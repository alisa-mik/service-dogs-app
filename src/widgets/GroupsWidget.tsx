import { useState } from "react";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import TrainingGroupForm from "../components/TrainingGroupForm";
import GroupList from "./GroupsList";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import AddIcon from "@mui/icons-material/Add";

export default function GroupsList() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
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
        <Button onClick={() => setOpen(true)} padding={"2px 8px"}>
          <AddIcon />
        </Button>
      </WidgetHeader>
      <WidgetBody>
        <CustomDialog
          onClose={handleClose}
          open={open}
          title="הוספת קבוצה חדשה"
        >
          <TrainingGroupForm onClose={handleClose} data={data} />
        </CustomDialog>
        <GroupList />
      </WidgetBody>
    </>
  );
}
