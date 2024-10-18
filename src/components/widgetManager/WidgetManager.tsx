/* eslint-disable @typescript-eslint/no-explicit-any */
import { noop } from "lodash";
import { useResizeDetector } from "react-resize-detector";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./grid.css";
import WidgetContainer from "./WidgetContainer";
import { DashboardsConfig, WidgetConfig } from "./WidgetManagerTypes";
import styled from "styled-components";

const Body = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	direction: ltr;
`;

export interface WidgetManagerProps {
	config: DashboardsConfig;
	numberOfColumns?: number;
	onLayoutChange?: (newLayout: GridLayout.Layout[]) => void;
	innerPaddingOnly?: boolean;
	externalProps?: any;
}

const buildInnerPadding = (
	spacing: string,
	layout: GridLayout.Layout,
	numberOfColumns: number
): string => {
	const paddingTop = layout.y === 0 ? 0 : spacing;
	const paddingRight = layout.x + layout.w === numberOfColumns ? 0 : spacing;
	const paddingBottom = layout.y + layout.h === 100 ? 0 : spacing;
	const paddingLeft = layout.x === 0 ? 0 : spacing;

	return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
};

export const WidgetManager = ({
	config,
	numberOfColumns = 12,
	onLayoutChange = noop,
	innerPaddingOnly = false,
	externalProps = {},
}: WidgetManagerProps): JSX.Element => {
	const { width, height, ref } = useResizeDetector({
		refreshRate: 500,
		refreshMode: "debounce",
	});
	const { widgets, spacing, bgColor } = config;
	const isWidgets = Array.isArray(widgets);
	const layout: GridLayout.Layout[] =
		(isWidgets &&
			widgets.reduce(
				(result: GridLayout.Layout[], current: WidgetConfig) => {
					result.push(current.layout as GridLayout.Layout);
					return result;
				},
				[] as GridLayout.Layout[]
			)) ||
		[];

	const renderWidgets = (): JSX.Element[] => {
		return isWidgets
			? (widgets.map((item: WidgetConfig) => {
					const { widget, layout } = item;
					if (!widget.display) return undefined;

					const padding = !innerPaddingOnly
						? spacing
						: buildInnerPadding(spacing, layout, numberOfColumns);
					const widgetId = `widget-${layout.i}-${widget.type}`;

					return (
						<div
							style={{
								boxSizing: "border-box",
								padding: padding,
							}}
							id={widgetId}
							key={layout.i}
						>
							<WidgetContainer
								widgetId={widgetId}
								widgetType={widget.type}
								bgColor={bgColor}
								{...widget.props}
								{...externalProps}
							/>
						</div>
					);
			  }) as JSX.Element[])
			: [];
	};

	const handleLayoutChange = (newLayout: GridLayout.Layout[]): void => {
		onLayoutChange(newLayout);
	};

	const renderLayout = (): JSX.Element | undefined => {
		if (!height) return undefined;
		// fixing a bug that show scroll if hight is odd
		const pairHight = height % 2 ? height - 1 : height;

		return (
			<GridLayout
				draggableHandle=".draggableHandle"
				className="layout"
				layout={layout}
				cols={numberOfColumns}
				margin={[0, 0]}
				rowHeight={pairHight / 100}
				width={width}
				autoSize={false}
				onLayoutChange={handleLayoutChange}
			>
				{renderWidgets()}
			</GridLayout>
		);
	};

	return <Body ref={ref}>{renderLayout()}</Body>;
};
