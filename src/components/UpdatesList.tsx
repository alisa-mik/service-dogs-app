// src/components/UpdatesList.tsx
import React from "react";
import { Update } from "../types/dogTypes";
import { Box, Typography } from "@mui/material";
import UpdateCard from "./UpdateCard";

interface UpdatesListProps {
	updates: Update[];
}

const UpdatesList = ({ updates }: UpdatesListProps) => {
	// Sort updates in reverse chronological order
	const sortedUpdates = [...updates].sort(
		(a, b) =>
			new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);

	return (
		<Box sx={{ marginTop: 4 }}>
			{sortedUpdates.length > 0 ? (
				sortedUpdates.map((update, index) => (
					<UpdateCard key={index} update={update} />
				))
			) : (
				<Typography variant="body1">
					No updates available for the selected date range.
				</Typography>
			)}
		</Box>
	);
};

export default UpdatesList;
