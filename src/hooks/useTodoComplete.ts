import { useDispatch } from "react-redux";
import { resolveFamilyUpdate } from "../utils/familyUpdatesUtils";
import { AppDispatch } from "../store";
import { fetchToDos } from "../store/todosSlice";
import { completeToDo } from "../utils/toDoUtils";

interface UseToDoComplete {
  handleComplete: (id: string, completed: boolean) => Promise<void>;
}

export const UseToDoComplete = (): UseToDoComplete => {
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchToDos = () => {
    dispatch(fetchToDos({ limit: 100 }))

  };

  const handleComplete = async (id: string, completed: boolean) => {
    await completeToDo(id, completed);
    handleFetchToDos();
  };

  return { handleComplete };
};
