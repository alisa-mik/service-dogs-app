import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFamilyUpdates,
  selectFamilyUpdates,
  selectFamilyUpdatesError,
  selectFamilyUpdatesStatus,
} from "../store/familyUpdatesSlice";
import { AppDispatch } from "../store";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { BROWN_DARK } from "../config/colors";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { FamilyUpdateItem } from "../components/FamilyUpdates/FamilyUpdateItem";
import { FamilyUpdate } from "../types/familyUpdateTypes";
import {
  groupByKey,
  resolveFamilyUpdate,
  updateTypeTitles,
} from "../utils/familyUpdatesUtils";

export const FamilyUpdates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updates = useSelector(selectFamilyUpdates);
  const status = useSelector(selectFamilyUpdatesStatus);
  const error = useSelector(selectFamilyUpdatesError);

  const [startDate, setStartDate] = useState<number>(1740787200000); // Example: May 1, 2025
  const [endDate, setEndDate] = useState<number>(1745548800000); // Example: May 2, 2025

  const [viewMode, setViewMode] = useState<"all" | "group" | "type">("all");

  useEffect(() => {
    handleFetchUpdates();
  }, []);

  const groupedByType = useMemo(
    () => groupByKey(updates, "updateType"),
    [updates]
  );
  const groupedByGroupId = useMemo(
    () => groupByKey(updates, "groupId"),
    [updates]
  );

  const sortedUpdates = useMemo(() => {
    return [...updates].sort((a, b) => b.createdAt - a.createdAt);
  }, [updates]);

  const handleFetchUpdates = () => {
    const params = {
      status: "Pending",
      startDate,
      endDate,
    };
    dispatch(fetchFamilyUpdates(params));
  };

  const handleResolve = (id: string) => {
    resolveFamilyUpdate(id);
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>כל הפניות האחרונות</WidgetTitle>
        <Button
          variant="contained"
          onClick={handleFetchUpdates}
          disabled={status === "loading"}
        >
          רענן בקשות
        </Button>
      </WidgetHeader>
      <WidgetBody style={{ gap: "5px", justifyContent: "flex-start" }}>
        <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
          <Button
            variant={viewMode === "all" ? "contained" : "outlined"}
            onClick={() => setViewMode("all")}
          >
            הצג הכל
          </Button>
          <Button
            variant={viewMode === "group" ? "contained" : "outlined"}
            onClick={() => setViewMode("group")}
          >
            לפי קבוצה
          </Button>
          <Button
            variant={viewMode === "type" ? "contained" : "outlined"}
            onClick={() => setViewMode("type")}
          >
            לפי סוג פנייה
          </Button>
        </Box>
        {status === "loading" && <CircularProgress />}
        {status === "failed" && <Typography color="error">{error}</Typography>}

        {status === "succeeded" && updates.length > 0 && (
          <div>
            {viewMode === "all" &&
              sortedUpdates.map((update) => (
                <FamilyUpdateItem
                  key={update.updateId}
                  update={update}
                  onResolve={handleResolve}
                  viewMode={viewMode}
                />
              ))}

            {viewMode === "group" &&
              Object.entries(groupedByGroupId).map(
                ([groupId, groupUpdates]) => (
                  <Box key={groupId} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: BROWN_DARK }}>
                      {groupId}
                    </Typography>
                    {groupUpdates.map((update) => (
                      <FamilyUpdateItem
                        key={update.updateId}
                        update={update}
                        onResolve={handleResolve}
                        viewMode={viewMode}
                      />
                    ))}
                  </Box>
                )
              )}

            {viewMode === "type" &&
              Object.entries(groupedByType).map(([type, typeUpdates]) => (
                <div key={type}>
                  <Typography variant="h6" sx={{ color: BROWN_DARK }}>
                    {updateTypeTitles[type]}
                  </Typography>
                  {typeUpdates.map((update) => (
                    <FamilyUpdateItem
                      key={update.updateId}
                      update={update}
                      onResolve={handleResolve}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ))}
          </div>
        )}

        {status === "succeeded" && updates.length === 0 && (
          <Typography style={{ color: BROWN_DARK }}>
            אין פניות פתוחות
          </Typography>
        )}
      </WidgetBody>
    </>
  );
};
