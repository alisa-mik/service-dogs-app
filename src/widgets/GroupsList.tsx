import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uniq } from "lodash";

import {
  selectGroupIds,
  selectSelectedGroupId,
  setSelectedGroup,
  clearSelectedGroup,
} from "../store/trainingGroupsSlice";
import { AppDispatch } from "../store";
import { Column } from "../components/commonParts/Layouts";
import { Label } from "../components/commonParts/Labels";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import styled from "styled-components";
import { BEAMING_SUN, TOASTED_PINE_NUT, WHITE } from "../config/colors";

export const CardSimpleContainer = styled.div`
  direction: rtl;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid ${TOASTED_PINE_NUT};
  background: ${WHITE};
  gap: 10px;
`;

export const CardContainer = styled(CardSimpleContainer)<{
  selected?: boolean;
}>`
  cursor: pointer;
  background: ${({ selected }) => (selected ? BEAMING_SUN : WHITE)};
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

function arrayMove<T>(items: T[], oldIndex: number, newIndex: number): T[] {
  // Ensure the indices are within bounds
  if (
    oldIndex < 0 ||
    oldIndex >= items.length ||
    newIndex < 0 ||
    newIndex >= items.length
  ) {
    throw new Error("Invalid indices");
  }

  const result = [...items]; // Create a shallow copy of the array
  const [movedItem] = result.splice(oldIndex, 1); // Remove item from oldIndex
  result.splice(newIndex, 0, movedItem); // Insert item at newIndex

  return result;
}

interface SortableListProps {
  items: string[]; // Define the type of `items` as an array of strings
}

const GroupList: React.FC<{ showAllOption: boolean }> = ({ showAllOption }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Get groupIds and groups from the store
  const selectedGroupId = useSelector(selectSelectedGroupId);
  const groupIds = useSelector(selectGroupIds);

  const [sortedList, setSortedList] = useState<string[]>([]);

  useEffect(() => {
    const savedOrderString = localStorage.getItem("sortedGroups") || "[]";
    const savedOrder = JSON.parse(savedOrderString);
    const uniqList = uniq([...savedOrder, ...groupIds]);
    setSortedList(uniqList);
  }, [groupIds]);

  const handleGroupClick = (groupId: string) => {
    dispatch(setSelectedGroup(groupId));
  };

  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const sorted = arrayMove<string>(sortedList, oldIndex, newIndex);

    localStorage.setItem("sortedGroups", JSON.stringify(sorted));
    setSortedList(sorted);
  };

  const DragHandle = SortableHandle(() => (
    <DragIndicatorIcon fontSize="small" sx={{ cursor: "grab" }} />
  ));

  const SortableItem = SortableElement<{ groupId: string }>(
    ({ groupId }: { groupId: string }) => {
      const isAll = groupId === "all";
      const label = isAll ? "כל הקבוצות" : groupId;
      const selected = isAll ? !selectedGroupId : selectedGroupId === groupId;

      return (
        <CardContainer
          selected={selected}
          key={groupId}
          onClick={() =>
            isAll ? dispatch(clearSelectedGroup()) : handleGroupClick(groupId)
          }
        >
          {!isAll && <DragHandle />}
          <Label>{label}</Label>
        </CardContainer>
      );
    }
  );

  const SortableList = SortableContainer<SortableListProps>(
    ({ items }: SortableListProps) => {
      const addAllItem = () => {
        if (!showAllOption) return [];

        return [<SortableItem key={`all`} index={-1} groupId={`all`} />];
      };

      return (
        <Column>
          {[
            ...addAllItem(),
            ...items.map((groupId: string, index: number) => (
              <SortableItem
                key={`group-${groupId}`}
                index={index}
                groupId={groupId}
              />
            )),
          ]}
        </Column>
      );
    }
  );

  return (
    <SortableList items={sortedList} onSortEnd={handleSortEnd} useDragHandle />
  );
};

export default GroupList;
