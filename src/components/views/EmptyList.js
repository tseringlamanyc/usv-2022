import React from "react";
import "./EmptyList.scss";

function EmptyList({ searchTerm }) {
  return <div className="emptyList">{`${searchTerm} is not found`}</div>;
}

export default EmptyList;
