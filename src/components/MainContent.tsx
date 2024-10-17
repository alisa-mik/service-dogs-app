// src/components/MainContent.tsx
import { ReactNode } from "react";
import { Box } from "@mui/material";

interface MainContentProps {
	children: ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
	return (
		<Box
			sx={{
				flex: 4, // This allows the main content to take the remaining space
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 3,
				overflow: "auto",
				backgroundColor: "#e3f4f1", // Light background
			}}
		>
			{children}
		</Box>
	);
};

export default MainContent;
