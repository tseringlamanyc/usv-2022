import React from "react";

import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { change12To24 } from "../../util/24to12";

import "./ReservationCard.scss";
import DialogDelete from "../dialog/DialogDelete";

function ReservationCard({ reservation }) {
  return (
    <div className="reservationCard">
      <div className="reservationCard_avatar">
        <div className="reservationCard_avatar_letter">{`${reservation.firstName.charAt(0)}`}</div>
      </div>
      <div className="reservationCard_info">
        <div className="reservationCard_info_fullName">{`${reservation.firstName} ${reservation.lastName}`}</div>
        <div className="reservationCard_info_dateTime">{`${
          reservation.time.split("T")[0]
        } @ ${change12To24(reservation.time.split("T")[1].slice(0, 8))}`}</div>
        <div className="reservationCard_info_guest">{`Guest: ${reservation.numGuests}`}</div>
      </div>
      <div className="reservationCard_btns">
        <div>
          <IconButton>
            <ModeEditIcon />
          </IconButton>
        </div>
        <div>
          <DialogDelete />
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
