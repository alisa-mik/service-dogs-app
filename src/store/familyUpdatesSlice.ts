import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiClient, apiConfig } from "../config/apiConfig";
import { RootState } from ".";
import {
  FamilyUpdate,
  FoodRequestContent,
  FoodSummary,
  GearRequestContent,
  GearSummary,
  GearType,
} from "../types/familyUpdateTypes";
import { gearMap } from "../utils/familyUpdatesUtils";

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

const gearKeys = Object.keys(gearMap) as GearType[];

const initialGearSummary = (): GearSummary => {
  return gearKeys.reduce((acc, key) => {
    acc[key] = { allCount: 0, pendingCount: 0, requests: [] };
    return acc;
  }, {} as GearSummary);
};

const initialFoodSummary = (): FoodSummary => ({
  salmon: { allCount: 0, pendingCount: 0, requests: [] },
  bison: { allCount: 0, pendingCount: 0, requests: [] },
  unknown: { allCount: 0, pendingCount: 0, requests: [] },
});

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

export const selectUnresolvedFamilyUpdatesCount = createSelector(
  (state: RootState) => state.familyUpdates.updates,
  (updates) => updates.filter((u) => !u.resolved).length
);

export const selectResolvedFamilyUpdatesCount = createSelector(
  (state: RootState) => state.familyUpdates.updates,
  (updates) => updates.filter((u) => u.resolved).length
);

export const selectFoodSummaryByGroup = createSelector(
  (state: RootState) => state.familyUpdates.updates,
  (updates): Record<string, FoodSummary> => {
    return updates
      .filter((u) => u.updateType === "foodRequest")
      .reduce<Record<string, FoodSummary>>((acc, update) => {
        const {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          resolved,
          updateId,
          createdAt,
          updateContent,
          groupId = "ungrouped",
        } = update;

        const content = update.updateContent as FoodRequestContent;
        const { comments } = content;

        const foodType =
          (updateContent as FoodRequestContent).foodType || "unknown";

        if (!acc[groupId]) {
          acc[groupId] = initialFoodSummary();
        }

        const requestInfo = {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          groupId,
          updateId,
          createdAt,
          resolved,
          comments: comments || "",
        };

        acc[groupId][foodType].allCount++;
        if (!resolved) acc[groupId][foodType].pendingCount++;
        acc[groupId][foodType].requests.push(requestInfo);

        return acc;
      }, {});
  }
);

export const selectFlatFoodSummary = createSelector(
  (state: RootState) => state.familyUpdates.updates,
  (updates): FoodSummary => {
    return updates
      .filter((u) => u.updateType === "foodRequest")
      .reduce<FoodSummary>((acc, update) => {
        const {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          resolved,
          updateId,
          createdAt,
          groupId = "ungrouped",
        } = update;

        const content = update.updateContent as FoodRequestContent;
        const { comments } = content;
        const foodType = (content as FoodRequestContent).foodType || "unknown";

        // Initialize foodType section if missing
        if (!acc[foodType]) {
          acc[foodType] = {
            allCount: 0,
            pendingCount: 0,
            requests: [],
          };
        }

        const requestInfo = {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          groupId,
          updateId,
          createdAt,
          resolved,
          comments: comments || "",
        };

        acc[foodType].allCount++;
        if (!resolved) acc[foodType].pendingCount++;
        acc[foodType].requests.push(requestInfo);

        return acc;
      }, initialFoodSummary());
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
          updateId,
          createdAt,
          groupId = "ungrouped",
        } = update;

        const content = update.updateContent as GearRequestContent;
        const { comments } = content;

        if (!acc[groupId]) acc[groupId] = initialGearSummary();

        const requestInfo = {
          dogId,
          dogName,
          familyId,
          contactName,
          familyName,
          groupId,
          updateId,
          createdAt,
          resolved,
          comments: comments || "",
        };

        for (const key of gearKeys) {
          if (content[key]) {
            acc[groupId][key].allCount++;
            if (!resolved) acc[groupId][key].pendingCount++;
            acc[groupId][key].requests.push(requestInfo);
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
