import React, { useEffect } from "react";
import { useState } from "react";

import { TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { endpointURL } from "../../../util/EndpointURL";
import { formatTime } from "../../../util/formatTime";
import { formatDate } from "../../../util/formatDate";

import Alertview from "../../alert/Alertview";

import "./CreateReservationForm.scss";

let guests = [...Array(10).keys()];

function CreateReservationForm({
  reservation,
  id,
  method = "POST",
  closeDialog,
  fetchReservations,
  restaurant,
}) {
  //
  const reservationObj = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    time: null,
    numGuests: "",
    email: "",
  };

  const [formValues, setFormValues] = useState(reservation || reservationObj);
  const [dateTime, setDateTime] = useState(reservationObj.time || null);
  const [notify, setNotify] = useState("");
  const [open, setOpen] = useState(false);

  const [minTime, setMinTime] = useState(
    restaurant.openingTime.split(":").map(Number).slice(0, 2) || null
  );
  const [maxTime, setMaxTime] = useState(
    restaurant.closingTime.split(":").map(Number).slice(0, 2) || null
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateTimeChange = (e) => {
    let timeStr = formatTime(e);
    let dateStr = formatDate(e);
    let fullDateTime = `${dateStr} ${timeStr}`;

    setDateTime(e);

    setFormValues({
      ...formValues,
      ["time"]: fullDateTime,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  let isMandatory = true;

  const createNewReservation = () => {
    let { firstName, lastName, phoneNumber, time, numGuests, email } = formValues;

    let reservationData = {
      firstName,
      lastName,
      phoneNumber,
      time,
      numGuests,
    };

    if (method === "POST") {
      reservationData.restaurantId = id;
      isMandatory = true;
    }

    if (formValues.email) {
      reservationData.email = email;
    }

    let jsonObject = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    };

    let postURL = `${endpointURL}reservations`;

    if (method === "PATCH") {
      postURL += `/${reservation.id}`;
      isMandatory = false;
    }

    fetch(postURL, jsonObject)
      .then((response) => response.json())
      .then((data) => {
        if (method === "POST") {
          setFormValues(reservationObj);
          setDateTime(null);
          setNotify("Reservation created");
          handleToggle();

          fetchReservations();

          setTimeout(() => {
            handleClose();
            closeDialog();
          }, 2000);
        } else {
          setNotify("Reservation updated");
          handleToggle();

          setTimeout(() => {
            handleClose();
            closeDialog();
            fetchReservations();
          }, 2000);
        }
      })
      .catch((err) => {
        setNotify("Fill out required fields, including time and guest");
        handleToggle();

        setTimeout(() => {
          handleClose();
          closeDialog();
        }, 2000);
      });
  };

  return (
    <div className="reservationForm">
      <div className="reservationForm_title">{method === "POST" ? "Book Reservation" : ""}</div>
      <form onSubmit={handleSubmit} className="reservationForm_form">
        <TextField
          required={isMandatory}
          id="outline-required"
          name="firstName"
          label="First name"
          placeholder="First Name"
          value={formValues.firstName}
          onChange={handleInputChange}
        />

        <TextField
          required={isMandatory}
          id="outline-required"
          name="lastName"
          label="Last name"
          placeholder="Last Name"
          value={formValues.lastName}
          onChange={handleInputChange}
        />

        <TextField
          type="tel"
          required={isMandatory}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]{3}[0-9]{3}[0-9]{4}" }}
          name="phoneNumber"
          placeholder="Phone number"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
        />

        <TextField
          required={isMandatory}
          select
          label=""
          helperText="Guests"
          name="numGuests"
          value={formValues.numGuests}
          onChange={handleInputChange}>
          {guests.map((guest, index) => (
            <MenuItem key={index} value={guest}>
              {guest}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            required={isMandatory}
            minDate={new Date()}
            minTime={new Date(0, 0, 0, minTime[0], minTime[1])}
            maxTime={new Date(0, 0, 0, maxTime[0], maxTime[1])}
            id="outline-required"
            label="Time"
            value={dateTime}
            onChange={handleDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          name="email"
          label="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
        />

        <Button variant="contained" type="submit" onClick={createNewReservation}>
          {method === "POST" ? "Book Now" : "Update"}
        </Button>

        <Alertview
          notify={notify.length > 0 && notify}
          alertVariant="filled"
          alertType="success"
          handleClose={handleClose}
          open={open}
        />
      </form>
    </div>
  );
}

export default CreateReservationForm;
