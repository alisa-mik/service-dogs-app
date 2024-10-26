import React, { Dispatch, SetStateAction, ReactNode } from "react";
import styled from "styled-components";

interface AccordionProps {
  id: string; // Unique ID for each accordion item
  title: string;
  children: ReactNode;
  isSelected: boolean;
  setSelectedId: Dispatch<SetStateAction<string | null>>; // Function to update the selected item ID
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  children,
  isSelected,
  setSelectedId,
}) => {
  const handleAccordionClick = () => {
    setSelectedId(isSelected ? null : id);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={handleAccordionClick}>{title}</AccordionHeader>
      <AccordionContent isSelected={isSelected}>{children}</AccordionContent>
    </AccordionWrapper>
  );
};

export default Accordion;

const AccordionWrapper = styled.div`
  border-radius: 16px;
`;

const AccordionHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: start;
  background-color: #f7f7f7;
`;

const AccordionContent = styled.div<{ isSelected: boolean }>`
  padding: 0 10px;
  text-align: start;
  overflow-y: auto;
  background-color: #fafafac8;
  max-height: ${({ isSelected }) => (isSelected ? "200px" : "0px")};
  transition: max-height 0.3s ease;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};
  transition: opacity 0.3s ease, max-height 0.3s ease;
`;
