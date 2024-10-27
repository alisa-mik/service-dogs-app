import { useEffect, useState } from "react";
import { BROWN_DARK } from "../config/colors";
import { useSelector } from "react-redux";
import { selectProjects } from "../store/projectsSlice";

export default function ProjectsStats() {
  const projects = useSelector(selectProjects);

  const [count, setCount] = useState<number>(0);
  const target = projects.length;
  const duration = 2000;

  useEffect(() => {
    const stepTime = Math.ceil(duration / target);

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < target) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [target, duration]);

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
      <div style={{ fontSize: "45px", fontWeight: 600, color: BROWN_DARK }}>
        {count}
      </div>
      <div style={{ color: BROWN_DARK }}>פרויקטים רשומים במערכת</div>
    </div>
  );
}
