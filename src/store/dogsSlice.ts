import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dog } from "../types/dogTypes";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from "../store";

// Initial state for the dogs slice
interface DogsState {
    dogs: Dog[];
    selectedDogId: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: DogsState = {
    dogs: [],
    selectedDogId: null,
    status: "idle",
    error: null,
};

const modifiedDogs = (data: Dog[]) => {
    return data.map((dog) => {
        return { ...dog, id: dog.dogId }
    })
}

export const fetchDogs = createAsyncThunk("dogs/fetchDogs", async () => {
    const response = await apiClient.get(apiConfig.dogs);

    return modifiedDogs(response.data);
});

export const refetchDogs = createAsyncThunk("dogs/refetchDogs", async () => {
    const response = await apiClient.get(apiConfig.dogs);
    return modifiedDogs(response.data);
});

const dogsSlice = createSlice({
    name: "dogs",
    initialState,
    reducers: {
        setSelectedDogId(state, action: PayloadAction<string | null>) {
            state.selectedDogId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDogs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDogs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.dogs = action.payload;
            })
            .addCase(fetchDogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })
            .addCase(refetchDogs.fulfilled, (state, action) => {
                state.dogs = action.payload; // Update the dogs list after refetch
            });
    },
});

export const { setSelectedDogId } = dogsSlice.actions;

// Selector to get the selectedDogId
export const selectSelectedDogId = (state: RootState) => state.dogs.selectedDogId;

// Selector to get all dogs
export const selectAllDogs = (state: RootState) => state.dogs.dogs;

// Selector to get the status
export const selectDogsStatus = (state: RootState) => state.dogs.status;

// Selector to get the error
export const selectDogsError = (state: RootState) => state.dogs.error;

export default dogsSlice.reducer;