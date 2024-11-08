import { useState } from "react";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import CustomDialog from "../components/CustomDialog";
import FamilyForm from "../components/FamilyForm";
import { FamiliesTable } from "../components/FamiliesTable";
import styled from "styled-components";
import { TOASTED_PINE_NUT } from "../config/colors";

const SearchInput = styled.input`
  padding: 10px;
  width: 30%;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  direction: rtl;
  border: solid 1px ${TOASTED_PINE_NUT};
`;

const RowCenter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  gap: 10px;
  display: flex;
`;

export default function FamiliesList() {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        <RowCenter>
          <SearchInput
            type="text"
            placeholder="חיפוש לפי שם משפחה"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setOpen(true)}>הוסף משפחה</Button>
          <CustomDialog onClose={handleClose} open={open} title="הוספת משפחה">
            <FamilyForm onClose={handleClose} data={data} />
          </CustomDialog>
        </RowCenter>
      </WidgetHeader>

      <WidgetBody>
        <FamiliesTable searchTerm={searchTerm} />
      </WidgetBody>
    </>
  );
}
