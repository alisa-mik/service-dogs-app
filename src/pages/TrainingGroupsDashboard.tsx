import styled from "styled-components";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { WidgetManager } from "../components/widgetManager/WidgetManager";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export default function TrainingGroupsDashboard() {
  const widgets: WidgetConfig[] = [
    {
      layout: { w: 9, h: 30, x: 3, y: 0, i: "a" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 2, h: 70, x: 10, y: 20, i: "b" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 4, h: 70, x: 6, y: 20, i: "c" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 3, h: 70, x: 3, y: 20, i: "d" },
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
        type: Container,
      },
    },
  ];

  return (
    <WidgetManager
      onLayoutChange={console.log}
      config={{ spacing: "20px", widgets }}
    />
  );
}
