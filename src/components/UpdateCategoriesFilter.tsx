// src/components/CategoryFilter.tsx
import React from "react";
import styled from "styled-components";
import UpdateTag from "./UpdateTag";
import { CATEGORY_COLORS } from "../config/categories";

interface CategoryFilterProps {
	categories: string[];
	selectedCategories: string[];
	onChange: (selected: string[]) => void;
}

const FilterContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	padding: 10px;
`;

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	categories,
	selectedCategories,
	onChange,
}) => {
	const handleTagClick = (category: string) => {
		console.log({ CATEGORY_COLORS });

		if (selectedCategories.includes(category)) {
			onChange(selectedCategories.filter((cat) => cat !== category));
		} else {
			onChange([...selectedCategories, category]);
		}
	};

	return (
		<FilterContainer>
			{categories.map((category) => (
				<UpdateTag
					key={category}
					label={category}
					color={CATEGORY_COLORS[category] || "#757575"}
					selected={selectedCategories.includes(category)}
					onClick={() => handleTagClick(category)}
				/>
			))}
		</FilterContainer>
	);
};

export default CategoryFilter;
