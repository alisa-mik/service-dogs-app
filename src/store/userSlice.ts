import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAdmin: boolean;
    userId: string | null;
    userGroup: string | null;
    accessToken: string | null;
    idToken: string | null;
}

const initialState: UserState = {
    isAdmin: false,
    userId: null,
    userGroup: null,
    accessToken: null,
    idToken: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.isAdmin = action.payload.isAdmin;
            state.userId = action.payload.userId;
            state.userGroup = action.payload.userGroup;
            state.accessToken = action.payload.accessToken;
            state.idToken = action.payload.idToken;
        }
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
