import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Update } from "../types/dogTypes"; // Assuming you have the Update interface
import { apiConfig } from "../config/apiConfig";
// import { RootState } from "../store";

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

export const fetchUpdatesByDogId = createAsyncThunk(
    "updatesByDogId/fetchUpdatesByDogId",
    async (dogId: string) => {
        const response = await axios.get(`${apiConfig.updatesByDogIdEndPoint}/${dogId}`);
        console.log(response.data);

        return response.data;
    }
);

const updatesByDogIdSlice = createSlice({
    name: "updatesByDogId",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpdatesByDogId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUpdatesByDogId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.updates = action.payload; // Store fetched updates
            })
            .addCase(fetchUpdatesByDogId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null; // Handle error safely
            });
    },
});

export default updatesByDogIdSlice.reducer;
