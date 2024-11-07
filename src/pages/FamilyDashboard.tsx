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
  //   const groupsStatus = useSelector(selectGroupsStatus);
  //   const groupsError = useSelector(selectGroupsError);

  //   useEffect(() => {
  //     dispatch(fetchGroups());
  //   }, [dispatch]);

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
      layout: { w: 7, h: 30, x: 5, y: 0, i: "a" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 1, h: 50, x: 4, y: 0, i: "b" },
      widget: {
        props: {},
        display: true,
        type: Container,
      },
    },
    {
      layout: { w: 7, h: 70, x: 5, y: 30, i: "c" },
      widget: {
        props: { showExpnded: true },
        display: true,
        type: FamiliesList,
      },
    },
    {
      layout: { w: 5, h: 50, x: 0, y: 0, i: "k" },
      widget: {
        props: {},
        display: true,
        type: FamilyDetails,
      },
    },
    {
      layout: { w: 4, h: 50, x: 0, y: 50, i: "e" },
      widget: {
        props: {},
        display: true,
        type: FamilyDogsList,
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
