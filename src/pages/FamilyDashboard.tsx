import styled from "styled-components";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";

import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Center } from "../components/commonParts/Layouts";
import FamiliesList from "../widgets/FamiliesList";
import FamilyDetails from "../widgets/FamilyDetails";
import FamilyDogsList from "../widgets/FamilyDogsList";
import { fetchFamilies } from "../store/familiesSlice";
import FamilySummary from "../widgets/FamilySummary";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-image: url("/placeholder.jpg");
  background-size: 200px 200px;
  background-repeat: repeat;
`;

export default function FamiliesDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  //   const groupsError = useSelector(selectGroupsError);

  useEffect(() => {
    dispatch(fetchFamilies());
  }, [dispatch]);

  //   if (groupsStatus === "loading") {
  //     return (
  //       <Center>
  //         <CircularProgress />
  //       </Center>
  //     );
  //   }

  //   if (groupsStatus === "failed") {
  //     return <div>Error: {groupsError}</div>;
  //   }

  const widgets: WidgetConfig[] = [
    {
      layout: { w: 1, h: 100, x: 4, y: 0, i: "a" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },

    {
      layout: { w: 7, h: 100, x: 5, y: 0, i: "c" },
      widget: {
        props: { showExpnded: true },
        display: true,
        type: FamiliesList,
      },
    },
    {
      layout: { w: 4, h: 30, x: 0, y: 0, i: "k" },
      widget: {
        props: {},
        display: true,
        type: FamilyDetails,
      },
    },
    {
      layout: { w: 4, h: 30, x: 0, y: 30, i: "e" },
      widget: {
        props: {},
        display: true,
        type: FamilyDogsList,
      },
    },
    {
      layout: { w: 4, h: 40, x: 0, y: 60, i: "b" },
      widget: {
        props: {},
        display: true,
        type: FamilySummary,
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
