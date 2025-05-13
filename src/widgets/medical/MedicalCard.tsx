import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import tinycolor from "tinycolor2";
import { Label, Title } from "../../components/commonParts/Labels";

const getStatusColorBase = (
  item: MedicalInfo,
  birth: dayjs.Dayjs,
  validDates: number[]
): string => {
  const now = dayjs();

  if (validDates.length === 0) {
    const firstDue = birth.add(item.initialGap, "day");
    const daysToDue = firstDue.diff(now, "day");

    if (daysToDue > 7) return "#FFF5DA";
    if (daysToDue > 0) return "#f7ce5b";
    if (daysToDue >= -7) return "#e2b332";
    return "#d32f2f";
  }

  const lastGiven = dayjs(validDates.at(-1)! * 1000);
  const gap = item.gap ?? 999999;
  const nextDue = lastGiven.add(gap, "day");
  const daysToNext = nextDue.diff(now, "day");

  if (daysToNext > 7) return "#A6B37D";
  if (daysToNext > 0) return "#f7ce5b";
  if (daysToNext >= -7) return "#e2b332";
  return "#d32f2f";
};

type MedicalInfo = {
  type: string;
  label: string;
  dates: number[];
  gap?: number;
  initialGap: number;
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
  height: 100%;
  background-color: ${(p) => p.background};
  border: 2px solid ${(p) => p.borderColor};
  color: ${(p) => p.textColor};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  transform-style: preserve-3d;
  position: relative;
`;

const CardFace = styled.div<{ front?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 12px;
  box-sizing: border-box;
  ${(p) => (p.front ? "" : "transform: rotateY(180deg);")}
  flex-direction: column;
  text-align: center;
`;

const TypeLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

const DateList = styled.div`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
`;

const getStatusColors = (
  item: MedicalInfo,
  birth: dayjs.Dayjs,
  validDates: number[]
): ColorSet => {
  const base = getStatusColorBase(item, birth, validDates);

  const bg = tinycolor(base).lighten(25).toHexString();
  const border = tinycolor(base).lighten(10).toHexString();

  return { background: bg, border };
};

export const MedicalCard: React.FC<MedicalCardProps> = ({
  item,
  birthDate,
}) => {
  const [flipped, setFlipped] = useState(true);
  const birth = dayjs(birthDate * 1000);

  const validDates = item.dates.filter((d): d is number => d > 0);

  const { background, border } = getStatusColors(item, birth, validDates);
  const textColor = tinycolor
    .mostReadable(background, ["#000", "#fff"])
    .toHexString();

  return (
    <CardWrapper
      background={background}
      borderColor={border}
      textColor={textColor}
      // onClick={() => setFlipped((prev) => !prev)}
    >
      <CardInner
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <CardFace front>
          <TypeLabel>{item.label}</TypeLabel>
        </CardFace>
        <CardFace>
          <div>
            <Title>{` ${item.label}:`}</Title>
            <DateList>
              {validDates.length ? (
                validDates.map((d, i) => (
                  <Label key={i}>{dayjs(d * 1000).format("DD/MM/YYYY")}</Label>
                ))
              ) : (
                <Label>אין מידע</Label>
              )}
            </DateList>
          </div>
        </CardFace>
      </CardInner>
    </CardWrapper>
  );
};
