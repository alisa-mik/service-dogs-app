// src/slices/groupsSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from ".";

// Define the Group interface based on your data structure
interface Dog {
    dogId: string;
    dogName: string;
    assignedFamily: string;
    breed: string;
    birthDate: string;
    image: string;
    gender: string;
    // Any other fields
}

interface Group {
    groupId: string;
    startDate: number;
    endDate: number;
    active: boolean;
    dogIds: string[];
    dogs: Dog[]; // Include the dogs field
    familyIds: string[];
    meetings: Meeting[];
    updates: Update[];
    // Include any additional fields returned by the API
}

interface Meeting {
    date: number;
    attendance: string[];
    content: string;
}

interface Update {
    updateId: string;
    date: string;
}

// Initial state for the groups slice
interface GroupsState {
    groups: Group[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: GroupsState = {
    groups: [],
    status: "idle",
    error: null,
};

// If you need to modify the groups data before storing it
const modifiedGroups = (data: Group[]) => {
    return data.map((group) => {
        return { ...group, id: group.groupId };
    });
};

// Async thunk to fetch groups
export const fetchGroups = createAsyncThunk("trainingGroups/fetchGroups", async () => {
    const response = await apiClient.get(apiConfig.trainingGroups);
    return modifiedGroups(response.data.groups); // Adjusted to match the new response
});

// Async thunk to refetch groups
export const refetchGroups = createAsyncThunk("trainingGroups/refetchGroups", async () => {
    const response = await apiClient.get(apiConfig.trainingGroups);
    return modifiedGroups(response.data.groups);
});

const trainingGroupsSlice = createSlice({
    name: "trainingGroups",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroups.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.groups = action.payload;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })
            .addCase(refetchGroups.fulfilled, (state, action) => {
                state.groups = action.payload; // Update the groups list after refetch
            });
    },
});

export const selectAllGroups = (state: RootState) => state.trainingGroups.groups || [];

export default trainingGroupsSlice.reducer;
