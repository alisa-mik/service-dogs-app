import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import FamiliesList from "../widgets/FamiliesList";
import FamilyDetails from "../widgets/FamilyDetails";
import FamilyDogsList from "../widgets/FamilyDogsList";
import FamilySummary from "../widgets/FamilySummary";

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   border-radius: 16px;
//   background-image: url("/placeholder.jpg");
//   background-size: 200px 200px;
//   background-repeat: repeat;
// `;

export default function FamiliesDashboard() {
  const widgets: WidgetConfig[] = [
    {
      layout: { w: 7, h: 100, x: 5, y: 0, i: "c" },
      widget: {
        props: { showExpnded: true },
        display: true,
        type: FamiliesList,
      },
    },
    {
      layout: { w: 5, h: 30, x: 0, y: 0, i: "k" },
      widget: {
        props: {},
        display: true,
        type: FamilyDetails,
      },
    },
    {
      layout: { w: 5, h: 30, x: 0, y: 30, i: "e" },
      widget: {
        props: {},
        display: true,
        type: FamilyDogsList,
      },
    },
    {
      layout: { w: 5, h: 40, x: 0, y: 60, i: "b" },
      widget: {
        props: {},
        display: true,
        type: FamilySummary,
      },
    },
  ];

  return <WidgetManager config={{ spacing: "10px", widgets }} />;
}
