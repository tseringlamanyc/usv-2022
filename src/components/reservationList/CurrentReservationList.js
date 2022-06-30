import React, { useEffect, useState } from "react";

import ReservationCard from "../reservationCard/ReservationCard";
import Alertview from "../alert/Alertview";
import { endpointURL } from "../../util/EndpointURL";

import "./CurrentReservationList.scss";

function CurrentReservationList({ aReservation, fetchReservations }) {
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState("");
  const [reservations, setReservations] = useState([]);

  const alertClose = () => {
    setOpen(false);
  };

  const alertToggle = () => {
    setOpen(!open);
  };

  const deleteReservation = (reservationId) => {
    let deleteEndpoint = `${endpointURL}reservations/${reservationId}`;

    let jsonObject = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(deleteEndpoint, jsonObject)
      .then((response) => response.json())
      .then((_) => {
        setNotify("Reservation Deleted");
        alertToggle();

        setTimeout(() => {
          alertClose();
        }, 2000);

        fetchReservations();
      });
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="reservationList">
      {aReservation.map((reservation, index) => {
        return (
          <ReservationCard
            reservation={reservation}
            deleteReservation={deleteReservation}
            key={index}
            fetchReservations={fetchReservations}
          />
        );
      })}
      <div className="singleRestautant_alert">
        <Alertview
          notify={notify.length > 0 && notify}
          alertVariant="filled"
          alertType="success"
          handleClose={alertClose}
          open={open}
        />
      </div>
    </div>
  );
}

export default CurrentReservationList;
