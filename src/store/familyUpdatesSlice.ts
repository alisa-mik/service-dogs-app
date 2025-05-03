import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from ".";
import {
  FamilyUpdate,
  GearRequestContent,
  GearSummary,
  GearType,
} from "../types/familyUpdateTypes";

interface FamilyUpdatesState {
  updates: FamilyUpdate[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FamilyUpdatesState = {
  updates: [],
  status: "idle",
  error: null,
};

const gearKeys: GearType[] = [
  "leash",
  "collar",
  "easywalk",
  "bone",
  "wastebags",
  "other",
];

const initialGearSummary = (): GearSummary => {
  return gearKeys.reduce((acc, key) => {
    acc[key] = { allCount: 0, pendingCount: 0, requests: [] };
    return acc;
  }, {} as GearSummary);
};

export const fetchFamilyUpdates = createAsyncThunk(
  "familyUpdates/fetchFamilyUpdates",
  async ({
    status,
    startDate,
    endDate,
  }: {
    status: undefined | string;
    startDate: number;
    endDate: number;
  }) => {
    const response = await apiClient.get(apiConfig.familyUpdates, {
      params: { status, startDate, endDate },
    });
    return response.data as FamilyUpdate[];
  }
);

const familyUpdatesSlice = createSlice({
  name: "familyUpdates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyUpdates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFamilyUpdates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updates = action.payload;
      })
      .addCase(fetchFamilyUpdates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectFamilyUpdates = (state: RootState) =>
  state.familyUpdates.updates;

export const selectFamilyUpdatesStatus = (state: RootState) =>
  state.familyUpdates.status;

export const selectFamilyUpdatesError = (state: RootState) =>
  state.familyUpdates.error;

export const selectFoodRequestsGroupedByGroupId = createSelector(
  (state: RootState) => state.familyUpdates.updates,
  (updates) => {
    return updates
      .filter((update) => update.updateType === "foodRequest")
      .reduce((grouped: Record<string, FamilyUpdate[]>, update) => {
        const groupId = update.groupId || "ungrouped";
        if (!grouped[groupId]) {
          grouped[groupId] = [];
        }
        grouped[groupId].push(update);
        return grouped;
      }, {});
  }
);

export const selectGearSummaryByGroup = createSelector(
  (state: RootState) => state.familyUpdates.updates,
  (updates): Record<string, GearSummary> => {
    return updates
      .filter((u) => u.updateType === "gearRequest")
      .reduce<Record<string, GearSummary>>((acc, update) => {
        const {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          resolved,
          createdAt,
        } = update;

        const groupId = update.groupId ?? "ungrouped";
        const content = update.updateContent as GearRequestContent;
        const { comments } = content;

        if (!acc[groupId]) acc[groupId] = initialGearSummary();

        const extraInfo = {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          groupId,
          createdAt,
          resolved,
          comments: comments || "",
        };

        for (const key of gearKeys) {
          if (content[key]) {
            acc[groupId][key].allCount++;
            if (!resolved) acc[groupId][key].pendingCount++;
            acc[groupId][key].requests.push(extraInfo);
          }
        }

        return acc;
      }, {});
  }
);

export const selectGearSummaryFlat = createSelector(
  (state: RootState) => state.familyUpdates.updates,
  (updates): GearSummary => {
    return updates
      .filter((u) => u.updateType === "gearRequest")
      .reduce<GearSummary>((acc, update) => {
        const {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          resolved,
          createdAt,
          updateId,
        } = update;

        const groupId = update.groupId ?? "ungrouped";
        const content = update.updateContent as GearRequestContent;
        const { comments } = content;

        const extraInfo = {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          groupId,
          createdAt,
          resolved,
          updateId,
          comments: comments || "",
        };

        for (const key of gearKeys) {
          if (content[key]) {
            acc[key].allCount++;
            if (!resolved) acc[key].pendingCount++;
            acc[key].requests.push(extraInfo);
          }
        }

        return acc;
      }, initialGearSummary());
  }
);

export default familyUpdatesSlice.reducer;
