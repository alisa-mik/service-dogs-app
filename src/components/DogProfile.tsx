import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Example data, replace this with your actual data source (e.g., API call)
const dogData = [
	{
		id: "1",
		name: "Buddy",
		breed: "Cocker Spaniel",
		age: 3,
		image: "https://images.dog.ceo/breeds/spaniel-cocker/n02102318_11221.jpg",
	},
	// Other dogs...
];

export const DogProfile: React.FC = () => {
	const { id } = useParams<{ id: string }>(); // Get the dog ID from the URL
	// const dog = dogData.find((dog) => dog.id === id); // Find the dog by ID
	const dog = dogData[0];

	// if (!dog) {
	// 	return <p>Dog not found</p>;
	// }

	return (
		<FullScreenContainer>
			<ProfileContent>
				<ProfileImage src={dog.image} alt={dog.name} />
				<ProfileDetails>
					<h1>{dog.name}</h1>
					<p>{id}</p>
					<Detail>
						<strong>Breed:</strong> {dog.breed}
					</Detail>
					<Detail>
						<strong>Age:</strong> {dog.age} years
					</Detail>
				</ProfileDetails>
			</ProfileContent>
		</FullScreenContainer>
	);
};

// Styled components for full-screen DogProfile
const FullScreenContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw; /* Full width of the viewport */
	height: 100vh; /* Full height of the viewport */
	background-color: #f0f0f0;
	padding: 20px;
	box-sizing: border-box; /* Ensure padding is included in width/height calculations */
`;

const ProfileContent = styled.div`
	background-color: white;
	border-radius: 20px;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	padding: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 600px; /* Constrain max width for better readability on larger screens */
	text-align: center;
`;

const ProfileImage = styled.img`
	width: 200px;
	height: 200px;
	border-radius: 50%; /* Circle shape */
	object-fit: cover;
	margin-bottom: 20px;
	border: 6px solid #ddd;
`;

const ProfileDetails = styled.div`
	h1 {
		font-size: 32px;
		margin-bottom: 20px;
		color: #333;
	}

	strong {
		color: #555;
		font-weight: bold;
	}
`;

const Detail = styled.p`
	font-size: 18px;
	color: #777;
	margin: 5px 0;
`;
export default DogProfile;
