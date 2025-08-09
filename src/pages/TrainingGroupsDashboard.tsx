// import styled from "styled-components";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { GroupTeams } from "../widgets/GroupTeams";
import { GroupAttendance } from "../widgets/GroupAttendance";
import GroupsList from "../widgets/GroupsWidget";
import GroupUpdates from "../widgets/GroupUpdates";
import DogsImage from "../widgets/DogsImage";

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   border-radius: 16px;
//   background-image: url("/placeholder.jpg");
//   background-size: 200px 200px;
//   background-repeat: repeat;
// `;

export default function TrainingGroupsDashboard() {
  const widgets: WidgetConfig[] = [
    {
      layout: { w: 9.5, h: 40, x: 2.5, y: 60, i: "a" },
      widget: {
        props: { showExpanded: true },
        display: true,
        type: GroupAttendance,
      },
    },
    {
      layout: { w: 2, h: 60, x: 10, y: 0, i: "b" },
      widget: {
        props: {
          showAddGroup: true,
          showAllOption: false,
          allowDelete: true,
        },
        display: true,
        type: GroupsList,
      },
    },
    {
      layout: { w: 6, h: 60, x: 4, y: 0, i: "c" },
      widget: {
        props: {
          showExpanded: true,
        },
        display: true,
        type: GroupUpdates,
      },
    },
    {
      layout: { w: 1.5, h: 60, x: 2.5, y: 40, i: "k" },
      widget: {
        props: {},
        display: true,
        type: DogsImage,
      },
    },
    {
      layout: { w: 2.5, h: 100, x: 0, y: 0, i: "e" },
      widget: {
        props: {},
        display: true,
        type: GroupTeams,
      },
    },
  ];

  return <WidgetManager config={{ spacing: "10px", widgets }} />;
}
