import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Dog } from "../types/dogTypes";
import { apiConfig } from "../config/apiConfig";

// Initial state for the dogs slice
interface DogsState {
    dogs: Dog[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: DogsState = {
    dogs: [],
    status: "idle",
    error: null,
};

const modifiedDogs = (data: Dog[]) => {
    return data.map((dog) => {
        return { ...dog, id: dog.dogId }
    })
}

export const fetchDogs = createAsyncThunk("dogs/fetchDogs", async () => {
    const response = await axios.get(apiConfig.dogs);


    return modifiedDogs(response.data);
});

export const refetchDogs = createAsyncThunk("dogs/refetchDogs", async () => {
    const response = await axios.get(apiConfig.dogs);
    return modifiedDogs(response.data);
});

const dogsSlice = createSlice({
    name: "dogs",
    initialState,
    reducers: {},
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

export default dogsSlice.reducer;
