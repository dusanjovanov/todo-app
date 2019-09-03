import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { Todo } from "../types";
import { Filter } from "./../types";
import { API_ENDPOINT } from "../config";

export const setFilter = createStandardAction("SET_FILTER")<Filter>();

export const addTodoActions = createAsyncAction(
  "ADD_TODO_REQUEST",
  "ADD_TODO_SUCCESS",
  "ADD_TODO_FAILURE"
)<undefined, Todo, string>();

export const addTodo = (text: string) => dispatch => {
  dispatch(addTodoActions.request());
  fetch(`${API_ENDPOINT}/todos`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  })
    .then(res => {
      if (res.ok) {
        res.json().then(todo => dispatch(addTodoActions.success(todo)));
      } else {
        dispatch(addTodoActions.failure(res.statusText));
      }
    })
    .catch(err => console.log(err));
};

export const toggleTodoActions = createAsyncAction(
  "TOGGLE_TODO_REQUEST",
  "TOGGLE_TODO_SUCCESS",
  "TOGGLE_TODO_FAILURE"
)<undefined, number, string>();

export const toggleTodo = (id: number) => dispatch => {
  dispatch(toggleTodoActions.request());
  fetch(`${API_ENDPOINT}/todos/${id}/toggle`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        res.json().then(id => dispatch(toggleTodoActions.success(id)));
      } else {
        dispatch(toggleTodoActions.failure(res.statusText));
      }
    })
    .catch(err => console.log(err));
};

export const deleteTodoActions = createAsyncAction(
  "DELETE_TODO_REQUEST",
  "DELETE_TODO_SUCCESS",
  "DELETE_TODO_FAILURE"
)<undefined, number, string>();

export const deleteTodo = (id: number) => dispatch => {
  dispatch(deleteTodoActions.request());
  fetch(`${API_ENDPOINT}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        res.json().then(id => dispatch(deleteTodoActions.success(id)));
      } else {
        dispatch(deleteTodoActions.failure(res.statusText));
      }
    })
    .catch(err => console.log(err));
};
