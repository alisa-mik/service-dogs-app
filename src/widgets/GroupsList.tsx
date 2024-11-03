// src/components/GroupList.tsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchGroups,
	selectGroupIds,
	selectSelectedGroupId,
	setSelectedGroup,
	selectGroupsStatus,
	selectGroupsError,
} from "../store/trainingGroupsSlice";
import { AppDispatch } from "../store";
import { CardContainer } from "../components/UpdateCardStyles";
import { Column } from "../components/commonParts/Layouts";
import { Label } from "../components/commonParts/Labels";
import { CircularProgress } from "@mui/material";

const GroupList1: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	// Get groupIds and groups from the store
	const selectedGroupId = useSelector(selectSelectedGroupId);
	const groupIds = useSelector(selectGroupIds);
	const groupsStatus = useSelector(selectGroupsStatus);
	const groupsError = useSelector(selectGroupsError);

	// Fetch groups when the component mounts if not already loaded
	useEffect(() => {
		if (groupsStatus === "idle") {
			dispatch(fetchGroups());
		}
	}, [groupsStatus, dispatch]);

	const handleGroupClick = (groupId: string) => {
		dispatch(setSelectedGroup(groupId));
	};

	if (groupsStatus === "loading") {
		return <CircularProgress />;
	}

	if (groupsStatus === "failed") {
		return <div>Error: {groupsError}</div>;
	}

	return (
		<Column>
			{groupIds?.map((groupId) => {
				return (
					<CardContainer
						selected={selectedGroupId === groupId}
						key={groupId}
						onClick={() => handleGroupClick(groupId)}
						style={{ cursor: "pointer", opacity: 1 }}
					>
						<Label>{groupId}</Label>
					</CardContainer>
				);
			})}
		</Column>
	);
};

export default GroupList1;
