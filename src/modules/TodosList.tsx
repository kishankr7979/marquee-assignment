import React from 'react'
import styled from 'styled-components';
import {
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import NoRecordFound from './NoRecordFound';

type Todo = {
    id: string;
    text: string;
    completed: boolean;
    subTasks: Todo;
  }[];

  interface TodosListProps {
    list: Todo;
    handleToggleTodo: (id: string) => void;
    handleAddSubTaskClick: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
  }
const TodosList = ({list, handleToggleTodo, handleAddSubTaskClick, handleDeleteTodo}: TodosListProps) => {
  return (
    <>
      {list.length === 0 && <NoRecordFound />}
      {list.length > 0 && <TodoList>
        {list.map((todo) => (
            <>
          <TodoItem key={todo.id} disablePadding>
            <ListItemIcon>
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
            </ListItemIcon>
            <div>
              <TodoText
                primary={
                  <React.Fragment>
                    {todo.text}
                  </React.Fragment>
                }
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              />
              <AddSubTaskButton onClick={() => handleAddSubTaskClick(todo.id)}>
                Add Subtask
              </AddSubTaskButton>
            </div>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </TodoItem>
          {todo.subTasks.length > 0 && (
              <SubTaskWrapper>
                <TodosList list={todo.subTasks} handleDeleteTodo={handleDeleteTodo} handleToggleTodo={handleToggleTodo} handleAddSubTaskClick={handleAddSubTaskClick}/>
              </SubTaskWrapper>
            )}
          </>
        ))}
      </TodoList>}
      </>
  )
}

export default TodosList

const TodoList = styled(List)`
  padding-left: 20px;
`;

const TodoItem = styled(ListItem)`
  display: flex;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 6px 0;
`;

const TodoText = styled(ListItemText)`
  flex: 1;
  padding-left: 10px;
`;

const SubTaskWrapper = styled.div`
  padding-left: 20px;
`;

const AddSubTaskButton = styled(Button)`
  margin-left: 10px;
`;

