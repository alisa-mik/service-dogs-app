import { FC } from "react";
import styled from "styled-components";

interface WidgetContainerI {
	widgetType: FC;
}

const Container = styled.div`
	background-color: white;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	overflow: auto;
`;

export default function WidgetContainer({ widgetType }: WidgetContainerI) {
	const Component = widgetType;

	return (
		<Container>
			<Component />
		</Container>
	);
}
