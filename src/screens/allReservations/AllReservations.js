import React from "react";
import Navbar from "../../components/navBar/NavBar";
import ReservationGrid from "../../components/reservationList/ReservationGrid";

function AllReservations() {
  return (
    <div>
      <Navbar />
      <ReservationGrid />
    </div>
  );
}

export default AllReservations;
