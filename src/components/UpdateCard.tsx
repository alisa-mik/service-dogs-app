// src/components/UpdateCard.tsx
import React, { useEffect, useState } from "react";
import {
  CardContainer,
  HeaderRow,
  CategoriesContainer,
  CategoryTag,
  Content,
  ToggleIndicator,
  DogInfo,
  MainContent,
} from "./UpdateCardStyles";
import { Update } from "../types/dogTypes";
import { categoriesTranslation } from "../config/categories";
import EditIcon from "@mui/icons-material/Edit";
import {
  BROWN_DARK,
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "../config/colors";
import DateText from "./commonParts/DateText";
import { Gap } from "./commonParts/Layouts";
import HoveredButtons from "./commonParts/HoveredBox";
import { useAnimate } from "framer-motion";
interface UpdateCardProps {
  update: Update;
  index: number;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    scope.current &&
      animate(scope.current, { opacity: 1 }, { duration: 0.5 + 0.5 * index });
  }, [scope]);

  const { dogDetails } = update;

  const toggleExpanded = () => {
    setExpanded(!expanded);
    // console.log(`Card ${update.updateId} expanded: ${!expanded}`);
  };

  const renderCategories = () => {
    return (
      <Gap>
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
      </Gap>
    );
  };

  const renderButtons = () => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <HoveredButtons>
        <EditIcon onClick={handleClick} style={{ color: BROWN_DARK }} />
      </HoveredButtons>
    );
  };

  const renderDogInfo = () => {
    if (!dogDetails) return undefined;
    return (
      <DogInfo>
        <img
          style={{ height: "60px", borderRadius: "16px" }}
          src={dogDetails.image}
        />
        <span>{dogDetails.dogName}</span>
      </DogInfo>
    );
  };

  return (
    <CardContainer ref={scope} onClick={toggleExpanded}>
      {/* {renderButtons()} */}
      {renderDogInfo()}
      <MainContent>
        <HeaderRow>
          <DateText date={update.date} />
          {renderCategories()}
        </HeaderRow>
        <Content expanded={expanded}>{update.content}</Content>
      </MainContent>
    </CardContainer>
  );
};

export default UpdateCard;
