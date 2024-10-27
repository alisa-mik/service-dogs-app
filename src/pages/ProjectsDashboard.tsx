import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { ProjectsList } from "../widgets/ProjectsList";
import { ProjectsDogsList } from "../widgets/ProjectDogsList";
import ProjectsStats from "../widgets/PorjectsStats";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const ProjectsDashboard = () => {
  const widgets: WidgetConfig[] = [
    {
      layout: { w: 12, h: 20, x: 0, y: 2, i: "a" },
      widget: {
        props: {},
        display: true,
        type: ProjectsStats,
      },
    },
    {
      layout: { w: 4, h: 80, x: 8, y: 36, i: "b" },
      widget: {
        props: {},
        display: true,
        type: ProjectsList,
      },
    },
    {
      layout: { w: 8, h: 80, x: 0, y: 36, i: "c" },
      widget: {
        props: {},
        display: true,
        type: ProjectsDogsList,
      },
    },
  ];

  return (
    <WidgetManager
      onLayoutChange={console.log}
      config={{ spacing: "20px", widgets }}
    />
  );
};
