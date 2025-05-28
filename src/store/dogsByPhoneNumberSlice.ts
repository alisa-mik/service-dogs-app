import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from ".";

// Use a new type name to avoid conflicts with `Dog` or `DogBasic`
export interface FamilyDogEntry {
  dogId: string;
  familyName?: string;
  contactName?: string;
  dogName: string;
  familyId: string;
  groupId: string;
}

interface DogsByPhoneState {
  dogs: FamilyDogEntry[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DogsByPhoneState = {
  dogs: [],
  status: "idle",
  error: null,
};

export const fetchDogsByPhoneNumber = createAsyncThunk(
  "dogsByPhoneNumber/fetchDogsByPhoneNumber",
  async (phoneNumber: string) => {
    const response = await apiClient.post(apiConfig.dogsByPhoneNumber, {
      phoneNumber,
    });
    return response.data as FamilyDogEntry[];
  }
);

const dogsByPhoneNumberSlice = createSlice({
  name: "dogsByPhoneNumber",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogsByPhoneNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDogsByPhoneNumber.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dogs = action.payload;
      })
      .addCase(fetchDogsByPhoneNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectDogsByPhoneNumber = (state: RootState) =>
  state.dogsByPhoneNumber.dogs;

export const selectDogsByPhoneNumberStatus = (state: RootState) =>
  state.dogsByPhoneNumber.status;

export const selectDogsByPhoneNumberError = (state: RootState) =>
  state.dogsByPhoneNumber.error;

export default dogsByPhoneNumberSlice.reducer;
