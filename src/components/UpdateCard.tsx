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
  DogInfo,
  MainContent,
} from "./UpdateCardStyles";
import { Update } from "../types/dogTypes";
import {
  categoriesTranslation,
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "../config/categories";

interface UpdateCardProps {
  update: Update;
  showDogInfo: boolean;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update, showDogInfo }) => {
  const [expanded, setExpanded] = useState(false);

  const { dogDetails } = update;

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
      {showDogInfo && dogDetails && (
        <DogInfo>
          <img style={{ height: "50px" }} src={dogDetails.image} />
          <span>{dogDetails.dogName}</span>
        </DogInfo>
      )}

      <MainContent>
        <HeaderRow>
          <DateText>{formattedDate}</DateText>
          <CategoriesContainer>
            {update.categories.map((category) => {
              const color = CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR;
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
      </MainContent>
    </CardContainer>
  );
};

export default UpdateCard;
