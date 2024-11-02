import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { formatDateFromSeconds, getAgeFromSeconds } from "../utils/converts";
import { CircularProgress } from "@mui/material";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs } from "../store/dogsSlice";
import { TOASTED_PINE_NUT } from "../config/colors";
import { Table } from "./table/Table";
import { Center } from "./commonParts/Layouts";

const Container = styled.div`
	padding: 10px;
	height: 100%;
	width: 100%;
	display: flex;
	gap: 10px;
	flex-direction: column;
	align-items: center;
`;

const SearchInput = styled.input`
	padding: 10px;
	width: 30%;
	font-size: 14px;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: white;
`;

export const DogTable: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {
		dogs,
		status: dogStatus,
		error: dogError,
	} = useSelector((state: RootState) => state.dogs);

	const [searchTerm, setSearchTerm] = useState<string>("");

	const navigate = useNavigate();

	useEffect(() => {
		if (dogStatus === "idle") {
			dispatch(fetchDogs());
		}
	}, [dogStatus, dispatch]);

	if (dogStatus === "loading") {
		return <CircularProgress />;
	}

	if (dogStatus === "failed") {
		return <div color="error">Error: {dogError}</div>;
	}
	const filteredDogs = dogs.filter((dog) =>
		dog.dogName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectDog = (id: string) => {
		navigate(id);
	};

	const renderTable = () => {
		// const commonProps = { renderCell: BasicCell, flex: 0.7 };
		const commonProps = { flex: 0.7 };

		const columns: GridColDef[] = [
			{
				...commonProps,
				field: "dogName",
				headerName: "שם הכלב",
				// renderCell: <div></div>
			},
			{
				...commonProps,
				field: "gender",
				headerName: "מין",
			},
			{
				...commonProps,
				field: "color",
				headerName: "צבע",
			},
			{
				...commonProps,
				field: "breed",
				headerName: "גזע",
			},
			{
				...commonProps,
				field: "birthDate",
				headerName: "תאריך לידה",
				flex: 0.8,
				valueGetter: (value, row) =>
					`${
						row.birthDate
							? formatDateFromSeconds(row.birthDate)
							: "-"
					}`,
			},
			{
				...commonProps,
				field: "age",
				headerName: "גיל",
				flex: 0.5,
				valueGetter: (value, row) =>
					`${row.birthDate ? getAgeFromSeconds(row.birthDate) : "-"}`,
			},
			{
				...commonProps,
				field: "groupId",
				headerName: "קבוצה",
			},
			{
				...commonProps,
				field: "momDog",
				headerName: "שם האם",
			},
			{
				...commonProps,
				field: "dogStatus",
				headerName: "סטטוס",
			},
			// {
			// 	...commonProps,
			// 	field: "fullName",
			// 	headerName: "Full name",
			// 	description:
			// 		"This column has a value getter and is not sortable.",
			// 	sortable: false,
			// 	valueGetter: (value, row) =>
			// 		`${row.firstName || ""} ${row.lastName || ""}`,
			// },
		];

		if (filteredDogs.length === 0) return <Center>אין כלבים במערכת</Center>;

		return (
			<Table
				columns={columns}
				rows={filteredDogs}
				onRowClick={({ id }) => {
					handleSelectDog(id as string);
				}}
			/>
		);
	};

	return (
		<Container>
			<SearchInput
				style={{
					direction: "rtl",
					border: `solid 1px ${TOASTED_PINE_NUT}`,
				}}
				type="text"
				placeholder="חיפוש לפי שם הכלב"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{renderTable()}
		</Container>
	);
};
