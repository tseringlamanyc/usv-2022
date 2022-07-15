import React from "react";

import { change12To24 } from "../../util/24to12";

import DialogDelete from "../dialog/DialogDelete";
import DialogReservation from "../dialog/DialogReservation";
import { decideMarker } from "../../util/decideTime";

import "./ReservationCard.scss";

function ReservationCard({ reservation, deleteReservation, fetchReservations, restaurant }) {
  // reservation time

  // checking what it is
  let typeOfReservation = decideMarker(reservation);
  console.log(typeOfReservation);

  return (
    <div className="reservationCard">
      <div className="reservationCard_avatar">
        <div className="reservationCard_avatar_letter">{`${reservation.firstName.charAt(0)}`}</div>
      </div>

      <div className="reservationCard_info">
        <div className="reservationCard_info_fullName">{`${reservation.firstName} ${reservation.lastName} : ${typeOfReservation}`}</div>

        <div className="reservationCard_info_dateTime">{`${
          reservation.time.split("T")[0]
        } @ ${change12To24(reservation.time.split("T")[1].slice(0, 8))}`}</div>

        <div className="reservationCard_info_guest">{`Guest: ${reservation.numGuests}`}</div>
      </div>

      <div className="reservationCard_btns">
        <div>
          <DialogReservation
            reservation={reservation}
            restaurant={restaurant}
            id={reservation.id}
            method="PATCH"
            fetchReservations={fetchReservations}
          />
        </div>

        <div>
          <DialogDelete deleteHandler={deleteReservation} reservationId={reservation.id} />
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
