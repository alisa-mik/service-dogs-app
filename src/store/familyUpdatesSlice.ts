import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from ".";
import { FamilyUpdate } from "../types/familyUpdateTypes";

interface FamilyUpdatesState {
  updates: FamilyUpdate[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FamilyUpdatesState = {
  updates: [],
  status: "idle",
  error: null,
};

export const fetchFamilyUpdates = createAsyncThunk(
  "familyUpdates/fetchFamilyUpdates",
  async ({
    status,
    startDate,
    endDate,
  }: {
    status: string;
    startDate: number;
    endDate: number;
  }) => {
    const response = await apiClient.get(apiConfig.familyUpdates, {
      params: { status, startDate, endDate },
    });
    return response.data as FamilyUpdate[];
  }
);

const familyUpdatesSlice = createSlice({
  name: "familyUpdates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyUpdates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFamilyUpdates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updates = action.payload;
      })
      .addCase(fetchFamilyUpdates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectFamilyUpdates = (state: RootState) =>
  state.familyUpdates.updates;

export const selectFamilyUpdatesStatus = (state: RootState) =>
  state.familyUpdates.status;

export const selectFamilyUpdatesError = (state: RootState) =>
  state.familyUpdates.error;

export default familyUpdatesSlice.reducer;
