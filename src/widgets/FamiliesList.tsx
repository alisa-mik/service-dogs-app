import { useState } from "react";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import FamilyForm from "../components/FamilyForm";
import { FamiliesTable } from "../components/FamiliesTable";
import styled from "styled-components";
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

export default function FamiliesList() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const data = {
    familyName: "",
    contactName: "",
    joinedAt: "",
    dogIds: [],
    contactInfo: {},
    active: true,
    generalInfo: "",
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>משפחות</WidgetTitle>
        <RowCenter>
          <SearchInput
            type="text"
            placeholder="חיפוש לפי שם"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FamilyForm data={data} />
        </RowCenter>
      </WidgetHeader>

      <WidgetBody>
        <FamiliesTable searchTerm={searchTerm} />
      </WidgetBody>
    </>
  );
}
