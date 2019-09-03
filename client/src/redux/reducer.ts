import { Todo, Filter } from "../types";
import { RootAction } from "./actionTypes";
import {
  addTodoActions,
  toggleTodoActions,
  deleteTodoActions,
  setFilter
} from "./actionCreators";
import { getType } from "typesafe-actions";
import todos from "../../../server/todos.json";

export type State = {
  todos: Todo[];
  isLoading: boolean;
  filter: Filter;
};

export const initState: State = {
  todos,
  isLoading: false,
  filter: "all"
};

const reducer = (state: State = initState, action: RootAction) => {
  switch (action.type) {
    case getType(addTodoActions.success): {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isLoading: false
      };
    }
    case getType(toggleTodoActions.success): {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        )
      };
    }
    case getType(deleteTodoActions.success): {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    }
    case getType(setFilter): {
      return {
        ...state,
        filter: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
