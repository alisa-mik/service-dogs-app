// src/components/UpdateItem.tsx
import React from "react";
import {
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineOppositeContent,
} from "@mui/lab";
import { Paper, Typography, Chip, Box } from "@mui/material";
import { Update } from "../types/dogTypes";

interface UpdateItemProps {
	update: Update;
}

const categoryColors: {
	[key: string]:
		| "default"
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
} = {
	Health: "success",
	Training: "primary",
	Behavior: "warning",
	Status: "info",
};

const UpdateItem = ({ update }: UpdateItemProps) => {
	const updateDate = new Date(update.timestamp);

	return (
		<TimelineItem>
			<TimelineOppositeContent color="text.secondary">
				<Typography variant="caption" color="text.secondary">
					{updateDate.toLocaleDateString()} at{" "}
					{updateDate.toLocaleTimeString()} &bull;{" "}
					{update.author.userName}
				</Typography>
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineDot color="primary" />
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent>
				<Paper elevation={3} sx={{ padding: 2 }}>
					<Box sx={{ marginY: 1 }}>
						{update.category.map((cat: string) => (
							<Chip
								key={cat}
								label={cat}
								sx={{ marginRight: 1 }}
								color={categoryColors[cat] || "default"}
							/>
						))}
					</Box>
					<Typography
						variant="body1"
						sx={{ marginBottom: 1, lineHeight: 1.6 }}
					>
						{update.content}
					</Typography>
				</Paper>
			</TimelineContent>
		</TimelineItem>
	);
};

export default UpdateItem;
