import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from "../store";
import { reverse } from "lodash";
import { selectFamilies } from "./familiesSlice";
import { MedicalInfo } from "../types/dogTypes";

export interface Dog {
  dogId: string;
  dogName: string;
  assignedFamily: string;
  breed: string;
  birthDate: string;
  image: string;
  gender: string;
  medicalInfo: MedicalInfo;
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
export const fetchGroups = createAsyncThunk(
  "trainingGroups/fetchGroups",
  async () => {
    const response = await apiClient.get(apiConfig.trainingGroups);
    return response.data; // The data is { groupIds: [], groups: {} }
  }
);

export const refetchGroups = createAsyncThunk(
  "trainingGroups/refetchGroups",
  async () => {
    const response = await apiClient.get(apiConfig.trainingGroups);
    return response.data;
  }
);

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
    setFirstGroup(state) {
      if (!state.selectedGroupId && state.groupIds)
        state.selectedGroupId = state.groupIds[ 0 ];
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
        // Filter active groups and their IDs
        const activeGroupIds = action.payload.groupIds.filter((id: string) =>
          action.payload.groups[ id ] && action.payload.groups[ id ].active
        );

        // Sort activeGroupIds by startDate in ascending order
        activeGroupIds.sort((a: string, b: string) => {
          const groupA = action.payload.groups[ a ];
          const groupB = action.payload.groups[ b ];
          return groupA.startDate - groupB.startDate;
        });

        // Create new groups object with only active groups
        const activeGroups: { [ groupId: string ]: Group } = {};
        activeGroupIds.forEach((id: string) => {
          activeGroups[ id ] = action.payload.groups[ id ];
        });

        state.groupIds = reverse(activeGroupIds);
        state.groups = activeGroups;
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
        // Filter active groups and their IDs
        const activeGroupIds = action.payload.groupIds.filter((id: string) =>
          action.payload.groups[ id ] && action.payload.groups[ id ].active
        );

        // Sort activeGroupIds by startDate in ascending order
        activeGroupIds.sort((a: string, b: string) => {
          const groupA = action.payload.groups[ a ];
          const groupB = action.payload.groups[ b ];
          return groupA.startDate - groupB.startDate;
        });

        // Create new groups object with only active groups
        const activeGroups: { [ groupId: string ]: Group } = {};
        activeGroupIds.forEach((id: string) => {
          activeGroups[ id ] = action.payload.groups[ id ];
        });

        state.groupIds = activeGroupIds;
        state.groups = activeGroups;
        state.error = null;
      })
      .addCase(refetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

// Export actions
export const { setSelectedGroup, clearSelectedGroup, setFirstGroup } =
  trainingGroupsSlice.actions;

// Selectors

// Select groupIds array
export const selectGroupIds = (state: RootState) =>
  state.trainingGroups.groupIds;

// Select groups object
export const selectGroups = (state: RootState) => state.trainingGroups.groups;

// Select selectedGroupId
export const selectSelectedGroupId = (state: RootState) =>
  state.trainingGroups.selectedGroupId;

// Select selectedGroup object
export const selectSelectedGroup = createSelector(
  [ selectGroups, selectSelectedGroupId ],
  (groups, selectedGroupId) =>
    selectedGroupId ? groups[ selectedGroupId ] : null
);

// Select status
export const selectGroupsStatus = (state: RootState) =>
  state.trainingGroups.status;

// Select error
export const selectGroupsError = (state: RootState) =>
  state.trainingGroups.error;

// Select all groups as an array
export const selectAllGroups = createSelector(
  [ selectGroups ],
  (groups) => Object.values(groups)
);

export const selectGroupById = (groupId: string) => (state: RootState) =>
  state.trainingGroups.groups[ groupId ];

export const selectAllGroupDogs = createSelector([ selectAllGroups ], (groups) =>
  groups.flatMap((group) => group.dogs || [])
);

// Select all updates from all groups (includes both updates and meetings)
export const selectAllUpdates = createSelector([ selectAllGroups ], (groups) =>
  groups.flatMap((group) => group.updates || [])
);
export const selectSelectedGroupUpdates = createSelector(
  [ selectSelectedGroup ],
  (selectedGroup) => (selectedGroup ? selectedGroup.updates : [])
);

export const selectSelectedGroupDogs = createSelector(
  [ selectSelectedGroup, selectFamilies ],
  (selectedGroup, families) => {
    if (!selectedGroup || !selectedGroup.dogs) {
      return [];
    }

    // Map the dogs in the selected group with their family details
    return selectedGroup.dogs.map((dog) => {
      const familyDetails = families[ dog.assignedFamily ] || null;
      return {
        ...dog,
        family: familyDetails, // Attach the full family details
      };
    });
  }
);

export default trainingGroupsSlice.reducer;
