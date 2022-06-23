import React from "react";

import "./RestaurantCard.scss";

function RestaurantCard({ restaurant }) {
  let imageURL = `https://source.unsplash.com/random/?${restaurant.cuisine},food`;
  return (
    <div className="restaurantCard">
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
      </div>
    </div>
  );
}

export default RestaurantCard;
