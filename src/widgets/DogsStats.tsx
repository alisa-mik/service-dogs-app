import { useSelector } from "react-redux";
import { RootState } from "../store";
import AnimatedNumber from "../animated/AnimatedNumber";
import { Label } from "../components/commonParts/Labels";

export default function DogsStats() {
  const {
    dogs,
    // status: dogStatus,
    // error: dogError,
  } = useSelector((state: RootState) => state.dogs);

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
      <AnimatedNumber target={dogs.length} />
      <Label>כלבים רשומים במערכת</Label>
    </div>
  );
}
