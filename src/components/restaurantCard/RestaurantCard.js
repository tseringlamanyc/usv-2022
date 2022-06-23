import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import "./RestaurantCard.scss";

function RestaurantCard({ restaurant }) {
  const deleteRestaurant = () => {
    let deleteEndpoint = `https://tsering-takehome-api.herokuapp.com/api/restaurants/${restaurant.id}`;

    let jsonObject = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(deleteEndpoint, jsonObject)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      });
  };

  let imageURL = `https://source.unsplash.com/random/?${restaurant.cuisine},food`;
  return (
    <div className="restaurantCard">
      <Link to={`/${restaurant.id}`}>
        <div className="restaurantCard_photo">
          <img
            src="http://placehold.jp/4c5090/ffffff/300x200.png?text=Restaurant%20Image"
            alt="restaurant_image"
          />
        </div>
        <div className="restaurantCard_info">
          <div>{restaurant.name}</div>
          <div>{restaurant.cuisine}</div>
          <div>{restaurant.location}</div>
          <div>{restaurant.price}</div>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={deleteRestaurant}>
            Delete
          </Button>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
