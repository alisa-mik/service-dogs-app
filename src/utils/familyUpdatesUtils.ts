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
