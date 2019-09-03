import React from "react";
import { useSelector, useDispatch } from "../redux/hooks";
import Filter from "./Filter";
import { Filter as FilterType } from "../types";
import { setFilter } from "../redux/actionCreators";

const filterStrings: FilterType[] = ["all", "completed", "not completed"];

const Filters = () => {
  const currentFilter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const onClick = filter => () => dispatch(setFilter(filter));

  return (
    <div className="filters">
      <div className="filters__text">Filters:</div>
      {filterStrings.map(f => (
        <Filter
          key={f}
          filter={f}
          currentFilter={currentFilter}
          onClick={onClick(f)}
        />
      ))}
    </div>
  );
};

export default Filters;
