import React from "react";
import { Link } from "react-router-dom";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { Button } from "@mui/material";

import "./RestaurantCard.scss";

function RestaurantCard({ restaurant }) {
  let imageURL = `https://source.unsplash.com/random/?${restaurant.cuisine},food`;
  return (
    <div className="restaurantCard">
      <Link to={`/${restaurant.id}`}>
        <div className="restaurantCard_photo">
          <img src={imageURL} alt="restaurant_image" />
        </div>
        <div className="restaurantCard_info">
          <div className="restaurantCard_info_name">
            {restaurant.name.charAt(0).toUpperCase() + restaurant.name.slice(1)}
          </div>
          <div className="restaurantCard_info_stats">
            <div>{restaurant.cuisine}</div>
            <div>{restaurant.location}</div>
            <div>{restaurant.price}</div>
          </div>
        </div>

        <Button variant="contained" endIcon={<TableRestaurantIcon />} className="btn">
          Find Table
        </Button>
      </Link>
    </div>
  );
}

export default RestaurantCard;
