import { useEffect, useState } from "react";
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
import { FamilyUpdateItem } from "../components/FamilyUpdateItem";
import { resolveFamilyUpdate } from "../utils/resolveFamilyUpdate";

export const FamilyUpdates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updates = useSelector(selectFamilyUpdates);
  const status = useSelector(selectFamilyUpdatesStatus);
  const error = useSelector(selectFamilyUpdatesError);

  const [startDate, setStartDate] = useState<number>(1740787200000); // Example: May 1, 2025
  const [endDate, setEndDate] = useState<number>(1745548800000); // Example: May 2, 2025

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

  useEffect(() => {
    handleFetchUpdates();
  }, []);
  console.log(updates);

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
        {status === "loading" && <CircularProgress />}
        {status === "failed" && <Typography color="error">{error}</Typography>}

        {status === "succeeded" && updates.length > 0 && (
          <Box>
            <div>
              {updates.map((update) => (
                <FamilyUpdateItem
                  key={update.updateId}
                  update={update}
                  onResolve={handleResolve}
                />
              ))}
            </div>
          </Box>
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
