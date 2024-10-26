// Accordion.tsx

import { useState, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Project } from "../../types/projectTypes";

const AccordionContainer = styled.div`
direction: rtl;
	border: 1px solid #ddd;
	border-radius: 8px;
	margin-bottom: 8px;
	overflow: hidden;
	/* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
`;

const AccordionHeader = styled.div<{ isOpen: boolean }>`
	background-color: ${({ isOpen }) => (isOpen ? "#f0f0f0" : "#ffffff")};
	cursor: pointer;
	padding: 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	color: #333;
`;

const AccordionContent = styled.div<{ isOpen: boolean; maxHeight: number }>`
	height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : "0px")};
	overflow: hidden;
    text-align: start;
	transition: height 0.3s ease;
	background-color: #fafafa;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
	display: inline-block;
	transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(180deg)")};
	transition: transform 0.2s ease;
`;

interface AccordionProps {
	title: string;
    isSelected: boolean;
    projectId: string;
    setSelectedProject: Dispatch<SetStateAction<string>>
	children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, projectId, isSelected, setSelectedProject }) => {
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<AccordionContainer>
			<AccordionHeader isOpen={isSelected} onClick={() =>setSelectedProject(projectId)}>
				<span>{title}</span>
				<Arrow isOpen={isSelected}>{'<'}</Arrow>
			</AccordionHeader>
			<AccordionContent
				isOpen={isSelected}
				maxHeight={contentRef.current?.scrollHeight || 0}
				ref={contentRef}
			>
				{children}
			</AccordionContent>
		</AccordionContainer>
	);
};

export default Accordion;
