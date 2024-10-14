import React, { useState } from "react";
import styled from "styled-components";
import { useFetchDogs } from "../hooks/useFetchDogs";
import { DogCard } from "./DogCard";

export const DogList: React.FC = () => {
	const { dogs, loading, error } = useFetchDogs();
	const [searchTerm, setSearchTerm] = useState<string>("");

	if (loading) return <p>Loading dogs...</p>;
	if (error) return <p>Error: {error}</p>;

	// Filter dogs by name based on the search term
	const filteredDogs = dogs.filter((dog) =>
		dog.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Container>
			<Title>Dog Profiles</Title>

			{/* Search Input */}
			<SearchInput
				type="text"
				placeholder="Search by dog name..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{/* Gallery with a maximum width and centered content */}
			<GalleryContainer>
				<Gallery>
					{filteredDogs.length > 0 ? (
						filteredDogs.map((dog) => (
							<DogCard
								key={dog.id}
								id={dog.id}
								name={dog.name}
								age={dog.age}
								breed={dog.breed}
								image={dog.image}
							/>
						))
					) : (
						<p>No dogs found.</p>
					)}
				</Gallery>
			</GalleryContainer>
		</Container>
	);
};

// Styled components for DogList
const Container = styled.div`
	/* padding: 20px 0px; */
	font-family: Arial, sans-serif;
	text-align: center;
`;

const Title = styled.h2`
	margin-bottom: 20px;
`;

const SearchInput = styled.input`
	padding: 10px;
	width: 50%;
	margin-bottom: 20px;
	font-size: 16px;
	border-radius: 5px;
	border: 1px solid #ccc;
`;

// Container for the gallery to keep it centered
const GalleryContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const Gallery = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 15px;
	max-width: 1200px; /* Set a maximum width for the gallery */
	width: 100%; /* Ensure it takes up 100% of its container */
	min-height: 400px; /* Maintain consistent height to prevent jumping */
`;
