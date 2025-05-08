import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from ".";
import { ToDo } from "../types/todoTypes";

interface ToDosState {
  todos: ToDo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ToDosState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchToDos = createAsyncThunk(
  "todos/fetchToDos",
  async ({ limit = 100 }: { limit?: number }) => {
    const response = await apiClient.get(apiConfig.todos, {
      params: { limit },
    });
    return response.data.todos as ToDo[];
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToDos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchToDos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchToDos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectAllToDos = (state: RootState) => state.todos.todos;
export const selectToDosStatus = (state: RootState) => state.todos.status;
export const selectToDosError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;
