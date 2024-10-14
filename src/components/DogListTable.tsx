import React, { useState } from "react";
import styled from "styled-components";
import { useFetchDogs } from "../hooks/useFetchDogs";
import {
	Avatar,
	Table,
	TableBody,
	TableCell as MUITableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	// Typography,
	IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getAgeFromSeconds } from "../utils/converts";
import { useNavigate } from "react-router-dom";

export const DogListTable: React.FC = () => {
	const { dogs, loading, error } = useFetchDogs();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const navigate = useNavigate();

	if (loading) return <p>Loading dogs...</p>;
	if (error) return <p>Error: {error}</p>;

	// Filter dogs by name based on the search term
	const filteredDogs = dogs.filter((dog) =>
		dog.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectDog = (id: string) => {
		navigate(`/dogs/${id}`);
	};

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

			{/* Wrapping TableContainer inside Paper */}
			<Paper
				style={{
					marginTop: "20px",
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
				}}
			>
				<TableContainer
					style={{ height: "300px" }}
					className="hide-scrollbar"
				>
					<Table>
						<TableHead>
							<TableRow>
								{/* <TableHeader>ID</TableHeader> */}
								<TableHeader>Name</TableHeader>
								<TableHeader>Age</TableHeader>
								{/* <TableHeader>Breed</TableHeader> */}
								<TableHeader>Status</TableHeader>
								<TableHeader>Actions</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredDogs.length > 0 ? (
								filteredDogs.map((dog) => (
									<TableRow
										key={dog.id}
										hover
										onClick={() => handleSelectDog(dog.id)}
									>
										{/* <MUITableCell>{dog.id}</MUITableCell> */}
										<NameTableCell>
											<Avatar
												src={dog.image}
												alt={dog.name}
											/>
											{dog.name}
										</NameTableCell>
										<MUITableCell>
											{getAgeFromSeconds(dog.birthDate)}
										</MUITableCell>
										<MUITableCell
											style={{
												color: dog.active
													? "green"
													: "red",
												fontWeight: "bold",
											}}
										>
											{dog.active ? "Active" : "Inactive"}
										</MUITableCell>
										<MUITableCell>
											<IconButton color="primary">
												<Edit />
											</IconButton>
											<IconButton color="secondary">
												<Delete />
											</IconButton>
										</MUITableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<MUITableCell
										colSpan={6}
										style={{ textAlign: "center" }}
									>
										No dogs found.
									</MUITableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
};

// Styled Components
const Container = styled.div`
	font-family: Arial, sans-serif;
	text-align: center;
	padding: 20px;
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

const TableHeader = styled(MUITableCell)`
	font-weight: bold;
	text-align: left;
	padding: 16px;
	background-color: #f4f6f8;
	color: #333;
	font-size: 14px;
`;
const NameTableCell = styled(MUITableCell)`
	display: flex;
	gap: 15px;
	font-weight: bold;
	align-items: center;
`;
