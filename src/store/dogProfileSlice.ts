// src/store/slices/dogProfileSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dog } from "../types/dogTypes";


interface DogProfileState {
    dog: Dog | null;
}

const initialState: DogProfileState = {
    dog: null,
};

const dogProfileSlice = createSlice({
    name: "dogProfile",
    initialState,
    reducers: {
        setDogProfile(state, action: PayloadAction<Dog>) {
            state.dog = action.payload;
        }
    },
});

export const { setDogProfile } = dogProfileSlice.actions;

export default dogProfileSlice.reducer;
