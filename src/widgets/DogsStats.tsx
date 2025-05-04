import { useSelector } from "react-redux";
import { RootState } from "../store";
import AnimatedNumber from "../animated/AnimatedNumber";
import { Label } from "../components/commonParts/Labels";
import {
  selectResolvedFamilyUpdatesCount,
  selectUnresolvedFamilyUpdatesCount,
} from "../store/familyUpdatesSlice";
import { Row } from "../components/commonParts/Layouts";

export default function DogsStats() {
  const {
    dogs,
    // status: dogStatus,
    // error: dogError,
  } = useSelector((state: RootState) => state.dogs);

  const unresolvedCount = useSelector(selectUnresolvedFamilyUpdatesCount);
  const resolvedCount = useSelector(selectResolvedFamilyUpdatesCount);

  const renderAnimatedNumber = (count: number, label: string) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <AnimatedNumber target={count} />
        <Label>{label}</Label>
      </div>
    );
  };

  return (
    <Row style={{ justifyContent: "space-around" }}>
      {renderAnimatedNumber(dogs.length, "כלבים רשומים במערכת")}
      {renderAnimatedNumber(unresolvedCount, "בקשות פתוחות")}
      {renderAnimatedNumber(resolvedCount, "בקשות שטופלו")}
    </Row>
  );
}
