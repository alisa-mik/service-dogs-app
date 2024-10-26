import { useState } from "react";

import AddProjectForm from "../components/AddProjectForm";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import styled from "styled-components";


const Body = styled.div`
  flex: 1;
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
  direction: rtl;

  gap: 10px;
  width: 100%;
  overflow: hidden;
`;

export const ProjectsActions = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return  <Body>
    <Button onClick={handleOpen}>הוסף פרויקט</Button>
    
      <CustomDialog open={open} setOpen={setOpen}>
        <AddProjectForm handleClose={handleClose} />
      </CustomDialog>
    </Body>  
}