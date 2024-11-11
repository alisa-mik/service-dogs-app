import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import styled from "styled-components";
import { TOASTED_PINE_NUT } from "../config/colors";
import CustomDialog from "../components/CustomDialog";
import { Button } from "../components/commonParts/Buttons";
import DogForm from "../components/DogForm/DogForm";
import { DogsTable } from "../components/DogsTable";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const SearchInput = styled.input`
  padding: 10px;
  width: 30%;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  direction: rtl;
  border: solid 1px ${TOASTED_PINE_NUT};
  pointer-events: all;
`;

const RowCenter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  gap: 10px;
  display: flex;
  pointer-events: none;
`;

export default function DogsList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { dogs } = useSelector((state: RootState) => state.dogs);

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    dogId: null,
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
    image: "",
    dogStatus: "",
    dropDate: "",
    dropReason: "",
    chipNumber: "",
    summary: "",
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>
          <div>כלבים</div>
          <div>{`(${dogs.length || 0})`}</div>
        </WidgetTitle>
        <RowCenter>
          <SearchInput
            type="text"
            placeholder="חיפוש לפי שם הכלב"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setOpen(true)}>הוסף כלב</Button>
          <CustomDialog onClose={handleClose} open={open} title="הוספת משפחה">
            <DogForm onClose={handleClose} data={data} />
          </CustomDialog>
        </RowCenter>
      </WidgetHeader>

      <WidgetBody>
        <DogsTable searchTerm={searchTerm} />
      </WidgetBody>
    </>
  );
}
