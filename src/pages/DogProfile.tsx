import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useMemo } from "react";
import DogDetails from "../widgets/DogDetails";
import DogFamily from "../widgets/DogFamily";
import DogSummary from "../widgets/DogSummary";
import {
  fetchDogById,
  selectDogError,
  selectDogProfile,
  selectDogStatus,
} from "../store/dogProfileSlice";
import { fetchUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { Center } from "../components/commonParts/Layouts";
import { UpdatesList } from "../widgets/UpdatesList";
import { setSelectedDogId } from "../store/dogsSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  /* background-color: ${"white"}; */
  background-image: url("/placeholder.jpg");
  background-size: 200px 200px;
  background-repeat: repeat;
`;

export default function DogProfile() {
  const { dogId } = useParams<{ dogId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const selectedDogProfile = useSelector(selectDogProfile);
  const selectedDogStatus = useSelector(selectDogStatus);
  const selectedDogError = useSelector(selectDogError);

  const { status: updatesStatus, error: updatesError } = useSelector(
    (state: RootState) => state.updatesByDogId
  );

  useEffect(() => {
    if (dogId) {
      dispatch(fetchDogById(dogId));
      dispatch(fetchUpdatesByDogId(dogId));
      dispatch(setSelectedDogId(dogId));
    }
  }, [dispatch, dogId]);

  const widgets: WidgetConfig[] = useMemo(
    () => [
      {
        layout: { w: 5, h: 100, x: 3, y: 0, i: "a" },
        widget: {
          props: {
            padding: "0px",
          },
          display: true,
          type: UpdatesList,
        },
      },
      // {
      //   layout: { w: 2, h: 100, x: 0, y: 0, i: "b" },
      //   widget: {
      //     props: {},
      //     display: true,
      //     type: DogProfileNav,
      //   },
      // },
      {
        layout: { w: 4, h: 40, x: 8, y: 0, i: "c" },
        widget: {
          props: {},
          display: true,
          type: DogDetails,
        },
      },
      {
        layout: { w: 3, h: 60, x: 0, y: 30, i: "d" },
        widget: {
          props: {},
          display: true,
          type: Container,
        },
      },
      {
        layout: { w: 3, h: 40, x: 0, y: 0, i: "e" },
        widget: {
          props: {},
          display: true,
          type: DogFamily,
        },
      },
      {
        layout: { w: 4, h: 60, x: 8, y: 50, i: "f" },
        widget: {
          props: {},
          display: true,
          type: DogSummary,
        },
      },
    ],
    []
  );

  if (selectedDogStatus === "loading") {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  if (selectedDogStatus === "failed") {
    return <div>Error: {selectedDogError}</div>;
  }

  if (updatesStatus === "failed") {
    return <div>Error: {updatesError}</div>;
  }

  if (!selectedDogProfile) {
    return <div>No dog data available.</div>;
  }

  return (
    <WidgetManager
      onLayoutChange={console.log}
      config={{ spacing: "10px", widgets }}
    />
  );
}
