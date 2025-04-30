import { enqueueSnackbar } from "notistack";
import { apiClient, apiConfig } from "../config/apiConfig";

export const resolveFamilyUpdate = async (updateId: string) => {
  try {
    await apiClient.post(apiConfig.editFamilyUpdatesStatus, {
      updateId,
      resolved: true,
    });

    enqueueSnackbar("הפנייה סומנה כמטופלת", { variant: "success" });
  } catch (error) {
    console.error("Error resolving update:", error);
    enqueueSnackbar("אירעה שגיאה בעת סימון הפנייה", { variant: "error" });
  }
};
