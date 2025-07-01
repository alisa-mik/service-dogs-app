import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { useSelector } from "react-redux";
import { selectDogProfile } from "../store/dogProfileSlice";
import { DogMedicalInfoForm } from "../components/Forms/DogMedicalInfoForm";
import { Dog } from "../types/dogTypes";
import { MedicalCard } from "./medical/MedicalCard";
import { getMedicalCardsInfo } from "../utils/medicalUtils";

const SWidgetBody = styled(WidgetBody)`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`;
export const DogMedicalInfo = () => {
  const dog = useSelector(selectDogProfile);
  const { dogId, birthDate, gender, medicalInfo } = dog as Dog;

  const data = {
    dogId: dogId,
    date: null,
    scheduled: false,
    reason: false,
    dp: false,
    vaccination: false,
    rabies: false,
    deworming: false,
    bravecto: false,
    spay: false,
  };

  const medicalCardsInfo = getMedicalCardsInfo(medicalInfo, gender);

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>מידע רפואי</WidgetTitle>
        <DogMedicalInfoForm data={data} />
      </WidgetHeader>
      <SWidgetBody>
        {medicalCardsInfo.map((item) => (
          <MedicalCard
            key={item.type}
            item={item}
            birthDate={birthDate}
            dogId={dogId}
          />
        ))}
      </SWidgetBody>
    </>
  );
};
