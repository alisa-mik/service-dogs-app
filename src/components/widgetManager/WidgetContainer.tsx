import { FC } from "react";
import styled from "styled-components";

// type AnyObject = Record<string, unknown>;

interface WidgetContainerI {
	widgetType: FC;
	padding: string;
}

const Container = styled.div<{ padding: string }>`
	background-color: white;
	border-radius: 16px;
	width: 100%;
	height: 100%;
	padding: ${({ padding = "10px" }) => padding};
	justify-content: center;
	align-items: center;
	display: flex;
	overflow: auto;
	box-sizing: border-box;
	flex-direction: column;
`;

export default function WidgetContainer({
	widgetType,
	padding,
}: WidgetContainerI) {
	const Component = widgetType;

	return (
		<Container padding={padding}>
			<Component />
		</Container>
	);
}
