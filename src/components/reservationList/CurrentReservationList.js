import React from "react";
import ReservationCard from "../reservationCard/ReservationCard";

import "./CurrentReservationList.scss";

function CurrentReservationList({ allReservation }) {
  return (
    <div className="reservationList">
      {allReservation.map((reservation, index) => {
        return <ReservationCard reservation={reservation} key={index} />;
      })}
    </div>
  );
}

export default CurrentReservationList;
