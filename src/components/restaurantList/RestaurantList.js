import React from "react";
import RestaurantCard from "../restaurantCard/RestaurantCard.js";

import "./RestaurantList.scss";

function RestaurantList({ restaurants }) {
  return (
    <div className="restaurantsList">
      {restaurants.map((restaurant, index) => {
        return (
          <div
            style={{
              backgroundColor: index % 2 === 0 ? "#F0f7f7" : "white",
            }}>
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          </div>
        );
      })}
    </div>
  );
}

export default RestaurantList;
