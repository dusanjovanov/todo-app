import React, { useMemo } from "react";
import { useSelector } from "../redux/hooks";
import Todo from "./Todo";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const filter = useSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    return todos.filter(t => {
      if (filter === "completed") return t.isDone;
      if (filter === "not completed") return !t.isDone;
      else return true;
    });
  }, [filter, todos]);

  return (
    <ul className="todo-list">
      <TransitionGroup>
        {filteredTodos.map(todo => (
          <CSSTransition key={todo.id} classNames="todo-item" timeout={500}>
            <Todo todo={todo} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TodoList;
