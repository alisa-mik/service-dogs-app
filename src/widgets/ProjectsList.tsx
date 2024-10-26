import { useEffect, useState } from "react";
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${BROWN_DARK};
`;

export const ProjectsList = () => {
  const projects = useSelector(selectProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  console.log({ projects });

  // const getDogIds = () => {
  //   if (selectedProjectId) {
  //     const project = projects.find((p) => p.projectId === selectedProjectId);
  //     if (project) {
  //       const dogIds = project.dogIds;
  //       return dogIds;
  //     }
  //     return undefined;
  //   }
  //   return undefined;
  // };

  const status = useSelector(selectProjectsStatus);

  // const dogIds = getDogIds();

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
              <Accordion
                key={project.projectId}
                id={project.projectId}
                title={project.projectName}
                isSelected={selectedProjectId === project.projectId}
                setSelectedId={setSelectedProjectId}
              >
                <p>{project.description}</p>
              </Accordion>
            ))}
        </Column>
        <Column>
          {/* {dogIds &&
            dogIds.map((dog: string, index: number) => (
              <div key={index}>{dog}</div>
            ))} */}
        </Column>

        {status === "loading" && <div>Loading projects...</div>}
        {status === "failed" && <div>Failed to load projects.</div>}
      </Body>
    </>
  );
};
