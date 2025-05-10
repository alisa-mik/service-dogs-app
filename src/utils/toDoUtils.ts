import { enqueueSnackbar } from "notistack";
import { apiClient, apiConfig } from "../config/apiConfig";

export const completeToDo = async (
  todoId: string,
  completed: boolean
) => {
  try {
    await apiClient.put(`${apiConfig.todos}/${todoId}`, {
      completed,
    });

  } catch (error) {
    console.error("Error resolving update:", error);
    enqueueSnackbar("אירעה שגיאה בעת סימון התזכורת", { variant: "error" });
  }
};