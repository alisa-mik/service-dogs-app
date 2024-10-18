import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { DogListTable } from "../components/DogListTable";
import DogsActions from "../widgets/DogsActions";

const Container = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 16px;
	background-color: ${"blue"};
`;

export default function DogDashboard() {
	const widgets: WidgetConfig[] = [
		{
			layout: { w: 6, h: 100, x: 0, y: 0, i: "a" },
			widget: {
				props: {},
				display: true,
				type: DogListTable,
			},
		},
		{
			layout: { w: 2, h: 63, x: 6, y: 37, i: "b" },
			widget: {
				props: {},
				display: true,
				type: DogsActions,
			},
		},
		{
			layout: { w: 4, h: 63, x: 8, y: 37, i: "c" },
			widget: {
				props: {},
				display: true,
				type: Container,
			},
		},
		{
			layout: { w: 6, h: 37, x: 6, y: 0, i: "d" },
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
			config={{ spacing: "5px", widgets }}
		/>
	);
}
