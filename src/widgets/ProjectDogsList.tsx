import { useSelector } from "react-redux";
import { selectSelectedProject } from "../store/projectsSlice";

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
  flex-direction: column;
  color: ${BROWN_DARK};
  direction: rtl;
  gap: 30px;
  width: 100%;
  overflow: hidden;
`;

export const ProjectsDogsList = () => {
  const selectedProject = useSelector(selectSelectedProject);

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>כלבים בפרויקט</WidgetTitle>
      </WidgetHeader>
      <Body>
        {selectedProject ? (
          selectedProject.dogs && selectedProject.dogs.length > 0 ? (
            <ul>
              {selectedProject.dogs.map((dog) => (
                <li key={dog.dogId}>
                  <strong>{dog.dogName}</strong>
                  <p>Status: {dog.dogStatus}</p>
                  <p>Active: {dog.active ? "Yes" : "No"}</p>
                  {dog.image && <img src={dog.image} alt={`${dog.dogName}`} />}
                </li>
              ))}
            </ul>
          ) : (
            <p>No dogs found in this project.</p>
          )
        ) : (
          <p>בחר פרויקט להצגת הכלבים</p>
        )}
      </Body>
    </>
  );
};
