// ProjectsList.tsx

import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  selectProjects,
  selectProjectsStatus,
} from "../store/projectsSlice";

import { AppDispatch } from "../store";
import Accordion from "../components/commonParts/Accordion";
import ProjectCard from "../components/ProjectCard";
import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { BROWN_DARK } from "../config/colors";

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
  direction: rtl;

  gap: 30px;
  width: 100%;
  overflow: hidden;
`;

const Column = styled.div`
    flex: 1;
    color: ${BROWN_DARK};
`

export const ProjectsList = () => {
 
  const dispatch = useDispatch<AppDispatch>();
  
  const projects = useSelector(selectProjects);
  const [selectedProject, setSelectedProject] = useState('');
  const status = useSelector(selectProjectsStatus);
  console.log({ projects });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);



  return (
    <>
      <WidgetHeader>
        <WidgetTitle>פרויקטים</WidgetTitle>
        <WidgetTitle>כלבים בפרויקט</WidgetTitle>
      </WidgetHeader>



      <Body>
        <Column>
        {status === "succeeded" &&
        projects.map((project) => (
          <Accordion key={project.projectId} title={project.projectName}  projectId={project.projectId} isSelected={selectedProject === project.projectId} setSelectedProject={setSelectedProject}>
            <ProjectCard project={project} />
          </Accordion>
        ))}
        </Column>
        <Column>
        {selectedProject}
        </Column>

      {status === "loading" && <div>Loading projects...</div>}
      {status === "failed" && <div>Failed to load projects.</div>}
      </Body>
    </>
  );
};
