import { useState } from "react";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import CustomDialog from "../components/CustomDialog";
import FamilyForm from "../components/FamilyForm";

export default function FamiliesList() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    familyName: "",
    contactName: "",
    joinedAt: "",
    dogIds: [],
    contactInfo: {},
    active: true,
    generalInfo: "",
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>משפחות</WidgetTitle>
        <Button onClick={() => setOpen(true)}>הוסף משפחה</Button>
        <CustomDialog onClose={handleClose} open={open} title="הוספת משפחה">
          <FamilyForm onClose={handleClose} data={data} />
        </CustomDialog>
      </WidgetHeader>

      <WidgetBody></WidgetBody>
    </>
  );
}
