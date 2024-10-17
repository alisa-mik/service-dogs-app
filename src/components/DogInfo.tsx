// src/components/DogInfo.tsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { calculateAge } from "../utils/converts";

interface DogInfoProps {
	dogId: string;
	name: string;
	birthDate: string;
	gender: string;
	breed: string;
	momName: string;
	active: boolean;
	status: string;
	assignedFamilyId: string;
	assignedFamilyName: string;
}

const DogInfo: React.FC<DogInfoProps> = ({
	dogId,
	name,
	birthDate,
	gender,
	breed,
	momName,
	active,
	status,
	// assignedFamilyId,
	assignedFamilyName,
}) => {
	const age = calculateAge(birthDate); // Calculate age from birthDate
	const statusColor = active ? "success" : "default";

	return (
		<Box sx={{ flex: 1, width: "100%" }}>
			<Typography
				variant="h4"
				sx={{ color: "primary.main", marginBottom: 1 }}
			>
				{name}
			</Typography>

			{/* Container for two columns */}
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" }, // Stack vertically on extra-small screens
					gap: 2, // Gap between columns
				}}
			>
				{/* First Column */}
				<Box sx={{ flex: 1 }}>
					<Typography variant="body1" sx={{ marginBottom: 0.5 }}>
						<strong>Dog ID:</strong> {dogId}
					</Typography>
					<Typography variant="body1" sx={{ marginBottom: 0.5 }}>
						<strong>Breed:</strong> {breed}
					</Typography>
					<Typography variant="body1" sx={{ marginBottom: 0.5 }}>
						<strong>Age:</strong> {age}
					</Typography>
					<Typography variant="body1" sx={{ marginBottom: 0.5 }}>
						<strong>Gender:</strong> {gender}
					</Typography>
				</Box>

				{/* Second Column */}
				<Box sx={{ flex: 1 }}>
					<Typography variant="body1" sx={{ marginBottom: 0.5 }}>
						<strong>Mother's Name:</strong> {momName}
					</Typography>
					<Typography variant="body1" sx={{ marginBottom: 0.5 }}>
						<strong>Assigned Family:</strong> {assignedFamilyName}
					</Typography>
					<Typography variant="body1" sx={{ marginBottom: 0.5 }}>
						<strong>Status:</strong> {status}
					</Typography>
					<Chip
						label={active ? "Active" : "Inactive"}
						color={statusColor}
						sx={{ marginTop: 1 }}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default DogInfo;
