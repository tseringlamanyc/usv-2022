import React from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import "./ReservationCard.scss";

function ReservationCard() {
  return (
    <div className="reservationCard">
      <div className="reservationCard_avatar">
        <div className="reservationCard_avatar_letter">T</div>
      </div>
      <div className="reservationCard_info">
        <div className="reservationCard_info_fullName">Tsering Lama</div>
        <div className="reservationCard_info_dateTime">2022-05-11 @ 6:00pm</div>
        <div className="reservationCard_info_guest">Guest : 4</div>
      </div>
      <div className="reservationCard_btns">
        <div>
          <IconButton>
            <ModeEditIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
