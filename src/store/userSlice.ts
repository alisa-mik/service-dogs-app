import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAdmin: boolean;
    userId: string | null;
    userGroup: string | null;
}

const initialState: UserState = {
    isAdmin: false,
    userId: null,
    userGroup: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ isAdmin: boolean; userId: string; userGroup: string }>) {
            state.isAdmin = action.payload.isAdmin;
            state.userId = action.payload.userId;
            state.userGroup = action.payload.userGroup;
        },
        clearUser(state) {
            state.isAdmin = false;
            state.userId = null;
            state.userGroup = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
