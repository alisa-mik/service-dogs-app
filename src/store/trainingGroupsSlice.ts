

import { createAsyncThunk, createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from "../store";
import { reverse } from "lodash";
import { selectFamilies } from "./familiesSlice";

export interface Dog {
  dogId: string;
  dogName: string;
  assignedFamily: string;
  breed: string;
  birthDate: string;
  image: string;
  gender: string;
}

export interface Update {
  updateId: string;
  type: "meeting" | "update";
  date: number;
  content: string;
  attendance?: string[];
  groupId?: string;
}


export interface Group {
  groupId: string;
  startDate: number;
  endDate: number;
  active: boolean;
  dogIds: string[];
  dogs: Dog[];
  familyIds: string[];
  updates: Update[];
}


interface GroupsState {
  groupIds: string[];
  groups: { [ groupId: string ]: Group };
  selectedGroupId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GroupsState = {
  groupIds: [],
  groups: {},
  selectedGroupId: null,
  status: "idle",
  error: null,
};

// Async thunks remain the same
export const fetchGroups = createAsyncThunk("trainingGroups/fetchGroups", async () => {
  const response = await apiClient.get(apiConfig.trainingGroups);
  return response.data; // The data is { groupIds: [], groups: {} }
});

export const refetchGroups = createAsyncThunk("trainingGroups/refetchGroups", async () => {
  const response = await apiClient.get(apiConfig.trainingGroups);
  return response.data;
});

const trainingGroupsSlice = createSlice({
  name: "trainingGroups",
  initialState,
  reducers: {
    setSelectedGroup(state, action: PayloadAction<string>) {
      state.selectedGroupId = action.payload;
    },
    clearSelectedGroup(state) {
      state.selectedGroupId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGroups actions
      .addCase(fetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupIds = reverse(action.payload.groupIds);
        state.groups = action.payload.groups;
        state.selectedGroupId = action.payload.groupIds.at(0)
        state.error = null;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      // refetchGroups actions
      .addCase(refetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupIds = action.payload.groupIds;
        state.groups = action.payload.groups;
        state.error = null;
      })
      .addCase(refetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

// Export actions
export const { setSelectedGroup, clearSelectedGroup } = trainingGroupsSlice.actions;

// Selectors

// Select groupIds array
export const selectGroupIds = (state: RootState) => state.trainingGroups.groupIds;

// Select groups object
export const selectGroups = (state: RootState) => state.trainingGroups.groups;

// Select selectedGroupId
export const selectSelectedGroupId = (state: RootState) => state.trainingGroups.selectedGroupId;

// Select selectedGroup object
export const selectSelectedGroup = createSelector(
  [ selectGroups, selectSelectedGroupId ],
  (groups, selectedGroupId) => (selectedGroupId ? groups[ selectedGroupId ] : null)
);

// Select status
export const selectGroupsStatus = (state: RootState) => state.trainingGroups.status;

// Select error
export const selectGroupsError = (state: RootState) => state.trainingGroups.error;

// Select all groups as an array
export const selectAllGroups = createSelector(
  [ selectGroups ],
  (groups) => Object.values(groups)
);

// Select specific group by ID
export const selectGroupById = (state: RootState, groupId: string) =>
  state.trainingGroups.groups[ groupId ];

export const selectAllGroupDogs = createSelector(
  [ selectAllGroups ],
  (groups) => groups.flatMap((group) => group.dogs || [])
);

// Select all updates from all groups (includes both updates and meetings)
export const selectAllUpdates = createSelector(
  [ selectAllGroups ],
  (groups) => groups.flatMap((group) => group.updates || [])
);
export const selectSelectedGroupUpdates = createSelector(
  [ selectSelectedGroup ],
  (selectedGroup) => (selectedGroup ? selectedGroup.updates : [])
);

export const selectSelectedGroupDogs = createSelector(
  [selectSelectedGroup, selectFamilies],
  (selectedGroup, families) => {
    if (!selectedGroup || !selectedGroup.dogs) {
      return [];
    }

    // Map the dogs in the selected group with their family details
    return selectedGroup.dogs.map((dog) => {
      const familyDetails = families[dog.assignedFamily] || null;
      return {
        ...dog,
        family: familyDetails, // Attach the full family details
      };
    });
  }
);


export default trainingGroupsSlice.reducer;
