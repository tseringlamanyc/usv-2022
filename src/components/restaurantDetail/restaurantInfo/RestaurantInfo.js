import React from "react";
import CreateReservationForm from "../../forms/createReservation/CreateReservationForm";
import "./RestaurantInfo.scss";

function RestaurantInfo({ restaurant, restaurantId, getReservation }) {
  return (
    <div className="restaurantInfo">
      <div className="restaurantInfo_card">
        <div>{restaurant.name}</div>
        <div>{`${restaurant.location} | ${restaurant.cuisine} | ${restaurant.price}`}</div>
        <div>{restaurant.description}</div>
      </div>
      <div className="restaurantInfo_form">
        <CreateReservationForm getReservation={getReservation} id={restaurantId} method="POST" />
      </div>
    </div>
  );
}

export default RestaurantInfo;
