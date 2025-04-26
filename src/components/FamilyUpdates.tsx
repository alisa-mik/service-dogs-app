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
import { BEIGE_LIGHT, BROWN_DARK } from "../config/colors";
import dayjs from "dayjs";

export const FamilyUpdates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updates = useSelector(selectFamilyUpdates);
  const status = useSelector(selectFamilyUpdatesStatus);
  const error = useSelector(selectFamilyUpdatesError);

  // Timestamps instead of ISO strings
  const [startDate, setStartDate] = useState<number>(1740787200000); // Example: May 1, 2025
  const [endDate, setEndDate] = useState<number>(1745548800000); // Example: May 2, 2025

  const handleFetchUpdates = () => {
    const params = {
      status: "Resolved",
      startDate,
      endDate,
    };
    dispatch(fetchFamilyUpdates(params));
  };

  useEffect(() => {
    handleFetchUpdates();
  }, []);

  return (
    <Box
      style={{ width: "100%", height: "100%", backgroundColor: BEIGE_LIGHT }}
    >
      <Typography variant="h6" style={{ color: BROWN_DARK }}>
        Family Updates
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <Button
          variant="contained"
          onClick={handleFetchUpdates}
          disabled={status === "loading"}
        >
          Fetch Updates
        </Button>

        {status === "loading" && <CircularProgress />}
        {status === "failed" && <Typography color="error">{error}</Typography>}

        {status === "succeeded" && updates.length > 0 && (
          <Box>
            <Typography variant="body1">Updates found:</Typography>
            <div>
              {updates.map((update) => (
                <div key={update.updateId}>
                  <strong>{update.updateType}</strong> — {update.dogId}
                  <div>
                    Created:{" "}
                    {dayjs(update.createdAt).format("YYYY-MM-DD HH:mm")}
                  </div>
                </div>
              ))}
            </div>
          </Box>
        )}

        {status === "succeeded" && updates.length === 0 && (
          <Typography style={{ color: BROWN_DARK }}>
            No updates found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
