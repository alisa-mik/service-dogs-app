// src/components/commonParts/Tag.tsx
import React from "react";
import styled, { css } from "styled-components";

interface TagProps {
	label: string;
	color: string;
	selected: boolean;
	onClick: () => void;
}

const StyledTag = styled.span<{ selected: boolean; color: string }>`
	display: inline-flex;
	align-items: center;
	padding: 5px 10px;
	border-radius: 20px;
	font-size: 14px;
	cursor: pointer;
	user-select: none;
	transition: background-color 0.3s, color 0.3s;

	${({ selected, color }) =>
		selected
			? css`
					background-color: ${color};
					color: #fff;
			  `
			: css`
					background-color: #7f7f7f; /* Light grey for unselected */
					color: #fff;
			  `}

	&:hover {
		opacity: 0.8;
	}
`;

const UpdateTag: React.FC<TagProps> = ({ label, color, selected, onClick }) => {
	return (
		<StyledTag selected={selected} color={color} onClick={onClick}>
			{label}
		</StyledTag>
	);
};

export default UpdateTag;
