import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { useFetchDogProfile } from "../hooks/useFetchDogProfile";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useMemo } from "react";
import { setDogProfile } from "../store/dogProfileSlice";
import DogDetails from "../widgets/DogDetails";
import DogUpdates from "../widgets/DogUpdates";
import DogFamily from "../widgets/DogFamily";
import DogSummary from "../widgets/DogSummary";
import DogProfileNav from "../widgets/DogProfileNav";

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

	const { dog, loading, error } = useFetchDogProfile(dogId || "");

	useEffect(() => {
		if (dog) {
			dispatch(setDogProfile(dog));
		}
	}, [dog, dispatch]);

	const widgets: WidgetConfig[] = useMemo(
		() => [
			{
				layout: { w: 7, h: 60, x: 2, y: 37, i: "a" },
				widget: {
					props: {},
					display: true,
					type: DogUpdates,
				},
			},
			{
				layout: { w: 2, h: 100, x: 0, y: 0, i: "b" },
				widget: {
					props: {},
					display: true,
					type: DogProfileNav,
				},
			},
			{
				layout: { w: 5, h: 40, x: 7, y: 0, i: "c" },
				widget: {
					props: {},
					display: true,
					type: DogDetails,
				},
			},
			{
				layout: { w: 3, h: 40, x: 2, y: 0, i: "d" },
				widget: {
					props: {},
					display: true,
					type: Container,
				},
			},
			{
				layout: { w: 2, h: 40, x: 5, y: 0, i: "e" },
				widget: {
					props: {},
					display: true,
					type: DogFamily,
				},
			},
			{
				layout: { w: 3, h: 60, x: 9, y: 37, i: "f" },
				widget: {
					props: {},
					display: true,
					type: DogSummary,
				},
			},
		],
		[]
	);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<WidgetManager
			onLayoutChange={console.log}
			config={{ spacing: "10px", widgets }}
		/>
	);
}
