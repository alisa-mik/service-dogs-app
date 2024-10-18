import React, { useState } from "react";
import styled from "styled-components";
import { useFetchDogs } from "../hooks/useFetchDogs";
import { useNavigate } from "react-router-dom";
import { getAgeFromSeconds } from "../utils/converts";

const Container = styled.div`
	font-family: Arial, sans-serif;
	text-align: center;
	padding: 20px;
	height: 100%;
`;

const SearchInput = styled.input`
	padding: 10px;
	width: 50%;
	font-size: 16px;
	border-radius: 5px;
	border: 1px solid #ccc;
`;

const TableContainer = styled.div`
	width: 100%;
	overflow-x: auto;
	direction: rtl;
`;

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: right;
`;

const StyledThead = styled.thead`
	background-color: #f2f2f2;
`;

const StyledTh = styled.th`
	border: 1px solid #ddd;
	padding: 12px 8px;
`;

const StyledTd = styled.td`
	border: 1px solid #ddd;
	padding: 8px;
`;

const StyledTr = styled.tr`
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #e0e0e0;
	}
`;

export const DogListTable: React.FC = () => {
	const { dogs, loading, error } = useFetchDogs();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const navigate = useNavigate();

	if (loading) return <p>טוען רשימת כלבים...</p>;
	if (error) return <p>Error: {error}</p>;

	const filteredDogs = dogs.filter((dog) =>
		dog.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectDog = (id: string) => {
		navigate(id);
	};

	const renderTable = () => {
		return (
			<TableContainer>
				<StyledTable>
					<StyledThead>
						<tr>
							<StyledTh>שם הכלב</StyledTh>
							<StyledTh>גיל</StyledTh>
							<StyledTh>פעיל</StyledTh>
							{/* <StyledTh>סטטוס</StyledTh>
							<StyledTh>משויך למשפחה</StyledTh>
							<StyledTh>קבוצה</StyledTh> */}
						</tr>
					</StyledThead>
					<tbody>
						{filteredDogs.map((dog) => (
							<StyledTr
								key={dog.id}
								onClick={() => handleSelectDog(dog.id)}
							>
								<StyledTd>{dog.name}</StyledTd>
								<StyledTd>
									{getAgeFromSeconds(dog.birthDate)}
								</StyledTd>
								<StyledTd>
									{dog.active ? "פעיל" : " לא פעיל"}
								</StyledTd>
								{/* <StyledTd>{dog.status}</StyledTd>
								<StyledTd>{dog.assignedToFamily}</StyledTd>
								<StyledTd>{dog.group}</StyledTd> */}
							</StyledTr>
						))}
					</tbody>
				</StyledTable>
			</TableContainer>
		);
	};

	return (
		<Container>
			<div
				style={{
					display: "flex",
					gap: "10px",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<SearchInput
					style={{ direction: "rtl" }}
					type="text"
					placeholder="חיפוש לפי שם הכלב"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{renderTable()}
			</div>
		</Container>
	);
};
