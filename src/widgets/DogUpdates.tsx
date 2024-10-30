import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import AddUpdateModal from "../components/AddUpdateModal";
import styled from "styled-components";
import { Button } from "../components/commonParts/Buttons";
import { WidgetTitle } from "../components/commonParts/Labels";

import { selectDogId } from "../store/dogProfileSlice";
import { selectUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { UpdatesList } from "./UpdatesList";

const WidgetHeader = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  direction: rtl;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #fff;
`;

export default function DogUpdates() {
  const updates = useSelector(selectUpdatesByDogId);
  const dogId = useSelector(selectDogId);
  const [open, setOpen] = useState(false);
  console.log({ updates });

  //   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const categories = useMemo(() => {
  //     return Object.keys(categoriesTranslation);
  //   }, []);

  //   const filteredUpdates = useMemo(() => {
  //     if (selectedCategories.length === 0) {
  //       return [...updates].reverse();
  //     }
  //     return [...updates]
  //       .filter(
  //         (update) =>
  //           Array.isArray(update.categories) &&
  //           update.categories.some((cat) => selectedCategories.includes(cat))
  //       )
  //       .reverse();
  //   }, [updates, selectedCategories]);

  //   const renderUpdates = () => {
  //     if (filteredUpdates.length === 0) return <Center>לא נמצאו עידכונים</Center>;

  //     return filteredUpdates.map((update) => (
  //       <UpdateCard key={update.updateId} update={update} showDogInfo={false} />
  //     ));
  //   };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>עדכונים</WidgetTitle>

        {/* <SquareButton padding="0px" weight={500} onClick={handleOpen}>
          <Label style={{ cursor: "pointer" }}>+</Label>
        </SquareButton> */}
        <Button onClick={handleOpen}>הוסף עדכון</Button>
      </WidgetHeader>

      <UpdatesList dogId={dogId} />
      {/* <Body>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onChange={setSelectedCategories}
        />
        <UpdatesContainer>{renderUpdates()}</UpdatesContainer>
      </Body> */}

      <AddUpdateModal dogId={dogId} open={open} handleClose={handleClose} />
    </>
  );
}
