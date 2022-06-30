import React from "react";
import RestaurantCard from "../restaurantCard/RestaurantCard.js";

import "./RestaurantList.scss";

function RestaurantList({ restaurants }) {
  return (
    <div className="restaurantsList">
      {restaurants.map((restaurant) => {
        return <RestaurantCard restaurant={restaurant} key={restaurant.id} />;
      })}
    </div>
  );
}

export default RestaurantList;
