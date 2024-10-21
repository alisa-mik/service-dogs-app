import React, { useState } from "react";
import styled from "styled-components";
import { useFetchDogs } from "../hooks/useFetchDogs";
import { useNavigate } from "react-router-dom";
import { formatDateFromSeconds, getAgeFromSeconds } from "../utils/converts";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
	text-align: center;
	padding: 20px;
	height: 100%;
`;

const SearchInput = styled.input`
	padding: 10px;
	width: 50%;
	font-size: 14px;
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
	height: 80%;
	overflow: auto;
	border-collapse: collapse;
	text-align: right;
`;

const StyledThead = styled.thead`
	background-color: #f2f2f2;
`;

const StyledTh = styled.th`
	font-weight: 500;
	font-size: 14px;
	border: 1px solid #ddd;
	padding: 12px 8px;
`;

const StyledTd = styled.td`
	font-size: 14px;
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

interface ActiveIndecatorProps {
	active?: boolean;
}
const ActiveIndecator = styled.div<ActiveIndecatorProps>`
	height: 10px;
	width: 10px;
	border-radius: 50%;
	background-color: ${(props) => (props.active ? "green" : "red")};
`;

export const DogListTable: React.FC = () => {
	const { dogs, loading, error } = useFetchDogs();
	console.log({ dogs });

	const [searchTerm, setSearchTerm] = useState<string>("");

	const navigate = useNavigate();

	if (loading) return <CircularProgress />;
	if (error) return <p>Error: {error}</p>;

	const filteredDogs = dogs.filter((dog) =>
		dog.dogName.toLowerCase().includes(searchTerm.toLowerCase())
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
							<StyledTh>מין</StyledTh>
							<StyledTh>צבע</StyledTh>
							<StyledTh>גזע</StyledTh>
							<StyledTh>תאריך לידה</StyledTh>
							<StyledTh>גיל</StyledTh>
							<StyledTh>קבוצה</StyledTh>
							<StyledTh>שם האם</StyledTh>
							<StyledTh>פעיל</StyledTh>
							<StyledTh>סטטוס</StyledTh>
							<StyledTh>משויך למשפחה</StyledTh>
						</tr>
					</StyledThead>
					<tbody>
						{filteredDogs.map((dog) => {
							const {
								dogId,
								dogName,
								gender,
								color,
								breed,
								birthDate,
								momName,
								active,
								dogStatus,
								groupId,
								assignedFamilyId,
							} = dog;
							return (
								<StyledTr
									key={dogId}
									onClick={() => handleSelectDog(dogId)}
								>
									<StyledTd>{dogName}</StyledTd>
									<StyledTd>{gender}</StyledTd>
									<StyledTd>{color}</StyledTd>
									<StyledTd>{breed}</StyledTd>
									<StyledTd>
										{birthDate
											? formatDateFromSeconds(birthDate)
											: "-"}
									</StyledTd>
									<StyledTd>
										{birthDate
											? getAgeFromSeconds(birthDate)
											: "-"}
									</StyledTd>
									<StyledTd>{groupId}</StyledTd>
									<StyledTd>{momName}</StyledTd>
									<StyledTd>
										<ActiveIndecator active={active} />
									</StyledTd>
									<StyledTd>{dogStatus}</StyledTd>
									<StyledTd>
										{assignedFamilyId ? "כן" : "לא"}
									</StyledTd>
								</StyledTr>
							);
						})}
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
