import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { DogListTable } from "../components/DogListTable";
import DogsActions from "../widgets/DogsActions";
import DogsStats from "../widgets/DogsStats";

const Container = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 16px;
	/* background-color: ${"white"}; */
	background-image: url("/placeholder.jpg");
	background-size: 200px 200px;
	background-repeat: repeat;
`;

export default function DogDashboard() {
	const widgets: WidgetConfig[] = [
		{
			layout: { w: 10, h: 63, x: 2, y: 36, i: "a" },
			widget: {
				props: {},
				display: true,
				type: DogListTable,
			},
		},
		{
			layout: { w: 2, h: 99, x: 0, y: 0, i: "b" },
			widget: {
				props: {},
				display: true,
				type: DogsActions,
			},
		},
		{
			layout: { w: 5, h: 36, x: 7, y: 0, i: "c" },
			widget: {
				props: {},
				display: true,
				type: DogsStats,
			},
		},
		{
			layout: { w: 5, h: 36, x: 2, y: 0, i: "d" },
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
			config={{ spacing: "10px", widgets }}
		/>
	);
}
