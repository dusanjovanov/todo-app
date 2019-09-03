import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import * as Actions from "../redux/actionCreators";
import { useDispatch } from "../redux/hooks";

const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const addTodo = () => {
    // validation
    if (value.length > 0) {
      Actions.addTodo(value)(dispatch);
      setValue("");
    }
  };

  const onClickAdd = () => addTodo();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  };

  return (
    <div className="add-todo">
      <input
        className="add-todo__input"
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="New Todo"
      />
      <button
        className="add-todo__button"
        onClick={onClickAdd}
        title="Add todo"
      >
        ➕
      </button>
    </div>
  );
};

export default AddTodoForm;
