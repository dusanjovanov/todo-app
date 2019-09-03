import React, { MouseEvent } from "react";
import { Todo } from "../types";
import classnames from "classnames";
import { useDispatch } from "../redux/hooks";
import * as Actions from "../redux/actionCreators";

type Props = {
  todo: Todo;
};

const Todo = ({ todo }: Props) => {
  const dispatch = useDispatch();

  const onClickText = (e: MouseEvent) => {
    Actions.toggleTodo(Number(e.currentTarget.getAttribute("data-id")))(
      dispatch
    );
  };

  const onClickDelete = (e: MouseEvent) => {
    Actions.deleteTodo(Number(e.currentTarget.getAttribute("data-id")))(
      dispatch
    );
  };

  return (
    <li className="todo-item">
      <div
        className={classnames("todo-item__text", {
          "todo-item__text--done": todo.isDone
        })}
        title={todo.text}
        onClick={onClickText}
        data-id={todo.id}
      >
        {todo.text}
      </div>
      <div
        className="todo-item__delete"
        onClick={onClickDelete}
        title="Delete todo"
        data-id={todo.id}
      >
        🗑️
      </div>
    </li>
  );
};

export default Todo;
