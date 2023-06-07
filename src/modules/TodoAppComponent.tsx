import React, { useContext, useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Dialog,
} from "@mui/material";
import AuthContext from "../context/auth/AuthContext";
import {
  ADD_TODO,
  DELETE_TODO,
  ADD_TODO_SUBTASK,
  UPDATE_TODO,
} from "../context/auth/action";

import TodosList from "./TodosList";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  subTasks: Todo;
}[];

const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [todoText, setTodoText] = useState("");
  const subTextRef = useRef<HTMLInputElement>();
  const [subTaskModal, setSubTaskModal] = useState<{
    isVisible: boolean;
    parentId: string;
  }>({
    isVisible: false,
    parentId: "",
  });

  const todos: Todo = state["todos"];

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      const newTodo = {
        id: crypto.randomUUID().toString(),
        text: todoText,
        completed: false,
        subTasks: [],
      };
      dispatch({ type: ADD_TODO, payload: newTodo });
      setTodoText("");
    }
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = toggleTodoCompletion(todos, id);
    dispatch({ type: UPDATE_TODO, payload: { todos: updatedTodos } });
  };

  const toggleTodoCompletion = (todos: Todo, id: string): Todo => {
    return todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      if (todo.subTasks.length > 0) {
        return {
          ...todo,
          subTasks: toggleTodoCompletion(todo.subTasks, id),
        };
      }
      return todo;
    });
  };

  const handleDeleteTodo = (id: string) =>
    dispatch({ type: DELETE_TODO, payload: { id } });

  const handleAddSubTask = () => {
    const subTaskText = subTextRef.current?.value;
    if ((subTaskText || "")?.trim().length > 1) {
      dispatch({
        type: ADD_TODO_SUBTASK,
        payload: {
          parentId: subTaskModal["parentId"],
          text: subTaskText,
          completed: false,
          subTasks: [],
        },
      });
      setSubTaskModal({ ...subTaskModal, isVisible: false });
    }
  };

  const handleAddSubTaskClick = (id: string) => {
    setSubTaskModal({ isVisible: true, parentId: id });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" component="h1">
          Todo App
        </Typography>
        <Box display="flex" mt={4}>
          <TextField
            label="Add Todo"
            variant="outlined"
            fullWidth
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTodo}
            style={{ marginLeft: "1rem" }}
          >
            Add
          </Button>
        </Box>
        <TodosList
          list={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
          handleAddSubTaskClick={handleAddSubTaskClick}
        />
      </Box>
      <Dialog
        open={subTaskModal["isVisible"]}
        onClose={() => setSubTaskModal({ ...subTaskModal, isVisible: false })}
      >
        <div style={{ padding: "1rem" }}>
          <Box display="flex" mt={4}>
            <TextField
              label="Add Subtask"
              variant="outlined"
              fullWidth
              id="subtask"
              inputRef={subTextRef}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSubTask}
              style={{ marginLeft: "1rem" }}
            >
              Add
            </Button>
          </Box>
        </div>
      </Dialog>
    </Container>
  );
};

export default TodoApp;