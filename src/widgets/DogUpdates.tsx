import { useState } from "react";
import { useSelector } from "react-redux";
import AddUpdateModal from "../components/AddUpdateModal";
import styled from "styled-components";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";

import { selectDogId } from "../store/dogProfileSlice";
import { selectUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { UpdatesList } from "./UpdatesList";
import { WidgetHeader } from "../components/commonParts/Layouts";

export default function DogUpdates() {
  const updates = useSelector(selectUpdatesByDogId);
  const dogId = useSelector(selectDogId);
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
