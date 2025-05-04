import { enqueueSnackbar } from "notistack";
import { apiClient, apiConfig } from "../config/apiConfig";
import { FamilyUpdate } from "../types/familyUpdateTypes";

export const updateTypeTitles: Record<string, string> = {
  foodRequest: "הזמנת אוכל",
  gearRequest: "הזמנת ציוד",
  medicalUpdate: "דיווח רפואי",
  familyAway: "הזמנת פנסיון",
  familyNotice: "אחר",
};

export const gearMap: Record<string, string> = {
  leash: "רצועה",
  collar: "קולר",
  easywalk: "ריתמה",
  bone: "עצם לעיסה",
  wastebags: "שקיות איסוף",
  other: "אחר",
};

export const foodMap: Record<string, string> = {
  salmon: "סלמון",
  bison: "ביזון",
  unknown: "לא ידוע",
};

export const proceduresMap: Record<string, string> = {
  "vaccine-2": "משושה 2",
  "vaccine-3": "משושה 3",
  "rabies-1": "כלבת 1",
  "rabies-2": "כלבת 2",
  worms: "תילוע",
  bravecto: "טיפול לפרעושים וקרציות",
  chip: "שבב",
  spay: "עיקור / סירוס",
  other: "אחר",
};

export const resolveFamilyUpdate = async (
  updateId: string,
  resolved: boolean
) => {
  try {
    await apiClient.post(apiConfig.editFamilyUpdatesStatus, {
      updateId,
      resolved,
    });

    enqueueSnackbar(
      resolved ? "הפנייה סומנה כמטופלת" : "הפנייה סומנה כלא מטופלת",
      { variant: "success" }
    );
  } catch (error) {
    console.error("Error resolving update:", error);
    enqueueSnackbar("אירעה שגיאה בעת סימון הפנייה", { variant: "error" });
  }
};

export function groupByKey<K extends keyof FamilyUpdate>(
  updates: FamilyUpdate[],
  key: K
): Record<string, FamilyUpdate[]> {
  return updates.reduce((acc, update) => {
    const value = update[key] ?? "unknown";
    const group =
      typeof value === "string" || typeof value === "number"
        ? String(value)
        : "unknown";
    if (!acc[group]) acc[group] = [];
    acc[group].push(update);
    return acc;
  }, {} as Record<string, FamilyUpdate[]>);
}
