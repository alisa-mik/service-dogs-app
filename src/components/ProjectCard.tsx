// ProjectCard.tsx

import React from "react";
import styled from "styled-components";
import { Project } from "../types/projectTypes";

const CardContainer = styled.div`
	padding: 16px;
	border-radius: 8px;
	/* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
	/* background-color: #ffffff; */
`;

const ProjectTitle = styled.h2`
	font-size: 20px;
	color: #333;
	margin: 0;
`;

const Description = styled.p`
	font-size: 14px;
	color: #555;
`;

const DatesContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 14px;
	color: #666;
`;

const DateLabel = styled.span`
	font-weight: bold;
	color: #333;
`;

interface ProjectCardProps {
	project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const { projectName, description, startDate, endDate } = project;

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString();
	};

	return (
		<CardContainer>
			<Description>{description}</Description>
			<DatesContainer>
				{startDate && (
					<div>
						<DateLabel>Start Date: </DateLabel>
						{formatDate(startDate)}
					</div>
				)}
				{endDate && (
					<div>
						<DateLabel>End Date: </DateLabel>
						{formatDate(endDate)}
					</div>
				)}
			</DatesContainer>
		</CardContainer>
	);
};

export default ProjectCard;
