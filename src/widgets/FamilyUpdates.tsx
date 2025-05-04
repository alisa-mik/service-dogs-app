import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectFamilyUpdates,
  selectFamilyUpdatesError,
  selectFamilyUpdatesStatus,
} from "../store/familyUpdatesSlice";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { BROWN_DARK } from "../config/colors";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { FamilyUpdateItem } from "../components/FamilyUpdates/FamilyUpdateItem";
import { FamilyUpdate } from "../types/familyUpdateTypes";
import { groupByKey, updateTypeTitles } from "../utils/familyUpdatesUtils";
import { selectSelectedGroupId } from "../store/trainingGroupsSlice";

export const FamilyUpdates = () => {
  const updates = useSelector(selectFamilyUpdates);
  const status = useSelector(selectFamilyUpdatesStatus);
  const error = useSelector(selectFamilyUpdatesError);

  const [updatesByGroup, setUpdatesByGroup] = useState<FamilyUpdate[]>([]);

  const [viewMode, setViewMode] = useState<"all" | "type">("all");
  const selectedGroupId = useSelector(selectSelectedGroupId);

  useEffect(() => {
    const updatesFilteredByGroup = updates
      .filter((update) => {
        if (selectedGroupId) return update.groupId === selectedGroupId;
        else return updates;
      })
      .filter(
        (update) => !["gearRequest", "foodRequest"].includes(update.updateType)
      ); // TODO: TEMP
    setUpdatesByGroup(updatesFilteredByGroup);
  }, [updates, selectedGroupId]);

  const groupedByType = useMemo(
    () => groupByKey(updatesByGroup, "updateType"),
    [updatesByGroup]
  );

  const sortedUpdates = useMemo(() => {
    return [...updatesByGroup].sort((a, b) => b.createdAt - a.createdAt);
  }, [updatesByGroup]);

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>כל הפניות האחרונות</WidgetTitle>
      </WidgetHeader>
      <WidgetBody style={{ gap: "5px", justifyContent: "flex-start" }}>
        <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
          <Button
            variant={viewMode === "all" ? "contained" : "outlined"}
            onClick={() => setViewMode("all")}
          >
            לפי תאריך
          </Button>
          <Button
            variant={viewMode === "type" ? "contained" : "outlined"}
            onClick={() => setViewMode("type")}
          >
            לפי סוג פנייה
          </Button>
        </Box>
        {status === "loading" && updates.length === 0 && <CircularProgress />}
        {status === "failed" && <Typography color="error">{error}</Typography>}

        {updates.length > 0 && (
          <div>
            {viewMode === "all" &&
              sortedUpdates.map((update) => (
                <FamilyUpdateItem
                  key={update.updateId}
                  update={update}
                  viewMode={viewMode}
                />
              ))}

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
