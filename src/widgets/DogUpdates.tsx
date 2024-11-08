import { useState } from "react";
import { useSelector } from "react-redux";
import AddUpdateModal from "../components/AddUpdateModal";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";

import { UpdatesList } from "./UpdatesList";
import { WidgetHeader } from "../components/commonParts/Layouts";
import { selectSelectedDogId } from "../store/dogsSlice";

export default function DogUpdates() {
  const dogId = useSelector(selectSelectedDogId);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>עדכונים</WidgetTitle>
        <Button onClick={handleOpen}>הוסף עדכון</Button>
      </WidgetHeader>

      <UpdatesList dogId={dogId} />

      <AddUpdateModal dogId={dogId} open={open} handleClose={handleClose} />
    </>
  );
}
