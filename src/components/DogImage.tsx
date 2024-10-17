// src/components/DogImage.tsx
import { Box } from "@mui/material";

interface DogImageProps {
	imageUrl: string;
	altText: string;
}

const DogImage = ({ imageUrl, altText }: DogImageProps) => {
	return (
		<Box
			sx={{
				width: 150,
				height: 150,
				borderRadius: "50%",
				overflow: "hidden",
				boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
				marginRight: 3,
				flexShrink: 0,
			}}
		>
			<img
				src={imageUrl}
				alt={altText}
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/>
		</Box>
	);
};

export default DogImage;
