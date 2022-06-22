import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.scss";

function SearchBar({ searchHandler }) {
  return (
    <div className="bar">
      <div className="bar_search">
        <SearchIcon className="icon" />
        <input placeholder="Search" onChange={searchHandler}></input>
      </div>
    </div>
  );
}

export default SearchBar;
