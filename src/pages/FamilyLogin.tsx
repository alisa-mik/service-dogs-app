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

} from "@mui/material";
import { uniqueId } from "lodash";
import styled from "styled-components";
import { BEIGE_LIGHT, BROWN_DARK, YELLOW_DARKER } from "../config/colors";
import FamilyUpdateForm from "../components/FamilyUpdates/FamilyUpdateForm";
import { Title } from "../components/commonParts/Labels";
import Text from "../components/form/inputs/Text";

const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100vh;
  width: 100vw;
  text-align: center;
  margin: 0;
  direction: rtl;
  overflow: auto;
  padding-bottom: 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: start;
`

const Header = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  background-color: ${BEIGE_LIGHT};
  border-bottom: 1px solid ${YELLOW_DARKER};
  gap: 10px;
  padding: 16px;
  height: 60px;
`


const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1.1rem;
  background: #fff;
  box-sizing: border-box;
  direction: rtl;
`;

const StyledButton = styled.div<{ $disabled?: boolean }>`
  width: 100%;
  padding: 12px 0;
  background: ${({ $disabled }) => $disabled ? '#c5c5c5' : YELLOW_DARKER};
  color: #fff;
  border: none;
  text-align: center;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 400;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
  transition: background 0.2s;
  user-select: none;
  pointer-events: ${({ $disabled }) => $disabled ? 'none' : 'auto'};
`;

export function FamilyLogin() {
  const [ phone, setPhone ] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const dogs = useSelector(selectDogsByPhoneNumber);
  const status = useSelector(selectDogsByPhoneNumberStatus);

  const handleSubmit = () => {
    if (!phone.trim()) return;
    dispatch(fetchDogsByPhoneNumber(phone.trim()));
  };

  return (
    <FullPageContainer>
      <Header>
        <img
          style={{ width: "40px" }}
          src={`/logo.png?v=${uniqueId()}`}
        />
        <div>המרכז להכשרות כלבי שירות</div>
      </Header>

      {!(status === "succeeded" && dogs.length > 0) && (
        <Container>
          <Title>
            הזינו מספר טלפון לזיהוי
          </Title>
          <StyledInput
            type="tel"
            placeholder="מספר טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            dir="rtl"
          />
          <StyledButton
            onClick={phone.trim() === "" ? undefined : handleSubmit}
            $disabled={phone.trim() === ""}
          >
            שלח
          </StyledButton>
        </Container>
      )}

      {status === "loading" && <CircularProgress />}

      {status === "failed" && <p style={{ color: 'red' }}>שגיאה</p>}

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
          <FamilyUpdateForm dog={dogs[ 0 ]} />
        </div>
      )}

      {status === "succeeded" && dogs.length === 0 && (
        <p style={{ color: BROWN_DARK }}>לא נמצאו כלבים.</p>
      )}
    </FullPageContainer>
  );
}
