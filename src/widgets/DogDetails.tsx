import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatDateFromSeconds, getAgeFromSeconds } from "../utils/converts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { selectDogProfile } from "../store/dogProfileSlice";
import { isEmpty } from "lodash";
import { Dog } from "../types/dogTypes";
import DogForm from "../components/DogForm/DogForm";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { LabelValue } from "../components/commonParts/LabelValue";

const SPACING_XS = "0.2rem";

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${SPACING_XS};
`;

const Row = styled.div`
  display: flex;
  gap: ${SPACING_XS};
  font-size: 0.95em;
`;


const NoProfile = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.2em;
  padding: 0.3rem 0;
`;

const Body = styled(WidgetBody)`
  display: flex;
  flex-direction: column;
`;




const DogDetails: React.FC = () => {
  const dog = useSelector(selectDogProfile);

  if (isEmpty(dog)) {
    return <NoProfile>No dog profile available.</NoProfile>;
  }

  const {
    dogName,
    color,
    breed,
    gender,
    dogStatus,
    momDog,
    dadDog,
    chipNumber,
    dropDate,
    dropReason,
    groupId,
    birthDate,
  } = dog as Dog;

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>פרטים כלליים</WidgetTitle>
        <DogForm icon={"edit"} data={dog} />
      </WidgetHeader>

      <Body style={{ gap: SPACING_XS, justifyContent: "flex-start" }}>
        <Row>
          <Section>
            <LabelValue label="שם הכלב:" value={dogName} />
            <LabelValue label="צבע:" value={color} />
            <LabelValue label="גזע:" value={breed} />
            <LabelValue label="מין:" value={gender} />
            <LabelValue label="גיל:" value={getAgeFromSeconds(birthDate)} />
          </Section>
          <Section>
            <LabelValue
              label="תאריך לידה:"
              value={formatDateFromSeconds(birthDate)}
            />
            <LabelValue label="שם האם:" value={momDog} />
            <LabelValue label="שם האב:" value={dadDog} />
            <LabelValue label="קבוצה:" value={groupId} />
            <LabelValue label="סטטוס:" value={dogStatus} />
          </Section>
        </Row>
        {dogStatus === "נפסל" && (
          <>
            <LabelValue
              label="תאריך פסילה:"
              value={formatDateFromSeconds(dropDate)}
            />
            <LabelValue label="סיבת פסילה:" value={dropReason} />
          </>
        )}
        <LabelValue label="מספר שבב:" value={chipNumber} />
      </Body>
    </>
  );
};

export default DogDetails;