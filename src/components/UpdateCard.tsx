// src/components/UpdateCard.tsx
import React from "react";
import { Update } from "../types/dogTypes";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

interface UpdateCardProps {
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

const UpdateCard: React.FC<UpdateCardProps> = ({ update }) => {
	const updateDate = new Date(update.timestamp);

	return (
		<Card
			variant="elevation"
			elevation={3}
			sx={{
				width: "600px",
				marginBottom: 3,
				borderRadius: 2, // Rounded edges
				boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Custom box shadow
			}}
		>
			<CardContent>
				<Typography
					variant="body1"
					sx={{ marginBottom: 2, lineHeight: 1.6 }}
				>
					{update.content}
				</Typography>
				<Box sx={{ marginBottom: 2 }}>
					{update.category.map((cat) => (
						<Chip
							key={cat}
							label={cat}
							sx={{ marginRight: 1, marginBottom: 1 }}
							color={categoryColors[cat] || "default"}
							size="small"
						/>
					))}
				</Box>
				<Typography variant="caption" color="textSecondary">
					{updateDate.toLocaleDateString()} at{" "}
					{updateDate.toLocaleTimeString()} &bull;{" "}
					{update.author.userName}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default UpdateCard;
