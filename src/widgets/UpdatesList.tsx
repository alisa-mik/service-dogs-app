import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllUpdates } from "../store/updatesSlice";
import UpdateCard from "../components/UpdateCard";
import {
  Center,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { useEffect, useMemo, useState } from "react";
import { categoriesTranslation } from "../config/categories";
import { Update } from "../types/dogTypes";
import { selectUpdatesByDogId } from "../store/updatesByDogIdSlice";
import CategoryFilter from "../components/UpdateCategoriesFilter";
import { WidgetTitle } from "../components/commonParts/Labels";
import { Button } from "../components/commonParts/Buttons";
import CustomDialog from "../components/CustomDialog";
import AddUpdateForm from "../components/AddUpdateForm";
import { selectSelectedDogId } from "../store/dogsSlice";

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

export const UpdatesList = () => {
  const dogId = useSelector(selectSelectedDogId);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [displayUpdates, setDisplayUpdates] = useState<Update[]>([]);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

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

  const data = {
    content: "",
    categories: [],
    date: Math.floor(new Date().getTime() / 1000),
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>
          <div>עדכונים</div>
          <div>{`(${updates.length || 0})`}</div>
        </WidgetTitle>
        {dogId && <Button onClick={() => setOpen(true)}>הוסף עדכון</Button>}
        <CustomDialog onClose={handleClose} open={open} title="הוספת כלב חדש">
          <AddUpdateForm onClose={handleClose} data={data} />
        </CustomDialog>
      </WidgetHeader>
      <WidgetBody>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onChange={setSelectedCategories}
        />
        <UpdatesContainer>{renderUpdates()}</UpdatesContainer>
      </WidgetBody>
    </>
  );
};
