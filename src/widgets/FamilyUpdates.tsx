import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectFamilyUpdates,
  selectFamilyUpdatesError,
  selectFamilyUpdatesStatus,
} from "../store/familyUpdatesSlice";
import { CircularProgress, Box, Typography, Button as MuiButton } from "@mui/material";
import { BROWN_DARK } from "../config/colors";
import {
  Center,
  Column,
  Row,
  WidgetBody,
  WidgetHeader,
} from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { FamilyUpdateItem } from "../components/FamilyUpdates/FamilyUpdateItem";
import { FamilyUpdate } from "../types/familyUpdateTypes";
import { groupByKey, updateTypeTitles } from "../utils/familyUpdatesUtils";
import { selectSelectedGroupId } from "../store/trainingGroupsSlice";
import { Button } from "../components/commonParts/Buttons";

export const FamilyUpdates = () => {
  const updates = useSelector(selectFamilyUpdates);
  const status = useSelector(selectFamilyUpdatesStatus);
  const error = useSelector(selectFamilyUpdatesError);

  const [ updatesByGroup, setUpdatesByGroup ] = useState<FamilyUpdate[]>([]);
  const [ showOnlyUnread, setShowOnlyUnread ] = useState(false);
  const [ viewMode, setViewMode ] = useState<"all" | "type">("all");
  const selectedGroupId = useSelector(selectSelectedGroupId);

  useEffect(() => {
    const updatesFilteredByGroup = updates
      .filter((update) => {
        if (selectedGroupId) return update.groupId === selectedGroupId;
        else return updates;
      })
      .filter(
        (update) => ![ "gearRequest", "foodRequest" ].includes(update.updateType)
      );
    setUpdatesByGroup(updatesFilteredByGroup);
  }, [ updates, selectedGroupId ]);

  const sortByResolvedAndDate = (a: FamilyUpdate, b: FamilyUpdate) => {
    // First sort by resolved status
    if (!a.resolved && b.resolved) return -1;
    if (a.resolved && !b.resolved) return 1;
    // Then sort by creation date (newest first)
    return b.createdAt - a.createdAt;
  };

  const filteredUpdates = useMemo(() => {
    return showOnlyUnread
      ? updatesByGroup.filter((u) => !u.resolved)
      : updatesByGroup;
  }, [ updatesByGroup, showOnlyUnread ]);

  const sortedUpdates = useMemo(() => {
    return [ ...filteredUpdates ].sort(sortByResolvedAndDate);
  }, [ filteredUpdates ]);

  const groupedByType = useMemo(
    () => {
      const grouped = groupByKey(filteredUpdates, "updateType");
      // Sort updates within each type
      Object.values(grouped).forEach(updates => {
        updates.sort(sortByResolvedAndDate);
      });
      return grouped;
    },
    [ filteredUpdates ]
  );

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>בקשות נוספות</WidgetTitle>
        <Button onClick={() => setShowOnlyUnread((v) => !v)}>
          {showOnlyUnread ? "הצג הכל" : "הצג רק שלא נקראו"}
        </Button>
      </WidgetHeader>
      <WidgetBody style={{ justifyContent: "flex-start" }}>
        <Row>
          <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
            <MuiButton
              variant={viewMode === "all" ? "contained" : "outlined"}
              onClick={() => setViewMode("all")}
            >
              לפי תאריך
            </MuiButton>
            <MuiButton
              variant={viewMode === "type" ? "contained" : "outlined"}
              onClick={() => setViewMode("type")}
            >
              לפי סוג פנייה
            </MuiButton>
          </Box>
        </Row>
        <Column style={{ overflow: "auto", flex: 1 }}>
          {status === "loading" && updatesByGroup.length === 0 && (
            <Center>
              <CircularProgress />
            </Center>
          )}
          {status === "failed" && (
            <Typography color="error">{error}</Typography>
          )}

          {filteredUpdates.length > 0 && (
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
                Object.entries(groupedByType).map(([ type, typeUpdates ]) => (
                  <div key={type}>
                    <Typography variant="h6" sx={{ color: BROWN_DARK }}>
                      {updateTypeTitles[ type ]}
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

          {status === "succeeded" && filteredUpdates.length === 0 && (
            <Center>
              <Typography style={{ color: BROWN_DARK }}>
                אין פניות פתוחות
              </Typography>
            </Center>
          )}
        </Column>
      </WidgetBody>
    </>
  );
};
