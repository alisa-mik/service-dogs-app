import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dog } from "../types/dogTypes";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from "../store"; // Import RootState type

interface DogProfileState {
    dog: Dog | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: DogProfileState = {
    dog: null,
    status: "idle",
    error: null,
};

export const fetchDogById = createAsyncThunk(
    "dogs/fetchDogById",
    async (dogId: string, { getState }) => {
        const { dogProfile } = getState() as RootState;

        if (dogProfile.dog && dogProfile.dog.dogId === dogId) {
            return dogProfile.dog;
        }

        // If not, fetch it from the API
        const response = await apiClient.get(`${apiConfig.dogs}/${dogId}`);
        return response.data;
    }
);

// Optionally, you can provide a refetch action to force fetching fresh data
export const refetchDogById = createAsyncThunk(
    "dogs/refetchDogById",
    async (dogId: string) => {
        const response = await apiClient.get(`${apiConfig.dogs}/${dogId}`);
        return response.data;
    }
);

const dogProfileSlice = createSlice({
    name: "dogProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDogById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDogById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.dog = action.payload;
            })
            .addCase(fetchDogById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })
            .addCase(refetchDogById.fulfilled, (state, action) => {
                state.dog = action.payload;
            });
    },
});

export const selectDogProfile = (state: RootState) => state.dogProfile.dog ?? {};
export const selectDogStatus = (state: RootState) => state.dogProfile.status;
export const selectDogError = (state: RootState) => state.dogProfile.error;

export default dogProfileSlice.reducer;
