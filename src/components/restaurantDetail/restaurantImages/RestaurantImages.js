import React from "react";
import "./RestaurantImages.scss";

function RestaurantImages({ restaurant }) {
  return (
    <div className="container">
      <img
        src={`https://source.unsplash.com/random/?${restaurant.cuisine},food`}
        alt="restaurantpic"
      />
      <img
        src={`https://source.unsplash.com/random/?${restaurant.cuisine},restaurant`}
        alt="restaurantpic"
      />
      <img
        src={`https://source.unsplash.com/random/?${restaurant.cuisine},dessert`}
        alt="restaurantpic"
      />
      <img
        src={`https://source.unsplash.com/random/?${restaurant.cuisine},dinning`}
        alt="restaurantpic"
      />
      <img
        src={`https://source.unsplash.com/random/?${restaurant.cuisine},cuisine`}
        alt="restaurantpic"
      />
    </div>
  );
}

export default RestaurantImages;
