import styled from "styled-components";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { GroupTeams } from "../widgets/GroupTeams";
import { GroupAttendance } from "../widgets/GroupAttendance";
import GroupsList from "../widgets/GroupsList";
import GroupDetails from "../widgets/GroupDetails";
import GroupUpdates from "../widgets/GroupUpdates";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-image: url("/placeholder.jpg");
  background-size: 200px 200px;
  background-repeat: repeat;
`;

export default function TrainingGroupsDashboard() {
  const widgets: WidgetConfig[] = [
    {
      layout: { w: 9, h: 40, x: 3, y: 60, i: "a" },
      widget: {
        props: {},
        display: true,
        type: GroupAttendance,
      },
    },
    {
      layout: { w: 2, h: 60, x: 10, y: 0, i: "b" },
      widget: {
        props: {},
        display: true,
        type: GroupsList,
      },
    },
    {
      layout: { w: 5, h: 60, x: 5, y: 0, i: "c" },
      widget: {
        props: {},
        display: true,
        type: GroupUpdates,
      },
    },
    {
      layout: { w: 2, h: 40, x: 3, y: 0, i: "d" },
      widget: {
        props: {},
        display: true,
        type: GroupDetails,
      },
    },
    {
      layout: { w: 2, h: 20, x: 3, y: 40, i: "k" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 3, h: 100, x: 0, y: 0, i: "e" },
      widget: {
        props: {},
        display: true,
        type: GroupTeams,
      },
    },
  ];

  return (
    <WidgetManager
      onLayoutChange={console.log}
      config={{ spacing: "10px", widgets }}
    />
  );
}
