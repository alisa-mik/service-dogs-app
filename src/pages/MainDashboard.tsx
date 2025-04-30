import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { FamilyUpdates } from "../widgets/FamilyUpdates";
import DogsStats from "../widgets/DogsStats";

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
      layout: { i: "a", x: 0, y: 0, w: 8, h: 20 },
      widget: {
        props: {},
        display: true,
        type: DogsStats,
      },
    },
    {
      layout: { i: "b", x: 3, y: 20, w: 5, h: 80 },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { i: "c", x: 8, y: 0, w: 4, h: 100 },
      widget: {
        props: {},
        display: true,
        type: FamilyUpdates,
      },
    },
    {
      layout: { i: "d", x: 0, y: 20, w: 3, h: 80 },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
  ];

  return <WidgetManager config={{ spacing: "10px", widgets }} />;
}
