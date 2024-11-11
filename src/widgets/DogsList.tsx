import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import styled from "styled-components";
import DogForm from "../components/DogForm/DogForm";
import { DogsTable } from "../components/DogsTable";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SearchInput } from "../components/form/styledInputs";

const RowCenter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  gap: 10px;
  display: flex;
  pointer-events: none;
`;

export default function DogsList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { dogs } = useSelector((state: RootState) => state.dogs);

  const data = {
    dogId: null,
    dogName: "",
    birthDate: "",
    gender: "",
    breed: "",
    color: "",
    momDog: "",
    dadDog: "",
    groupId: null,
    assignedFamily: null,
    active: true,
    image: "",
    dogStatus: "",
    dropDate: "",
    dropReason: "",
    chipNumber: "",
    summary: "",
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>
          <div>כלבים</div>
          <div>{`(${dogs.length || 0})`}</div>
        </WidgetTitle>
        <RowCenter>
          <SearchInput
            type="text"
            placeholder="חיפוש לפי שם הכלב"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DogForm data={data} />
        </RowCenter>
      </WidgetHeader>

      <WidgetBody>
        <DogsTable searchTerm={searchTerm} />
      </WidgetBody>
    </>
  );
}
