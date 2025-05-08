type ToDoType = "task" | "medicalReminder" | "event";

export interface ToDo {
  todoId: string;
  dogId: string;
  text: string;
  type: ToDoType;
  completed: boolean;
  dueDate: number;
  createdAt: number;
}
