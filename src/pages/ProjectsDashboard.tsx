import styled from "styled-components";
import {WidgetManager} from "../components/widgetManager/WidgetManager";
import { WidgetConfig } from "../components/widgetManager/WidgetManagerTypes";
import { ProjectsList } from "../widgets/ProjectsList";
import { ProjectsActions } from "../widgets/ProjectsActions";

const Container = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 16px;
`;

export const ProjectsDashboard = () => {
    const widgets: WidgetConfig[] = [
		{
			layout: { w: 10, h: 100, x: 2, y: 36, i: "a" },
			widget: {
				props: {},
				display: true,
				type: ProjectsList,

			},
		},
		{
			layout: { w: 2, h: 100, x: 0, y: 0, i: "b" },
			widget: {
				props: {},
				display: true,
                type: ProjectsActions,
			},
		}
	];

	return (
		<WidgetManager
			onLayoutChange={console.log}
			config={{ spacing: "20px", widgets }}
		/>
	);
}