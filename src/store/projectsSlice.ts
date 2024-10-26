import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Project } from "../types/projectTypes.ts"; // Assuming you have a types file for project types
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from "./index.ts";

// Initial state for the projects slice
interface ProjectsState {
    projects: Project[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProjectsState = {
    projects: [],
    status: "idle",
    error: null,
};

// Optional: Modify project data if necessary (e.g., add unique identifiers or handle field transformations)
const modifiedProjects = (data: Project[]) => {
    return data.map((project) => {
        return { ...project, id: project.projectId }; // Add `id` field from `projectId` if needed
    });
};

// Async thunk to fetch all projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
    
    const response = await apiClient.get(apiConfig.projects); // Assumes apiConfig has a `projects` endpoint
    console.log(response.data.projects);
    return modifiedProjects(response.data.projects);
});

// Async thunk to refetch projects (optional for cases when refreshing data)
export const refetchProjects = createAsyncThunk("projects/refetchProjects", async () => {
    const response = await apiClient.get(apiConfig.projects);
    return modifiedProjects(response.data.projects);
});

// Create the projects slice
const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })
            .addCase(refetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload; // Update the projects list after refetch
            });
    },
});

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectsStatus = (state: RootState) => state.projects.status;

export default projectsSlice.reducer;
