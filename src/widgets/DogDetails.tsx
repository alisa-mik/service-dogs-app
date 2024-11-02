import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatDateFromSeconds, getAgeFromSeconds } from "../utils/converts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { selectDog } from "../store/dogProfileSlice";
import { isEmpty } from "lodash";
import { Dog } from "../types/dogTypes";

import EditIcon from "@mui/icons-material/Edit";
import { BROWN_DARK } from "../config/colors";
import CustomDialog from "../components/CustomDialog";
import DogForm from "../components/DogForm/DogForm";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";

const Section = styled.section`
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #888888;
`;

const Value = styled.span`
  color: #333;
`;

const NoProfile = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.2em;
  padding: 50px 0;
`;

interface LabelValueProps {
  label: string;
  value: React.ReactNode;
}

const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => (
  <Row>
    <Label>{label}</Label>
    <Value>{value || "-"}</Value>
  </Row>
);

const DogDetails: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const dog = useSelector(selectDog);

  if (isEmpty(dog)) {
    return <NoProfile>No dog profile available.</NoProfile>;
  }

  const {
    dogName,
    color,
    breed,
    dogStatus,
    momDog,
    dadDog,
    chipNumber,
    dropDate,
    dropReason,
    groupId,
    // assignedFamily,
    birthDate,
  } = dog as Dog;

  console.log({ dog });

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>פרטים כלליים</WidgetTitle>
        <EditIcon
          style={{ color: BROWN_DARK, cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />
        <CustomDialog open={open} title="הוספת כלב חדש">
          <DogForm onClose={handleClose} data={dog} />
        </CustomDialog>
      </WidgetHeader>

      <WidgetBody>
        <Section>
          <LabelValue label="שם הכלב:" value={dogName} />
          <LabelValue label="צבע:" value={color} />
          <LabelValue label="גזע:" value={breed} />
          <LabelValue
            label="תאריך לידה:"
            value={formatDateFromSeconds(birthDate)}
          />
          <LabelValue label="גיל:" value={getAgeFromSeconds(birthDate)} />
          <LabelValue label="שם האם:" value={momDog} />
          <LabelValue label="שם האב:" value={dadDog} />
        </Section>
        <Section>
          <LabelValue label="קבוצה:" value={groupId} />
          {/* <LabelValue label="משויך למשפחה:" value={assignedFamily.familyName} /> */}
          <LabelValue label="סטטוס:" value={dogStatus} />
          <LabelValue label="מספר שבב:" value={chipNumber} />
          {dogStatus === "נשר" && (
            <>
              <LabelValue label="תאריך נשירה:" value={dropDate} />
              <LabelValue label="סיבת נשירה:" value={dropReason} />
            </>
          )}
        </Section>
      </WidgetBody>
    </>
  );
};

export default DogDetails;
