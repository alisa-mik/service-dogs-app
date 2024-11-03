/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

interface WidgetContainerI {
	widgetType: FC;
	padding: string;
	widgetId: string;
	showExpnded?: boolean;
}

export const Absolute = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
`;

const Container = styled.div<{ padding: string; isExpanded: boolean }>`
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

	${({ isExpanded }) =>
		isExpanded &&
		css`
			top: 0;
			left: 0;
			width: calc(100vw - 20px);
			height: calc(100vh - 70px);
		`}
`;

export default function WidgetContainer({
	widgetType,
	padding,
	widgetId,
	showExpnded = false,
}: WidgetContainerI) {
	const parentRef = useRef<any>();
	const transformRef = useRef<any>();
	const [isExpanded, setIsExpanded] = useState(false);
	const Component = widgetType;
	const parent = document.getElementById(widgetId);

	useEffect(() => {
		if (parent) {
			parentRef.current = parent;
		}
	}, [parent]);

	useEffect(() => {
		const topLeft = "translate(0px, 0px)";
		const currentTransform = parentRef.current?.style.transform;

		if (currentTransform !== topLeft) {
			transformRef.current = currentTransform;
		}

		if (transformRef.current) {
			parentRef.current.style.transform = isExpanded
				? topLeft
				: transformRef.current;
		}

		if (isExpanded && parentRef.current) {
			parentRef.current.style["z-index"] = 10;
		} else {
			setTimeout(() => {
				parentRef.current.style["z-index"] = 1;
			}, 300);
		}
	}, [isExpanded]);

	const toggleExpand = () => {
		setIsExpanded((prev) => !prev);
	};

	const renderExpandedController = () => {
		if (!showExpnded) return undefined;

		return (
			<Absolute>
				{isExpanded ? (
					<FullscreenExitIcon
						style={{ cursor: "pointer" }}
						onClick={toggleExpand}
					/>
				) : (
					<FullscreenIcon
						style={{ cursor: "pointer" }}
						onClick={toggleExpand}
					/>
				)}
			</Absolute>
		);
	};

	return (
		<Container padding={padding} isExpanded={isExpanded}>
			{renderExpandedController()}
			<Component />
		</Container>
	);
}
