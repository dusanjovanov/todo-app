import React, { MouseEvent } from "react";
import { Filter } from "../types";

type Props = {
  filter: Filter;
  onClick: (e: MouseEvent) => void;
  currentFilter: Filter;
};

const Filter = ({ filter, onClick, currentFilter }: Props) => {
  const text = filter[0].toUpperCase() + filter.slice(1);

  return (
    <div onClick={onClick}>
      {currentFilter === filter ? <strong>{text}</strong> : text}
    </div>
  );
};

export default Filter;
