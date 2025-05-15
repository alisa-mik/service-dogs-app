import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import tinycolor from "tinycolor2";
import { Label } from "../../components/commonParts/Labels";
import { MEDICAL_STATUS } from "../../config/colors";

const getStatusColorBase = (
  item: MedicalInfo,
  birth: dayjs.Dayjs,
  validDates: number[]
): string => {
  const now = dayjs();

  if (validDates.length === 0) {
    const firstDue = birth.add(item.initialGap, "day");
    const daysToDue = firstDue.diff(now, "day");

    if (daysToDue > 7) return MEDICAL_STATUS.UPCOMING;
    if (daysToDue > 0) return MEDICAL_STATUS.SOON;
    if (daysToDue >= -7) return MEDICAL_STATUS.DUE;
    return MEDICAL_STATUS.OVERDUE;
  }

  const lastGiven = dayjs(validDates.at(-1)! * 1000);
  const gap = item.getNextGap
    ? item.getNextGap(validDates.length)
    : (item.gap ?? 999999);
  const nextDue = lastGiven.add(gap, "day");
  const daysToNext = nextDue.diff(now, "day");

  if (daysToNext > 7) return MEDICAL_STATUS.COMPLETED;
  if (daysToNext > 0) return MEDICAL_STATUS.SOON;
  if (daysToNext >= -7) return MEDICAL_STATUS.DUE;
  return MEDICAL_STATUS.OVERDUE;
};

type MedicalInfo = {
  type: string;
  label: string;
  dates: number[];
  gap?: number;
  initialGap: number;
  getNextGap?: (completedCount: number) => number;
};

type MedicalCardProps = {
  item: MedicalInfo;
  birthDate: number;
};

type ColorSet = {
  background: string;
  border: string;
};

const CardWrapper = styled.div<{
  background: string;
  borderColor: string;
  textColor: string;
}>`
  width: 100%;
  min-height: 120px;
  background-color: ${(p) => p.background};
  border: 2px solid ${(p) => p.borderColor};
  color: ${(p) => p.textColor};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
`;

const TypeLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  padding: 4px 0 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

const DateList = styled.div`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
  max-height: 150px;
  padding-right: 4px;
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const StyledLabel = styled(Label)`
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  margin: 0;
  font-size: 0.85rem;
`;

const NoDataLabel = styled(StyledLabel)`
  opacity: 0.7;
  font-style: italic;
`;

const getStatusColors = (
  item: MedicalInfo,
  birth: dayjs.Dayjs,
  validDates: number[]
): ColorSet => {
  const base = getStatusColorBase(item, birth, validDates);

  const bg = tinycolor(base).lighten(42).toHexString();
  const border = tinycolor(base).lighten(20).toHexString();

  return { background: bg, border };
};

export const MedicalCard: React.FC<MedicalCardProps> = ({
  item,
  birthDate,
}) => {
  const birth = dayjs(birthDate * 1000);
  const validDates = item.dates.filter(d => d > 0);
  const { background, border } = getStatusColors(item, birth, validDates);
  const textColor = tinycolor
    .mostReadable(background, [ "#000", "#fff" ])
    .toHexString();

  return (
    <CardWrapper
      background={background}
      borderColor={border}
      textColor={textColor}
    >
      <TypeLabel>{item.label}</TypeLabel>
      <DateList>
        {validDates.length ? (
          validDates
            .sort((a, b) => b - a) // Sort dates in descending order
            .map((d, i) => (
              <StyledLabel key={i}>
                {dayjs(d * 1000).format("DD/MM/YYYY")}
              </StyledLabel>
            ))
        ) : (
          <NoDataLabel>אין מידע</NoDataLabel>
        )}
      </DateList>
    </CardWrapper>
  );
};
