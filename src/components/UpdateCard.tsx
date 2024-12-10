import React, { useEffect, useRef, useState } from "react";
import {
  CardContainer,
  HeaderRow,
  CategoriesContainer,
  CategoryTag,
  DogInfo,
  MainContent,
} from "./UpdateCardStyles";
import { Update } from "../types/dogTypes";
import { categoriesTranslation } from "../config/categories";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  BROWN_DARK,
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "../config/colors";
import DateText from "./commonParts/DateText";
import { Gap } from "./commonParts/Layouts";
import { useAnimate } from "framer-motion";
import AddUpdateForm from "./AddUpdateForm";
import GroupUpdateForm from "./GroupUpdateForm";
import { apiClient, apiConfig } from "../config/apiConfig";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { refetchGroups } from "../store/trainingGroupsSlice";
import { fetchUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { fetchAllUpdates } from "../store/updatesSlice";
import styled from "styled-components";

const Content = styled.div<{ $expanded: boolean; height: number }>`
  font-size: 16px;
  color: ${BROWN_DARK};
  overflow: hidden;
  height: ${({ $expanded, height }) => ($expanded ? `${height}px` : "29px")};
  transition: height 250ms ease;
  min-height: 29px;
`;

interface UpdateCardProps {
  update: Update;
  type?: "dog" | "group";
  index: number;
  editable?: boolean;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
  update,
  type = "dog",
  index,
  editable = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [scope, animate] = useAnimate();
  const [hover, setHover] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  const dispatch = useDispatch<AppDispatch>();

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
    if (!editable) return null;
    const handleDeleteClick = async (e: React.MouseEvent) => {
      if (!update.updateId) {
        console.error("Update ID is null");
        return;
      }

      try {
        const response = await apiClient.delete(
          `${apiConfig.deleteUpdate}/${update.updateId}`,
          {
            data: groupId ? { groupId } : {},
          }
        );
        enqueueSnackbar("עדכון נמחק בהצלחה", { variant: "success" });
        if (update.dogId) {
          dispatch(fetchUpdatesByDogId(update.dogId));
          dispatch(fetchAllUpdates({}));
        }
        if (update.groupId) {
          dispatch(refetchGroups());
        }
      } catch (error) {
        console.error("Error deleting update:", error);
      }
    };

    const EditForm = type === "dog" ? AddUpdateForm : GroupUpdateForm;

    return (
      <div style={{ display: hover ? "flex" : "none", gap: "2px" }}>
        <DeleteTwoToneIcon fontSize="small" onClick={handleDeleteClick} />
        <EditForm icon={"edit"} data={update} onOpen={handleOpen} />
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
        <Content ref={contentRef} $expanded={expanded} height={contentHeight}>
          {update.content}
        </Content>
      </MainContent>
    </CardContainer>
  );
};

export default UpdateCard;
