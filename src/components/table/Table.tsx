import React from "react";

import {
	DataGrid,
	GridColDef,
	GridEventListener,
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";

import { Pagination } from "@mui/material";
import { noop } from "lodash";
import { TOASTED_PINE_NUT } from "../../config/colors";
import BasicCell from "./BasicCell";

interface Itable {
	columns: GridColDef[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rows: any[];
	onRowClick?: GridEventListener<"rowClick">;
	hideFooter: boolean;
}

export const Table: React.FC<Itable> = ({
	columns,
	rows,
	onRowClick = noop,
	hideFooter = false,
}) => {
	const paginationModel = { page: 0, pageSize: hideFooter ? 100 : 15 };

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

	const modifeidColumns = columns.map((r) => ({
		renderCell: BasicCell,
		...r,
	}));

	return (
		<DataGrid
			rows={rows}
			onRowClick={onRowClick}
			columns={modifeidColumns}
			disableColumnResize
			disableColumnMenu
			hideFooter={hideFooter}
			initialState={{ pagination: { paginationModel } }}
			slots={{
				pagination: CustomPagination,
			}}
			sx={{
				width: "100%",
				direction: "rtl",
				border: `solid 1px ${TOASTED_PINE_NUT}`,
				borderRadius: 4,

				"& .MuiDataGrid-main": {
					"--DataGrid-rowBorderColor": TOASTED_PINE_NUT,
				},

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
