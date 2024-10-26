import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import CustomDialog from "../components/CustomDialog";
import EditSummaryForm from "../components/EditSummaryForm";
import styled from "styled-components";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";
import { BROWN_DARK } from "../config/colors";

const WidgetHeader = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  direction: rtl;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const Body = styled.div`
  flex: 1;
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  gap: 10px;
  width: 100%;
  overflow: auto;
  direction: rtl;
  color: ${BROWN_DARK};
`;

export default function DogSummary() {
  const dog = useSelector((state: RootState) => state.dogProfile.dog);
  const [open, setOpen] = useState<boolean>(false);

  if (!dog) {
    return <div>No dog profile available.</div>;
  }
  const { summary, dogId } = dog;
  console.log({ summary });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>התרשמות</WidgetTitle>
      </WidgetHeader>
      <Body>
        <div>{summary}</div>
        <Button onClick={() => setOpen(true)}>ערוך התרשמות</Button>

        <CustomDialog open={open} setOpen={setOpen} title="עדכון התרשמות">
          <EditSummaryForm
            dogId={dogId}
            currentSummary={summary ?? ""}
            onClose={handleClose}
          />
        </CustomDialog>
      </Body>
    </>
  );
}
