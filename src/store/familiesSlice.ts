import { createAsyncThunk, createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from "../store";
import { selectAllDogs } from "./dogsSlice";

export interface Family {
  familyId: string;
  familyName: string;
  contactName: string;
  contactInfo: ContactInfo;
  dogIds: string[];
  active: boolean;
  joinedAt: number;
  generalInfo: string;
}

export interface ContactInfo {
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
}

interface FamiliesState {
  families: { [familyId: string]: Family };
  selectedFamilyId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FamiliesState = {
  families: {},
  selectedFamilyId: null,
  status: "idle",
  error: null,
};

export const fetchFamilies = createAsyncThunk("families/fetchFamilies", async () => {
  const response = await apiClient.get(apiConfig.families);
  return response.data; 
});

export const refetchFamilies = createAsyncThunk("families/refetchFamilies", async () => {
  const response = await apiClient.get(apiConfig.families);
  return response.data;
});

const familiesSlice = createSlice({
  name: "families",
  initialState,
  reducers: {
    setSelectedFamily(state, action: PayloadAction<string>) {
      state.selectedFamilyId = action.payload;
    },
    clearSelectedFamily(state) {
      state.selectedFamilyId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchFamilies actions
      .addCase(fetchFamilies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFamilies.fulfilled, (state, action) => {
        const families = action.payload;
        const last = Object.keys(families).length - 1;
        state.status = "succeeded";
        state.families = families;
        state.selectedFamilyId = last > -1  ? Object.keys(families)[last] : null;
        state.error = null;
      })
      .addCase(fetchFamilies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      // refetchFamilies actions
      .addCase(refetchFamilies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refetchFamilies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.families = action.payload;
        state.error = null;
      })
      .addCase(refetchFamilies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { setSelectedFamily, clearSelectedFamily } = familiesSlice.actions;

export const selectFamilies = (state: RootState) => state.families.families;

export const selectFamiliesArray = (state: RootState) =>  Object.values(state.families.families).map((f) => ({...f, id:f.familyId })) 

export const selectSelectedFamilyId = (state: RootState) => state.families.selectedFamilyId;

export const selectSelectedFamilyBasic = createSelector(
  [selectFamilies, selectSelectedFamilyId],
  (families, selectedFamilyId) => (selectedFamilyId ? families[selectedFamilyId] : null)
);

export const selectSelectedFamily = createSelector(
  [selectSelectedFamilyBasic, (state: RootState) => state.families.selectedFamilyId, selectAllDogs],
  (family, selectedFamilyId, allDogs) => {
    if (!selectedFamilyId) {
      return null;
    }

    const assignedDogs = allDogs.filter((dog) => dog.assignedFamily === selectedFamilyId);

    return {
      ...family,
      assignedDogs,
    };
  }
);

export const selectFamiliesStatus = (state: RootState) => state.families.status;

export const selectFamiliesError = (state: RootState) => state.families.error;

export const selectAllFamilies = createSelector(
  [selectFamilies],
  (families) => Object.values(families)
);

export const selectFamilyById = (familyId: string) => (state: RootState) => {
  return state.families.families[familyId] || null;
};
export default familiesSlice.reducer;
