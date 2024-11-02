/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { formatDateFromSeconds } from "../utils/converts";
// import { CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDogs } from "../store/dogsSlice";
import { Table } from "./table/Table";
// import { Center } from "./commonParts/Layouts";
import { groupData } from "../config/groupAttendence";
import VCell from "./table/VCell";
import { Center } from "./commonParts/Layouts";
import { isEmpty } from "lodash";

const AttendanceTable: React.FC = () => {
	// const {
	// 	dogs,
	// 	status: dogStatus,
	// 	error: dogError,
	// } = useSelector((state: RootState) => state.dogs);

	const [enrichUpdates, setEnrichUpdates] = useState<any>([]);

	useEffect(() => {
		const attendanceUpdates = groupData.groups.group1.updates.filter(
			(update) => update.type === "meeting"
		);
		const gruopDogs = groupData.groups.group1.dogs;

		const enrich = attendanceUpdates.map((en) => {
			return gruopDogs.reduce(
				(res, dog) => {
					return {
						...res,
						[dog.dogName]: en.attendance?.includes(dog.dogId),
					};
				},
				{ id: en.date, date: en.date }
			);
		});

		setEnrichUpdates(enrich);
	}, []);

	const getColumns = () => {
		const columns: GridColDef[] = [
			{
				field: "date",
				headerName: "תאריך פגישה",
				width: 150,
				valueGetter: (value, row) => formatDateFromSeconds(row.date),
			},
		];

		groupData.groups.group1.dogs.forEach((dog) => {
			columns.push({
				field: dog.dogName,
				headerName: dog.dogName,
				renderCell: VCell,
			});
		});

		return columns;
	};

	if (isEmpty(enrichUpdates)) return <Center>לא נרשמו מפגשים</Center>;

	return <Table hideFooter columns={getColumns()} rows={enrichUpdates} />;
};

export default AttendanceTable;
