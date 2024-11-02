import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchAllUpdates, selectAllUpdates } from "../store/updatesSlice";
import UpdateCard from "../components/UpdateCard";
import { Center, WidgetBody } from "../components/commonParts/Layouts";
import { useEffect, useMemo, useState } from "react";
import { categoriesTranslation } from "../config/categories";
import { Update } from "../types/dogTypes";
import {
  fetchUpdatesByDogId,
  selectUpdatesByDogId,
} from "../store/updatesByDogIdSlice";
import CategoryFilter from "../components/UpdateCategoriesFilter";
import { AppDispatch } from "../store";

const UpdatesContainer = styled.div`
  flex: 1;
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 10px;
  width: 100%;
  overflow: auto;
`;

interface UpdatesListProps {
  dogId?: string;
}

export const UpdatesList = ({ dogId }: UpdatesListProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [displayUpdates, setDisplayUpdates] = useState<Update[]>([]);

  const updates =
    useSelector(dogId ? selectUpdatesByDogId : selectAllUpdates) || [];

  useEffect(() => {
    setDisplayUpdates(updates);
  }, [updates]);

  const filteredUpdates = useMemo(() => {
    if (selectedCategories.length === 0) {
      return [...updates].reverse();
    }
    return [...displayUpdates]
      .filter(
        (update) =>
          Array.isArray(update.categories) &&
          update.categories.some((cat) => selectedCategories.includes(cat))
      )
      .reverse();
  }, [updates, selectedCategories]);

  const categories = useMemo(() => {
    return Object.keys(categoriesTranslation);
  }, []);

  const renderUpdates = () => {
    if (filteredUpdates?.length === 0)
      return <Center>לא נמצאו עידכונים</Center>;
    return filteredUpdates.map((update, index) => (
      <UpdateCard key={update.updateId} index={index} update={update} />
    ));
  };

  return (
    <WidgetBody>
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onChange={setSelectedCategories}
      />
      <UpdatesContainer>{renderUpdates()}</UpdatesContainer>
    </WidgetBody>
  );
};
