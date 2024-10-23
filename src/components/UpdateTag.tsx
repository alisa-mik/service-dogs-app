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
	padding: 5px 0px;
	border-radius: 20px;
	text-align: center;
	width: 100px;
	font-size: 14px;
	cursor: pointer;
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
