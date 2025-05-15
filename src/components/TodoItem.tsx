import styled from "styled-components"
import { UseToDoComplete } from "../hooks/useTodoComplete"
import { ToDo } from "../types/todoTypes"
import DateText from "./commonParts/DateText"
import { Column, Row } from "./commonParts/Layouts"
import { ResolveIcon } from "./FamilyUpdates/ResolveIcon"
import dayjs from "dayjs"
import { AnimatedItem } from "./commonParts/AnimatedItem"

const StyledRow = styled(Row)`
  align-items: flex-start;
`
const StyledText = styled.div.attrs<{ completed: boolean }>(() => ({
})) <{ completed: boolean }>`
  font-size: 1rem;
  color: #333;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  opacity: ${({ completed }) => (completed ? 0.6 : 1)};
`;

export const TodoItem = ({ todo }: { todo: ToDo }) => {

  const { handleComplete } = UseToDoComplete()

  const { todoId, text, dueDate, completed } = todo

  const isOverdue = !!dueDate && dayjs().startOf("day").isAfter(dayjs(dueDate * 1000).startOf("day"));

  return (
    <AnimatedItem>

      <StyledRow>
        <ResolveIcon id={todoId} checked={completed} handleChange={handleComplete} />
        <Column gap="1px">
          <StyledText completed={completed}>{text}</StyledText>
          {dueDate && (
            <DateText
              date={dueDate}
              color={!completed && isOverdue ? "red" : "#888"}
            />
          )}
        </Column>
      </StyledRow>
    </AnimatedItem>
  )
}
