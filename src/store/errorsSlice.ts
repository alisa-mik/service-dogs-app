import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { uniqueId } from 'lodash';
import { RootState } from '.';

interface ErrorsState {
    errors: { [ id: string ]: AxiosError };
    authError: boolean;
}

const initialState: ErrorsState = {
    errors: {},
    authError: false
};

const userSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<AxiosError>) {
            const error = action.payload;
            if (error.status === 401) {
                state.authError = true;
            } else {
                const id = uniqueId()
                state.errors[ id ] = error;
            }
        },
        removeErrorById(state, action: PayloadAction<string>) {
            const id = action.payload;
            delete state.errors[ id ]
        }
    },
});

export const { setError, removeErrorById } = userSlice.actions;

export const getAllErrors = (state: RootState) => state.errors.errors;
export const getAuthError = (state: RootState) => state.errors.authError;


export default userSlice.reducer;
