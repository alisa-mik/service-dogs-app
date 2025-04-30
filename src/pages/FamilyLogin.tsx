import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchDogsByPhoneNumber,
  selectDogsByPhoneNumber,
  selectDogsByPhoneNumberStatus,
} from "../store/dogsByPhoneNumberSlice";
import { AppDispatch } from "../store";
import {
  CircularProgress,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { uniqueId } from "lodash";
import styled from "styled-components";
import { BEIGE_LIGHT, BROWN_DARK } from "../config/colors";
import FamilyUpdateForm from "../components/FamilyUpdates/FamilyUpdateForm";

const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${BEIGE_LIGHT};
  text-align: center;
  padding: 0;
  margin: 0;
  direction: rtl;
  overflow: auto;
  padding-bottom: 20px;
`;

export function FamilyLogin() {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const dogs = useSelector(selectDogsByPhoneNumber);
  const status = useSelector(selectDogsByPhoneNumberStatus);

  const handleSubmit = () => {
    if (!phone.trim()) return;
    dispatch(fetchDogsByPhoneNumber(phone.trim()));
  };

  return (
    <FullPageContainer>
      <img
        style={{ width: "150px", margin: "10px 0 20px 0" }}
        src={`/logo.jpg?v=${uniqueId()}`}
      />
      {!(status === "succeeded" && dogs.length > 0) && (
        <Box>
          <Typography variant="h6" gutterBottom style={{ color: BROWN_DARK }}>
            הזינו מספר טלפון לזיהוי
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mb={3}>
            <TextField
              label="מספר טלפון"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              //   fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              שלח
            </Button>
          </Box>
        </Box>
      )}

      {status === "loading" && <CircularProgress />}

      {status === "failed" && <Typography color="error">שגיאה</Typography>}

      {status === "succeeded" && dogs.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div style={{ color: BROWN_DARK }}>
            שלום למשפחה של{" "}
            <span>{dogs.map((dog) => dog.dogName).join(" ו")}</span>!
          </div>
          <FamilyUpdateForm dog={dogs[0]} />
        </div>
      )}

      {status === "succeeded" && dogs.length === 0 && (
        <Typography style={{ color: BROWN_DARK }}>לא נמצאו כלבים.</Typography>
      )}
    </FullPageContainer>
  );
}
