import { useSelector } from "react-redux";
import { selectAllToDos, selectToDosStatus } from "../store/todosSlice";
import { Center, Column, WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";
import { TodoItem } from "../components/TodoItem";
import { AddToDoForm } from "../components/Forms/AddToDoForm";
import { useMemo } from "react";
import { CircularProgress } from "@mui/material";
import { sortTodos } from "../utils/toDoUtils";

export const Todos = () => {
  const todos = useSelector(selectAllToDos);
  const status = useSelector(selectToDosStatus);

  const data = {
    todoId: null,
    dueDate: "",
    text: "",
  };


  const sortedToDos = useMemo(() => sortTodos(todos), [ todos ]);


  return <>
    <WidgetHeader>
      <WidgetTitle>תזכורות</WidgetTitle>
      <AddToDoForm data={data} />
    </WidgetHeader>
    <WidgetBody>
      {status === "loading" && sortedToDos.length === 0 && (
        <Center>
          <CircularProgress />
        </Center>
      )}
      {status === "failed" && (
        <div>{'שגיאה בהבאת נתונים'}</div>
      )}
      <Column>
        {sortedToDos.map((todo) => (
          <TodoItem key={todo.todoId} todo={todo} />
        ))}
      </Column>
    </WidgetBody>
  </>
};
