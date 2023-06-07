/* eslint-disable no-delete-var */
import {
  CLEAR_CONTEXT,
  UPDATE_USER_AUTH_DATA,
  ADD_TODO,
  ADD_TODO_SUBTASK,
  DELETE_TODO,
  UPDATE_TODO,
} from "./action";

export type todosType = {
  id: string;
  text: string;
  completed: boolean;
  subTasks: todosType[];
};
export type authContextTypes = {
  userId: string;
  password: string;
  jwtToken: string;
  todos: todosType[];
};

export const authInitialData: authContextTypes = {
  userId: "",
  password: "",
  jwtToken: "",
  todos: [],
};

const AuthReducer = (
  state: authContextTypes = authInitialData,
  action: any
) => {
  switch (action.type) {
    case UPDATE_USER_AUTH_DATA: {
      const { userId, password, jwtToken } = action.payload;
      return {
        ...state,
        userId,
        password,
        jwtToken,
      };
    }

    case CLEAR_CONTEXT: {
      return authInitialData;
    }

    case ADD_TODO: {
      const { id, text, completed, subTasks } = action.payload;
      return {
        ...state,
        todos: [...state.todos, { id, text, completed, subTasks }],
      };
    }

    case DELETE_TODO: {
      const { id } = action.payload;
      const deleteTask = (todos: todosType[]) => {
        todos.forEach((todo, index) => {
            if(todo['id'] === id) {
                todos.splice(index, 1);
            }
            else if(todo.subTasks.length > 0){
                deleteTask(todo.subTasks)
            }
        })
      } 
      deleteTask(state['todos']);
      return {
        ...state,
      };
    }

    case UPDATE_TODO: {
      const { todos } = action.payload;
      return {
        ...state,
        todos: todos,
      };
    }

    case ADD_TODO_SUBTASK: {
      const { parentId, text, completed, subTasks } = action.payload;

      const addSubTask = (todos: todosType[]): todosType[] => {
        return todos.map((todo) => {
          if (todo.id === parentId) {
            const newSubTask: todosType = {
              id: crypto.randomUUID().toString(),
              text,
              completed,
              subTasks: [],
            };
            return {
              ...todo,
              subTasks: [...todo.subTasks, newSubTask],
            };
          } else if (todo.subTasks.length > 0) {
            return {
              ...todo,
              subTasks: addSubTask(todo.subTasks),
            };
          }
          return todo;
        });
      };

      const updatedTodos = addSubTask(state.todos);

      return {
        ...state,
        todos: updatedTodos,
      };
    }
  }
};

export default AuthReducer;
