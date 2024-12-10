import { uniqueId } from "lodash";

export default function DogsImage() {
  return (
    <div style={{ display: "flex", alignItems: "end", height: "100%" }}>
      <img style={{ width: "100%" }} src={`/dogs.jpg?v=${uniqueId()}`} />
    </div>
  );
}
