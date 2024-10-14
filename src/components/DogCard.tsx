import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface DogCardProps {
	id: string;
	name: string;
	age: number;
	breed: string;
	image: string;
}

export const DogCard: React.FC<DogCardProps> = ({
	id,
	name,
	age,
	breed,
	image,
}) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/dogs/${id}`); // Navigate to the specific dog profile
	};

	return (
		<Card onClick={handleCardClick}>
			<ImageWrapper>
				<Image src={image} alt={name} />
			</ImageWrapper>
			<DogName>{name}</DogName>
			<DogDetails>
				Breed: {breed} <br /> Age: {age}
			</DogDetails>
		</Card>
	);
};

// Styled components for DogCard
const Card = styled.div`
	background-color: #f8f9fa;
	border: 1px solid #ddd;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 200px; /* Fixed width */
	height: 230px; /* Fixed height */
	padding: 10px;
	cursor: pointer;
	text-align: center;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
	height: 150px; /* Fixed height for image */
	overflow: hidden;
	border-radius: 8px;
	margin-bottom: 10px;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 8px;
`;

const DogName = styled.p`
	font-size: 18px;
	font-weight: bold;
	margin: 8px 0 4px 0;
`;

const DogDetails = styled.p`
	color: #555;
	font-size: 14px;
	text-align: center;
	margin-top: 4px;
`;
