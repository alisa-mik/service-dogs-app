// src/components/UpdateCard.tsx
import React, { useState } from "react";
import {
	CardContainer,
	HeaderRow,
	CategoriesContainer,
	CategoryTag,
	DateText,
	Content,
	ToggleIndicator,
} from "./UpdateCardStyles";
import { Update } from "../types/dogTypes";
import {
	categoriesTranslation,
	CATEGORY_COLORS,
	DEFAULT_CATEGORY_COLOR,
} from "../config/categories";

interface UpdateCardProps {
	update: Update;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		setExpanded(!expanded);
		console.log(`Card ${update.updateId} expanded: ${!expanded}`);
	};

	const formattedDate = new Date(update.date).toLocaleDateString("he-IL", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<CardContainer onClick={toggleExpanded}>
			<HeaderRow>
				<DateText>{formattedDate}</DateText>
				<CategoriesContainer>
					{update.categories.map((category) => {
						const color =
							CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR;
						return (
							<CategoryTag key={category} color={color}>
								{categoriesTranslation[category]}
							</CategoryTag>
						);
					})}
				</CategoriesContainer>
			</HeaderRow>
			<Content expanded={expanded}>{update.content}</Content>
			{!expanded && update.content.split("\n").length > 4 && (
				<ToggleIndicator>המשך לקרוא...</ToggleIndicator>
			)}
			{expanded && <ToggleIndicator>הסתר</ToggleIndicator>}
		</CardContainer>
	);
};

export default UpdateCard;
