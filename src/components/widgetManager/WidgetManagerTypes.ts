/* eslint-disable @typescript-eslint/no-explicit-any */
import GridLayout from 'react-grid-layout';

export type DashboardsConfig = {
    widgets: WidgetConfig[];
    spacing: string;
    bgColor?: string;
};

export type WidgetItemConfig = {
    type: React.FC;
    props: any;
    display?: boolean;
};

export type WidgetConfig = {
    layout: GridLayout.Layout;
    widget: WidgetItemConfig;
};

export type Widget = (...rest: any[]) => JSX.Element;

export type AddWidgetPayload = {
    type: string;
    widget: Widget;
};