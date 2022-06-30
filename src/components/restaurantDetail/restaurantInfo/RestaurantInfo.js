import React from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PhoneIcon from "@mui/icons-material/Phone";

import CreateReservationForm from "../../forms/createReservation/CreateReservationForm";
import { change12To24 } from "../../../util/24to12";
import { addDashes } from "../../../util/dashPhoneNumber";

import "./RestaurantInfo.scss";

function RestaurantInfo({ restaurant, restaurantId, fetchReservations }) {
  return (
    <div className="restaurantInfo">
      <div className="restaurantInfo_card">
        <div className="restaurantInfo_card_name">{restaurant.name}</div>

        <div className="restaurantInfo_card_stat">
          <div>
            <LocationOnIcon />
            {restaurant.location}
          </div>
          <div>
            <AttachMoneyIcon />
            {restaurant.price}
          </div>
          <div>
            <RestaurantIcon />
            {restaurant.cuisine}
          </div>
        </div>

        <div className="restaurantInfo_card_phone">
          <PhoneIcon />
          {addDashes(restaurant.phoneNumber) ?? "No number"}
        </div>

        <div className="restaurantInfo_card_description">{restaurant.description}</div>

        <div className="restaurantInfo_card_hTitle">Hours</div>

        <div className="restaurantInfo_card_hours">
          <div>{`Mon`}</div>
          <div>
            {`${change12To24(restaurant.openingTime)} - ${change12To24(restaurant.closingTime)}`}
          </div>
        </div>

        <div className="restaurantInfo_card_hours">
          <div>{`Tue`}</div>
          <div>
            {`${change12To24(restaurant.openingTime)} - ${change12To24(restaurant.closingTime)}`}
          </div>
        </div>

        <div className="restaurantInfo_card_hours">
          <div>{`Wed`}</div>
          <div>
            {`${change12To24(restaurant.openingTime)} - ${change12To24(restaurant.closingTime)}`}
          </div>
        </div>

        <div className="restaurantInfo_card_hours">
          <div>{`Thur`}</div>
          <div>
            {`${change12To24(restaurant.openingTime)} - ${change12To24(restaurant.closingTime)}`}
          </div>
        </div>

        <div className="restaurantInfo_card_hours">
          <div>{`Fri`}</div>
          <div>
            {`${change12To24(restaurant.openingTime)} - ${change12To24(restaurant.closingTime)}`}
          </div>
        </div>

        <div className="restaurantInfo_card_hours">
          <div>{`Sat`}</div>
          <div>
            {`${change12To24(restaurant.openingTime)} - ${change12To24(restaurant.closingTime)}`}
          </div>
        </div>

        <div className="restaurantInfo_card_hours_sun">
          <div>{`Sun`}</div>
          <div>{`Closed`}</div>
        </div>
      </div>

      <div className="restaurantInfo_form">
        <CreateReservationForm
          id={restaurantId}
          method="POST"
          fetchReservations={fetchReservations}
        />
      </div>
    </div>
  );
}

export default RestaurantInfo;
