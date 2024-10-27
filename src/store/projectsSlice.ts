import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../types/projectTypes"; // Assuming you have a types file for project types
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from "./index";

// Initial state for the projects slice
interface ProjectsState {
    projects: Project[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    selectedProject: Project | null; // Add selectedProject property
}

const initialState: ProjectsState = {
    projects: [],
    status: "idle",
    error: null,
    selectedProject: null, // Initialize selectedProject as null
};

// Optional: Modify project data if necessary (e.g., add unique identifiers or handle field transformations)
const modifiedProjects = (data: Project[]) => {
    return data.map((project) => ({
        ...project,
        id: project.projectId, // Add `id` field from `projectId` if needed
    }));
};

// Async thunk to fetch all projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
    const response = await apiClient.get(apiConfig.projects); // Assumes apiConfig has a `projects` endpoint
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
    reducers: {
        setSelectedProject: (state, action: PayloadAction<string | null>) => {
            // Set selectedProject based on projectId or reset to null
            state.selectedProject = action.payload
                ? state.projects.find((project) => project.projectId === action.payload) || null
                : null;
        },
    },
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

export const { setSelectedProject } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectsStatus = (state: RootState) => state.projects.status;
export const selectSelectedProject = (state: RootState) => state.projects.selectedProject;

export default projectsSlice.reducer;
