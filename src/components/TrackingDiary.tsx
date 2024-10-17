// src/components/TrackingDiary.tsx
import React from "react";
import { Box, Typography, Chip, Paper, Stack } from "@mui/material";
import { categoryColors } from "../utils/categoryColors";

interface DiaryEntry {
	date: string;
	category: string[]; // Array of categories
	description: string;
}

interface TrackingDiaryProps {
	entries: DiaryEntry[];
}

const TrackingDiary: React.FC<TrackingDiaryProps> = ({ entries }) => {
	return (
		<Box
			sx={{
				backgroundColor: "background.paper",
				borderRadius: 2,
				boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
				padding: 3,
			}}
		>
			<Typography variant="h5" sx={{ marginBottom: 2 }}>
				Tracking Diary
			</Typography>

			<Stack spacing={3}>
				{entries.map((entry, index) => (
					<Paper
						key={index}
						elevation={3}
						sx={{
							padding: 2,
							borderRadius: 2,
						}}
					>
						{/* Top Row: Date and Category Tags */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
								marginBottom: 1,
							}}
						>
							{/* Date */}
							<Typography
								variant="body1"
								sx={{ fontWeight: "bold" }}
							>
								{entry.date}
							</Typography>

							{/* Category Tags */}
							<Box sx={{ display: "flex", flexWrap: "wrap" }}>
								{entry.category.map((cat, idx) => (
									<Chip
										key={idx}
										label={cat}
										size="small"
										color={categoryColors[cat] || "default"}
										sx={{ marginLeft: 0.5, marginTop: 0.5 }}
									/>
								))}
							</Box>
						</Box>

						{/* Description */}
						<Typography variant="body2">
							{entry.description}
						</Typography>
					</Paper>
				))}
			</Stack>

			{/* Future Dynamic Entries */}
		</Box>
	);
};

export default TrackingDiary;
