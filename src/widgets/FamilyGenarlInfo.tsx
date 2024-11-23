import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";

import EditFamilyGeneralInfo from "../components/EditFamilyGeneralInfo";
import { useSelector } from "react-redux";
import { selectSelectedFamily } from "../store/familiesSlice";

export default function FamilyGenarlInfo() {
  const selectedFamily = useSelector(selectSelectedFamily);

  const { familyId, generalInfo } = selectedFamily || {};

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>מידע נוסף</WidgetTitle>
        <EditFamilyGeneralInfo
          data={{
            generalInfo: generalInfo || "",
            familyId,
          }}
        />
      </WidgetHeader>

      <WidgetBody>{generalInfo}</WidgetBody>
    </>
  );
}
