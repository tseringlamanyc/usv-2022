import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import DialogPopup from "../dialog/DialogPopup";

import "./SearchBar.scss";

function SearchBar({
  searchHandler,
  restaurantData,
  locationHandler,
  cuisineHandler,
  priceHandler,
  serviceHandler,
  resetFields,
  fetchRestaurants,
}) {
  function getValues(obj, field) {
    let arrRes = obj;
    let arr = ["All"];

    for (const res of arrRes) {
      arr.push(res[`${field}`]);
    }

    arr = [...new Set(arr)];

    return arr;
  }

  let allLocations = getValues(restaurantData, "location");
  let allCuisines = getValues(restaurantData, "cuisine");
  let allPrices = getValues(restaurantData, "price").sort((a, b) => a.length - b.length);
  let allRestrictions = getValues(restaurantData, "diningRestriction");

  return (
    <div className="bar">
      <div className="bar_search">
        <SearchIcon className="icon" />
        <input placeholder="Search" onChange={searchHandler}></input>
        <DialogPopup
          getAllRestaurants={fetchRestaurants}
          variant={"outlined"}
          prompt="Add Restaurant"
          method="POST"
          dialogTitle="Create Restaurant"
        />
      </div>

      <div className="bar_filters">
        <div className="bar_filters_location">
          <TextField select helperText="Location" onChange={locationHandler} style={{ width: 180 }}>
            {allLocations.map((location, index) => (
              <MenuItem key={index} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <TextField select helperText="Cuisine" onChange={cuisineHandler} style={{ width: 150 }}>
          {allCuisines.map((cuisine, index) => (
            <MenuItem key={index} value={cuisine}>
              {cuisine}
            </MenuItem>
          ))}
        </TextField>

        <TextField select helperText="Price" onChange={priceHandler} style={{ width: 90 }}>
          {allPrices.map((price, index) => (
            <MenuItem key={index} value={price}>
              {price}
            </MenuItem>
          ))}
        </TextField>

        <TextField select helperText="Service" onChange={serviceHandler} style={{ width: 200 }}>
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
