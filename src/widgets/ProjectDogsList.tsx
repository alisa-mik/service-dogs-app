import { useSelector } from "react-redux";

import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { BROWN_DARK } from "../config/colors";
import { DogCard } from "../components/DogCard";

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

const ListContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ProjectsDogsList = () => {
  return (
    <>
      {/* <WidgetHeader>
        <WidgetTitle>כלבים בפרויקט</WidgetTitle>
      </WidgetHeader>
      <Body>
        {selectedProject ? (
          selectedProject.dogs && selectedProject.dogs.length > 0 ? (
            <ListContainer>
              {selectedProject.dogs.map((dog) => {
                return <DogCard dog={dog} />;
              })}
            </ListContainer>
          ) : (
            <p>No dogs found in this project.</p>
          )
        ) : (
          <p>בחר פרויקט להצגת הכלבים</p>
        )}
      </Body> */}
    </>
  );
};
