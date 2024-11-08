import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
// import DogsActions from "../widgets/DogsActions";
// import DogsStats from "../widgets/DogsStats";
import { useEffect } from "react";
import { fetchAllUpdates } from "../store/updatesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import DogsList from "../widgets/DogsList";
import { UpdatesList } from "../widgets/UpdatesList";
import { setSelectedDogId } from "../store/dogsSlice";
import { fetchFamilies } from "../store/familiesSlice";

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   border-radius: 16px;
//   background-image: url("/placeholder.jpg");
//   background-size: 200px 200px;
//   background-repeat: repeat;
// `;

export default function DogDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllUpdates({}));
    dispatch(setSelectedDogId(null));
    dispatch(fetchFamilies());
  }, [dispatch]);

  const widgets: WidgetConfig[] = [
    {
      layout: { w: 6.5, h: 100, x: 5.5, y: 0, i: "a" },
      widget: {
        props: {
          showExpnded: true,
        },
        display: true,
        type: DogsList,
      },
    },
    {
      layout: { w: 5.5, h: 100, x: 0, y: 0, i: "b" },
      widget: {
        props: {},
        display: true,
        type: UpdatesList,
      },
    },
    // {
    //   layout: { w: 5, h: 36, x: 7, y: 0, i: "c" },
    //   widget: {
    //     props: {},
    //     display: true,
    //     type: DogsStats,
    //   },
    // },
    // {
    //   layout: { w: 5, h: 36, x: 2, y: 0, i: "d" },
    //   widget: {
    //     props: {},
    //     display: true,
    //     type: Container,
    //   },
    // },
  ];

  return (
    <WidgetManager
      onLayoutChange={console.log}
      config={{ spacing: "10px", widgets }}
    />
  );
}
