import AttendanceTable from "../components/AttendanceTable";
import { WidgetTitle } from "../components/commonParts/Labels";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";

export const GroupAttendance = () => {
	return (
		<>
			<WidgetHeader>
				<WidgetTitle>נוכחות במפגשים</WidgetTitle>
			</WidgetHeader>
			<WidgetBody>
				<AttendanceTable />
			</WidgetBody>
		</>
	);
};
