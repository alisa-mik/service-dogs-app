import { useState } from "react";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import DogForm from "../components/DogForm/DogForm";

export default function DogsActions() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    dogName: "",
    birthDate: "",
    gender: "",
    breed: "",
    color: "",
    momDog: "",
    dadDog: "",
    groupId: null,
    assignedFamily: null,
    active: true,
    dogStatus: "",
    dropDate: "",
    dropReason: "",
    chipNumber: "",
    medicalInfo: "",
    summary: "",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Button onClick={() => setOpen(true)}>הוספת כלב</Button>
        <CustomDialog open={open} title="הוספת כלב חדש">
          <DogForm onClose={handleClose} data={data} />
        </CustomDialog>
        <Button>הוספת קבוצה חדשה</Button>
        <Button>לארכיון</Button>
      </div>
      <div>
        <img style={{ width: "90%" }} src="/dogs.jpg" alt="dogs" />
      </div>
    </div>
  );
}
