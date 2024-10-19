import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dog } from "../types/dogTypes";
import { apiConfig } from "../config/apiConfig";
import axios from "axios";
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
        const { dogProfile } = getState() as RootState; // Type the getState as RootState

        if (dogProfile.dog && dogProfile.dog.dogId === dogId) {
            return dogProfile.dog; // Return cached dog if it exists
        }

        const response = await axios.get(`${apiConfig.dogByIdEndPoint}/${dogId}`);
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
            });
    },
});

export default dogProfileSlice.reducer;
