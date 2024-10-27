import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProjects,
  selectProjectsStatus,
  selectSelectedProject,
  setSelectedProject,
} from "../store/projectsSlice";

import Accordion from "../components/commonParts/Accordion";
import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { BROWN_DARK } from "../config/colors";
import CustomDialog from "../components/CustomDialog";
import { Button } from "../components/commonParts/Buttons";
import AddProjectForm from "../components/AddProjectForm";

const WidgetHeader = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 30px;
  direction: rtl;
  align-items: center;
  padding: 0 10px;
  background-color: #fff;
`;

const Body = styled.div`
  flex: 1;
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
  color: ${BROWN_DARK};
  direction: rtl;
  gap: 10px;
  width: 100%;
  overflow: hidden;
`;

export const ProjectsList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const projects = useSelector(selectProjects);
  const status = useSelector(selectProjectsStatus);
  const selectedProject = useSelector(selectSelectedProject);
  console.log({ projects });

  const handleSelectProject = (projectId: string | null) => {
    dispatch(setSelectedProject(projectId));
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>פרויקטים</WidgetTitle>
        <Button onClick={handleOpen}>הוסף פרויקט</Button>

        <CustomDialog open={open} setOpen={setOpen}>
          <AddProjectForm handleClose={handleClose} />
        </CustomDialog>
      </WidgetHeader>

      <Body>
        {status === "succeeded" &&
          projects.map((project) => (
            <Accordion
              key={project.projectId}
              id={project.projectId}
              title={project.projectName}
              isSelected={selectedProject?.projectId === project.projectId}
              setSelectedId={handleSelectProject}
            >
              <p>{project.description}</p>
            </Accordion>
          ))}
        {status === "loading" && <div>Loading projects...</div>}
        {status === "failed" && <div>Failed to load projects.</div>}
      </Body>
    </>
  );
};
