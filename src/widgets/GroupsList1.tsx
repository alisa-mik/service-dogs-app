// src/components/GroupList.tsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups, selectAllGroups } from "../store/trainingGroupsSlice";
import { AppDispatch } from "../store";

const GroupList1: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const groups = useSelector(selectAllGroups);

  console.log({ groups });

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <div>
      {groups?.map((group) => (
        <div key={group.groupId}>{group.groupId}</div>
      ))}
    </div>
  );
};

export default GroupList1;
