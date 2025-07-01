import dayjs from "dayjs";
import { Dog, MedicalInfo } from "../types/dogTypes";

export type VaccineStatus = "COMPLETED" | "UPCOMING" | "SOON" | "DUE" | "OVERDUE";

interface VaccineMedicalInfo {
  type: string;
  label: string;
  dates: number[];
  gap?: number;
  initialGap: number;
  getNextGap?: (count: number) => number;
}

type MedicalCardInfo = {
  type: string;
  label: string;
  dates: number[];
  gap?: number;
  initialGap: number;
  getNextGap?: (completedCount: number) => number;
};

export const statusPriority: Record<VaccineStatus, number> = {
  UPCOMING: 0,
  COMPLETED: 1,
  SOON: 2,
  DUE: 3,
  OVERDUE: 4,
};

const getItemStatus = (
  item: VaccineMedicalInfo,
  birth: dayjs.Dayjs,
  validDates: number[]
): VaccineStatus => {
  const now = dayjs();

  if (validDates.length === 0) {
    const firstDue = birth.add(item.initialGap, "day");
    const daysToDue = firstDue.diff(now, "day");

    if (daysToDue > 7) return "UPCOMING";
    if (daysToDue > 0) return "SOON";
    if (daysToDue >= -7) return "DUE";
    return "OVERDUE";
  }

  const lastGiven = dayjs(validDates.at(-1)! * 1000);
  const gap = item.getNextGap
    ? item.getNextGap(validDates.length)
    : (item.gap ?? 999999);
  const nextDue = lastGiven.add(gap, "day");
  const daysToNext = nextDue.diff(now, "day");

  if (daysToNext > 7) return "COMPLETED";
  if (daysToNext > 0) return "SOON";
  if (daysToNext >= -7) return "DUE";
  return "OVERDUE";
};

export const getMedicalCardsInfo = (medicalInfo: MedicalInfo | undefined, gender: string): MedicalCardInfo[] => {
  if (!medicalInfo) {
    return [];
  }

  return [
    {
      type: "vaccination",
      label: "משושה",
      dates: medicalInfo.vaccination || [],
      getNextGap: (completedCount: number) => {
        if (completedCount < 3) {
          return 14;
        }
        return 365;
      },
      initialGap: 42,
    },
    {
      type: "rabies",
      label: "כלבת",
      dates: medicalInfo.rabies || [],
      initialGap: 30,
      getNextGap: (completedCount: number) => {
        if (completedCount < 2) {
          return 31;
        }
        return 365;
      },
    },
    {
      type: "deworming",
      label: "תילוע",
      dates: medicalInfo.deworming || [],
      gap: 180,
      initialGap: 30,
    },
    {
      type: "bravecto",
      label: "ברבקטו",
      dates: medicalInfo.bravecto || [],
      gap: 90,
      initialGap: 180,
    },
    {
      type: "spay",
      label: gender === "נקבה" ? "עיקור" : "סירוס",
      dates: medicalInfo.spay || [],
      initialGap: 240,
    },
    {
      type: "dp",
      label: "DP",
      dates: medicalInfo.dp || [],
      initialGap: 14
    },
  ];
};

export const getOverallVaccineStatus = (dog: Dog): VaccineStatus => {
  if (!dog.medicalInfo) return "UPCOMING";

  const birth = dayjs(dog.birthDate * 1000);
  const medicalCards = getMedicalCardsInfo(dog.medicalInfo, dog.gender);
  const statuses = medicalCards.map(card => getItemStatus(card, birth, card.dates));

  // If no statuses (empty array), return UPCOMING as the dog is too young
  if (statuses.length === 0) return "UPCOMING";

  // Return the status with the highest priority number (worst status)
  return statuses.reduce((worst, current) =>
    statusPriority[ current ] > statusPriority[ worst ] ? current : worst
  );
}; 