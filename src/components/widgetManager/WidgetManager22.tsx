import { useRef } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import { useSize } from "../../hooks/useSize";
const MyGrid = WidthProvider(GridLayout);

const Body = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	direction: ltr;
`;

export default function WidgetManager({ layout }) {
	const target = useRef(null);
	const size = useSize(target);
	const height = size?.height ?? 10;

	const renderWidget = (widget: GridLayout.Layout) => {
		return (
			<div
				key={widget.i}
				style={{
					background: "#ffffff",
					borderRadius: "20px",
					width: "100%",
					height: "100%",
				}}
			>
				{widget.i}
			</div>
		);
	};

	return (
		<Body ref={target}>
			<MyGrid
				className="layout"
				layout={layout}
				cols={12}
				rowHeight={height / 100}
			>
				{layout.map(renderWidget)}
			</MyGrid>
		</Body>
	);
}
