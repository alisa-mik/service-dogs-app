import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import styled from "styled-components";
import { formatDateFromSeconds, getAgeFromSeconds } from "../utils/converts";
import { BROWN_DARK } from "../config/colors";
import { WidgetTitle } from "../components/commonParts/Labels";

const Section = styled.section`
	flex: 1;
`;

const Row = styled.div`
	display: flex;
	gap: 10px;
	font-size: 16px;
`;

const Label = styled.span`
	font-weight: bold;
	color: #717171;
`;

const Value = styled.span`
	color: #333;
`;

const NoProfile = styled.div`
	text-align: center;
	color: #888;
	font-size: 1.2em;
	padding: 50px 0;
`;

const WidgetHeader = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	flex-direction: row;
	direction: rtl;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
	background-color: #fff;
`;
const Body = styled.div`
	flex: 1;
	padding: 0 10px 10px 10px;
	display: flex;
	justify-content: space-between;
	text-align: right;
	gap: 10px;
	width: 100%;
	overflow: auto;
	direction: rtl;
`;

// Reusable Label-Value Component

interface LabelValueProps {
	label: string;
	value: React.ReactNode;
}

const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => (
	<Row>
		<Label>{label}</Label>
		<Value>{value || "-"}</Value>
	</Row>
);

// Main Component

const DogDetails: React.FC = () => {
	const dog = useSelector((state: RootState) => state.dogProfile.dog);

	if (!dog) {
		return <NoProfile>No dog profile available.</NoProfile>;
	}

	const {
		dogName,
		color,
		breed,
		dogStatus,
		momName,
		dadName,
		chipNumber,
		dropDate,
		dropReason,
		groupId,
		assignedFamilyId,
		birthDate,
	} = dog;

	return (
		<>
			<WidgetHeader>
				<WidgetTitle>פרטים כלליים</WidgetTitle>
			</WidgetHeader>

			<Body>
				<Section>
					<LabelValue label="שם הכלב:" value={dogName} />
					<LabelValue label="צבע:" value={color} />
					<LabelValue label="גזע:" value={breed} />
					<LabelValue
						label="תאריך לידה:"
						value={formatDateFromSeconds(birthDate)}
					/>
					<LabelValue
						label="גיל:"
						value={getAgeFromSeconds(birthDate)}
					/>
					<LabelValue label="שם האם:" value={momName} />
					<LabelValue label="שם האב:" value={dadName} />
				</Section>
				<Section>
					<LabelValue label="קבוצה:" value={groupId} />
					<LabelValue
						label="משויך למשפחה:"
						value={assignedFamilyId}
					/>
					<LabelValue label="סטטוס:" value={dogStatus} />
					<LabelValue label="מספר שבב:" value={chipNumber} />
					<LabelValue label="תאריך פרישה:" value={dropDate} />
					<LabelValue label="סיבת פרישה:" value={dropReason} />
				</Section>
			</Body>
		</>
	);
};

export default DogDetails;
