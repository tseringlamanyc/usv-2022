import React from "react";
import "./EmptyList.scss";

function EmptyList({ searchTerm }) {
  return <div className="emptyList">{`${searchTerm}`}</div>;
}

export default EmptyList;
