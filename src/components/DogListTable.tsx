import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { formatDateFromSeconds, getAgeFromSeconds } from "../utils/converts";
import { CircularProgress, Pagination } from "@mui/material";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs } from "../store/dogsSlice";
import { TOASTED_PINE_NUT } from "../config/colors";

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
	width: 50%;
	font-size: 14px;
	border-radius: 5px;
	border: 1px solid #ccc;
`;

export const DogListTable: React.FC = () => {
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

	const BasicCell = ({ value }: GridCellParams): React.ReactElement => {
		const displayValue =
			value !== null && value !== undefined ? String(value) : "-";

		return (
			<div
				style={{
					textAlign: "start",
					fontFamily: "Rubik, sans-serif",
					fontWeight: 400,
				}}
			>
				{displayValue}
			</div>
		);
	};
	const CustomPagination = () => {
		const apiRef = useGridApiContext();
		const page = useGridSelector(apiRef, gridPageSelector);
		const pageCount = useGridSelector(apiRef, gridPageCountSelector);

		return (
			<div
				dir="ltr"
				style={{
					display: "flex",
					width: "100%",
				}}
			>
				<Pagination
					color="secondary"
					count={pageCount}
					page={page + 1}
					onChange={(event, value) =>
						apiRef.current.setPage(value - 1)
					}
				/>
			</div>
		);
	};

	const renderTable = () => {
		const commonProps = { renderCell: BasicCell, flex: 0.7 };

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
				field: "momName",
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

		const paginationModel = { page: 0, pageSize: 15 };

		return (
			<DataGrid
				rows={filteredDogs}
				onRowClick={({ id }) => {
					handleSelectDog(id as string);
				}}
				columns={columns}
				disableColumnResize
				disableColumnMenu
				initialState={{ pagination: { paginationModel } }}
				slots={{
					pagination: CustomPagination,
				}}
				sx={{
					width: "100%",
					direction: "rtl",
					border: `solid 1px ${TOASTED_PINE_NUT}`,
					borderRadius: 4,

					"& .MuiDataGrid-columnHeaderTitle": {
						fontFamily: "Rubik",
					},
					"& .MuiDataGrid-columnSeparator": {
						display: "none",
					},
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
