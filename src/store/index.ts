import { configureStore } from '@reduxjs/toolkit';
import errorsReducer from './errorsSlice';
import userReducer from './userSlice';
import dogsReducer from './dogsSlice';
import dogProfileReducer from './dogProfileSlice';
import updatesByDogIdReducer from './updatesByDogIdSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        dogs: dogsReducer,
        errors: errorsReducer,
        dogProfile: dogProfileReducer,
        updatesByDogId: updatesByDogIdReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
