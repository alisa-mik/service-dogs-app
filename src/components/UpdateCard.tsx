import React, { useEffect, useState } from "react";
import {
  CardContainer,
  HeaderRow,
  CategoriesContainer,
  CategoryTag,
  Content,
  DogInfo,
  MainContent,
} from "./UpdateCardStyles";
import { Update } from "../types/dogTypes";
import { categoriesTranslation } from "../config/categories";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from "../config/colors";
import DateText from "./commonParts/DateText";
import { Gap } from "./commonParts/Layouts";
import { useAnimate } from "framer-motion";
import AddUpdateForm from "./AddUpdateForm";
interface UpdateCardProps {
  update: Update;
  index: number;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [scope, animate] = useAnimate();
  const [hover, setHover] = useState(false);

  const modifiedUpdate = update.attendance
    ? { ...update, categories: ["groupTraining"] }
    : update;

  useEffect(() => {
    scope.current &&
      animate(scope.current, { opacity: 1 }, { duration: 0.5 + 0.5 * index });
  }, [scope]);

  const { dogDetails, groupId } = update;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleOpen = () => {
    setHover(false);
  };

  const renderCategories = () => {
    return (
      <Gap>
        {modifiedUpdate.categories && (
          <CategoriesContainer>
            {modifiedUpdate.categories.map((category) => {
              const color = CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR;
              return (
                <CategoryTag key={category} color={color}>
                  {categoriesTranslation[category]}
                </CategoryTag>
              );
            })}
          </CategoriesContainer>
        )}
      </Gap>
    );
  };

  const renderButtons = () => {
    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <div style={{ display: hover ? "contents" : "none" }}>
        <DeleteTwoToneIcon onClick={handleDeleteClick} />
        <AddUpdateForm icon={"edit"} data={update} onOpen={handleOpen} />
      </div>
    );
  };

  const renderDogInfo = () => {
    if (!dogDetails) return undefined;
    if (groupId)
      return (
        <DogInfo>
          <span>קבוצה</span>
          {groupId}
        </DogInfo>
      );
    return (
      <DogInfo>
        <span
          style={{
            padding: "15px",
            backgroundColor: "#efefef",
            borderRadius: "8px",
          }}
        >
          {dogDetails.dogName}
        </span>
      </DogInfo>
    );
  };

  return (
    <CardContainer
      ref={scope}
      onClick={toggleExpanded}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {renderDogInfo()}
      <MainContent>
        <HeaderRow>
          <DateText date={update.date} />
          <div style={{ display: "flex", gap: "10px" }}>
            {renderCategories()}
            {renderButtons()}
          </div>
        </HeaderRow>
        <Content $expanded={expanded}>{update.content}</Content>
      </MainContent>
    </CardContainer>
  );
};

export default UpdateCard;
