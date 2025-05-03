import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { FamilyUpdates } from "../widgets/FamilyUpdates";
import DogsStats from "../widgets/DogsStats";
import GearRequestsSummary from "../widgets/GearRequestsSummary";
import GroupsList from "../widgets/GroupsWidget";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-image: url("/placeholder.jpg");
  background-size: 200px 200px;
  background-repeat: repeat;
`;

export default function MainDashboard() {
  const widgets: WidgetConfig[] = [
    {
      layout: { w: 2, h: 50, x: 10, y: 0, i: "c" },
      widget: {
        props: {
          showAddGroup: false,
          showAllOption: true,
        },
        display: true,
        type: GroupsList,
      },
    },
    {
      layout: { i: "a", x: 3, y: 0, w: 7, h: 20 },
      widget: {
        props: {},
        display: true,
        type: DogsStats,
      },
    },
    {
      layout: { i: "b", x: 7, y: 20, w: 3, h: 80 },
      widget: {
        props: {},
        display: true,
        type: GearRequestsSummary,
      },
    },
    {
      layout: { i: "z", x: 10, y: 50, w: 2, h: 50 },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { i: "d", x: 0, y: 0, w: 3, h: 100 },
      widget: {
        props: {},
        display: true,
        type: FamilyUpdates,
      },
    },
    {
      layout: { i: "f", x: 3, y: 20, w: 4, h: 40 },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { i: "e", x: 3, y: 60, w: 4, h: 40 },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
  ];

  return <WidgetManager config={{ spacing: "10px", widgets }} />;
}
