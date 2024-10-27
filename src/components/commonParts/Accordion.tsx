import React, { ReactNode } from "react";
import styled from "styled-components";

interface AccordionProps {
  id: string;
  title: string;
  children: ReactNode;
  isSelected: boolean;
  setSelectedId: (id: string | null) => void;
}

interface AccordionContentProps {
  isSelected: boolean;
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

const AccordionContent = styled.div<AccordionContentProps>`
  padding: 0 10px;
  text-align: start;
  overflow-y: auto;
  background-color: #fafafac8;
  max-height: ${({ isSelected }) => (isSelected ? "200px" : "0px")};
  transition: max-height 0.3s ease;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};
  transition: opacity 0.3s ease, max-height 0.3s ease;
`;
