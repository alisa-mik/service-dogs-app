import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dogProfileReducer from './dogProfileSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        dogProfile: dogProfileReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
