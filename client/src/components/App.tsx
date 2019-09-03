import classnames from "classnames";
import React from "react";
import { useSelector } from "../redux/hooks";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import Filters from "./Filters";

const App = () => {
  const isLoading = useSelector(state => state.isLoading);

  return (
    <div className="content">
      <h1 className="title">Todo app</h1>
      <AddTodoForm />
      <Filters />
      <TodoList />
      <div className="footer">Built by Dušan Jovanov 💻| MIT</div>
      <div className={classnames("loader", { "loader--visible": isLoading })} />
    </div>
  );
};

export default App;
