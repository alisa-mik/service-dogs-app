import { FC } from "react";
import styled from "styled-components";

interface WidgetContainerI {
	widgetType: FC;
}

const Container = styled.div`
	background-color: white;
	border-radius: 16px;
	width: 100%;
	height: 100%;
	padding: 10px;
	justify-content: center;
	align-items: center;
	overflow: auto;
	box-sizing: border-box;
`;

export default function WidgetContainer({ widgetType }: WidgetContainerI) {
	const Component = widgetType;

	return (
		<Container>
			<Component />
		</Container>
	);
}
