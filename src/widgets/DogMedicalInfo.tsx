import styled from "styled-components";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { useSelector } from "react-redux";
import { selectDogProfile } from "../store/dogProfileSlice";
import { DogMedicalInfoForm } from "../components/Forms/DogMedicalInfoForm";
import { Dog } from "../types/dogTypes";
import { MedicalCard } from "./medical/MedicalCard";

type MedicalInfo = {
  type: string;
  label: string;
  dates: number[];
  gap?: number;
  initialGap: number;
};

const SWidgetBody = styled(WidgetBody)`
  justify-content: start;
  gap: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  height: 100%;
`;

const modifiedMedicalInfo: MedicalInfo[] = [
  {
    type: "vaccine",
    label: "משושה",
    dates: [1745991907, 1747892707, -1],
    gap: 40,
    initialGap: 42,
  },
  {
    type: "rabies",
    label: "כלבת",
    dates: [1747892707, -1],
    gap: 30,
    initialGap: 15,
  },
  {
    type: "worms",
    label: "תילוע",
    dates: [1745991907, -1, -1, -1, -1],
    gap: 180,
    initialGap: 20,
  },
  {
    type: "bravecto",
    label: "פרעושים",
    dates: [-1, -1, -1, -1, -1],
    gap: 180,
    initialGap: 60,
  },
  {
    type: "spay",
    label: "עיקור / סירוס",
    dates: [1745991907],
    initialGap: 240,
  },
  { type: "bp", label: "BP", dates: [-1], initialGap: 300 },
];

export const DogMedicalInfo = () => {
  const dog = useSelector(selectDogProfile);

  const { dogId, birthDate } = dog as Dog;

  const data = {
    dogId: dogId,
    date: null,
    scheduled: false,
    reason: false,
    bp: false,
    vaccine: false,
    rabies: false,
    worms: false,
    bravecto: false,
    spay: false,
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>מידע רפואי</WidgetTitle>
        <DogMedicalInfoForm data={data} icon={"edit"} />
      </WidgetHeader>
      <SWidgetBody>
        <Grid>
          {modifiedMedicalInfo.map((item) => (
            <MedicalCard key={item.type} item={item} birthDate={birthDate} />
          ))}
        </Grid>
      </SWidgetBody>
    </>
  );
};
