import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import "./SearchBar.scss";

function SearchBar({ searchHandler, restaurantData }) {
  function getLocationsOnly(obj, field) {
    let arrRes = obj;
    let arr = [];

    for (const res of arrRes) {
      arr.push(res[`${field}`]);
    }

    arr = [...new Set(arr)];

    return arr;
  }

  let allLocations = getLocationsOnly(restaurantData, "location");
  let allCuisines = getLocationsOnly(restaurantData, "cuisine");
  let allPrices = getLocationsOnly(restaurantData, "price").sort((a, b) => a.length - b.length);
  let allRestrictions = getLocationsOnly(restaurantData, "diningRestriction");

  return (
    <div className="bar">
      <div className="bar_search">
        <SearchIcon className="icon" />
        <input placeholder="Search" onChange={searchHandler}></input>

        <TextField select label="Location" helperText="Location">
          {allLocations.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>

        <TextField select label="Cuisine" helperText="Cuisine">
          {allCuisines.map((cuisine, index) => (
            <MenuItem key={index} value={cuisine}>
              {cuisine}
            </MenuItem>
          ))}
        </TextField>

        <TextField select label="Price" helperText="Price">
          {allPrices.map((price, index) => (
            <MenuItem key={index} value={price}>
              {price}
            </MenuItem>
          ))}
        </TextField>

        <TextField select label="Service" helperText="Service">
          {allRestrictions.map((service, index) => (
            <MenuItem key={index} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
}

export default SearchBar;
