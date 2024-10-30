import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from ".";
import { Update } from "../types/dogTypes"; // Assuming this includes dog details

interface UpdatesState {
    updates: Update[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UpdatesState = {
    updates: [],
    status: "idle",
    error: null,
};

interface FetchAllUpdatesArgs {
    startDate?: string;
    endDate?: string;
}


export const fetchAllUpdates = createAsyncThunk(
    "allUpdates/fetchAllUpdates",
    async ({ startDate, endDate }: FetchAllUpdatesArgs) => {
        const queryParams = new URLSearchParams();
        if (startDate) queryParams.append("startDate", startDate);
        if (endDate) queryParams.append("endDate", endDate);

        const response = await apiClient.get(`${apiConfig.updates}?${queryParams}`);
        return response.data.updates; // Access the `updates` array directly
    }
);

const updatesSlice = createSlice({
    name: "updates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUpdates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllUpdates.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.updates = action.payload;
            })
            .addCase(fetchAllUpdates.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            });
    },
});

export const selectAllUpdates = (state: RootState) => state.updates.updates || [];
export default updatesSlice.reducer;