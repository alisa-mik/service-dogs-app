import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useState } from "react";
import { Title } from "./Labels";
import CustomDialog from "../CustomDialog";
import styled from "styled-components";
import { Button } from "./Buttons";
import { noop } from "lodash";
import { Center } from "./Layouts";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  gap: 50px;
`;

export default function DeleteButton({ onDelete = noop }) {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <>
      <CustomDialog onClose={handleClose} open={open}>
        <Container>
          <Center>
            <Title style={{ direction: "rtl" }}>
              האם אתה בטוח שברצונך למחוק את העדכון הזה?
            </Title>
          </Center>
          <ButtonGroup>
            <Button padding={"8px 20px"} onClick={handleDeleteClick}>
              כן
            </Button>
            <Button padding={"8px 20px"} onClick={handleClose}>
              לא
            </Button>
          </ButtonGroup>
        </Container>
      </CustomDialog>

      <DeleteTwoToneIcon fontSize="small" onClick={handleOpen} />
    </>
  );
}
