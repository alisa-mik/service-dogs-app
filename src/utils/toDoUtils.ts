import { enqueueSnackbar } from "notistack";
import { apiClient, apiConfig } from "../config/apiConfig";
import { ToDo } from "../types/todoTypes";

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

export function sortTodos(todos: ToDo[]) {
  const now = Date.now();

  return [ ...todos ].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // incomplete first
    }

    const dueA = a.dueDate ? new Date(a.dueDate * 1000).getTime() : null;
    const dueB = b.dueDate ? new Date(b.dueDate * 1000).getTime() : null;

    // Incomplete todos
    if (!a.completed && !b.completed) {
      const isOverdueA = dueA !== null && dueA < now;
      const isOverdueB = dueB !== null && dueB < now;

      // 1. Overdue first
      if (isOverdueA !== isOverdueB) {
        return isOverdueA ? -1 : 1;
      }

      // 2. No dueDate before future dueDate
      const hasNoDueA = dueA === null;
      const hasNoDueB = dueB === null;
      if (hasNoDueA !== hasNoDueB) {
        return hasNoDueA ? -1 : 1;
      }

      // 3. Future dueDate: sort by createdAt
      const createdA = new Date(a.createdAt * 1000).getTime();
      const createdB = new Date(b.createdAt * 1000).getTime();
      return createdB - createdA;
    }

    // Completed todos
    if (a.completed && b.completed) {
      const timeA = dueA ?? -Infinity;
      const timeB = dueB ?? -Infinity;

      // Most future dueDate first
      return timeB - timeA;
    }

    return 0;
  });
}

