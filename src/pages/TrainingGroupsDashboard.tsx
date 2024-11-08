import styled from "styled-components";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { GroupTeams } from "../widgets/GroupTeams";
import { GroupAttendance } from "../widgets/GroupAttendance";
import GroupsList from "../widgets/GroupsWidget";
import GroupUpdates from "../widgets/GroupUpdates";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  fetchGroups,
  selectGroupsError,
  selectGroupsStatus,
} from "../store/trainingGroupsSlice";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Center } from "../components/commonParts/Layouts";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-image: url("/placeholder.jpg");
  background-size: 200px 200px;
  background-repeat: repeat;
`;

export default function TrainingGroupsDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const groupsStatus = useSelector(selectGroupsStatus);
  const groupsError = useSelector(selectGroupsError);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (groupsStatus === "loading") {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  if (groupsStatus === "failed") {
    return <div>Error: {groupsError}</div>;
  }

  const widgets: WidgetConfig[] = [
    {
      layout: { w: 9.5, h: 40, x: 2.5, y: 60, i: "a" },
      widget: {
        props: { showExpnded: true },
        display: true,
        type: GroupAttendance,
      },
    },
    {
      layout: { w: 2, h: 60, x: 10, y: 0, i: "b" },
      widget: {
        props: {},
        display: true,
        type: GroupsList,
      },
    },
    {
      layout: { w: 6, h: 60, x: 4, y: 0, i: "c" },
      widget: {
        props: {},
        display: true,
        type: GroupUpdates,
      },
    },
    {
      layout: { w: 1.5, h: 60, x: 2.5, y: 40, i: "k" },
      widget: {
        props: {},
        display: true,
        type: Container,
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

  return (
    <WidgetManager
      onLayoutChange={console.log}
      config={{ spacing: "10px", widgets }}
    />
  );
}
