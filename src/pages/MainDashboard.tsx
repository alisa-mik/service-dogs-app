import styled from "styled-components";
import { WidgetManager } from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";

const Container = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 16px;
	background-image: url("/placeholder.jpg");
	background-size: 200px 200px;
	background-repeat: repeat;
`;

export default function MainDashboard() {
	const widgets: WidgetConfig[] = [
		{
			layout: { i: "a", x: 2, y: 0, w: 10, h: 46 },
			widget: {
				props: {},
				display: true,
				type: Container,
			},
		},
		{
			layout: { i: "b", x: 2, y: 46, w: 5, h: 54 },
			widget: {
				props: {},
				display: true,
				type: Container,
			},
		},
		{
			layout: { i: "c", x: 7, y: 46, w: 5, h: 54 },
			widget: {
				props: {},
				display: true,
				type: Container,
			},
		},
		{
			layout: { i: "d", x: 0, y: 0, w: 2, h: 100 },
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
