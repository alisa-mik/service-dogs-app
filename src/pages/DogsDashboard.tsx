import { useDispatch } from "react-redux";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { AppDispatch } from "../store";
import { setSelectedDogId } from "../store/dogsSlice";
import DogsList from "../widgets/DogsList";
import { UpdatesList } from "../widgets/UpdatesList";
import { useEffect } from "react";

export default function DogDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSelectedDogId(null));
  }, [dispatch]);

  const widgets: WidgetConfig[] = [
    {
      layout: { w: 6.5, h: 100, x: 5.5, y: 0, i: "a" },
      widget: {
        props: {
          showExpanded: true,
        },
        display: true,
        type: DogsList,
      },
    },
    {
      layout: { w: 5.5, h: 100, x: 0, y: 0, i: "b" },
      widget: {
        props: {
          showExpanded: true,
        },
        display: true,
        type: UpdatesList,
      },
    },
  ];

  return <WidgetManager config={{ spacing: "10px", widgets }} />;
}
