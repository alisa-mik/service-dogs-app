import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const DogsForSoldiersDashboard = () => {
  const widgets: WidgetConfig[] = [
    {
      layout: { w: 2, h: 100, x: 10, y: 0, i: "a" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 4, h: 80, x: 8, y: 36, i: "b" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 8, h: 80, x: 0, y: 36, i: "c" },
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
};
