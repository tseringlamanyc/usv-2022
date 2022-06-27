import React from "react";
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

function CreateReservationForm({ getReservation, setReservation, id, method = "POST" }) {
  const reservationObj = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    time: null,
    numGuests: "",
    restaurantId: id,
    email: "",
  };

  const [formValues, setFormValues] = useState(reservationObj);
  const [dateTime, setDateTime] = useState(reservationObj.time || null);
  const [notify, setNotify] = useState("");
  const [open, setOpen] = useState(false);

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

  const createNewReservation = () => {
    let { firstName, lastName, phoneNumber, time, numGuests, restaurantId } = formValues;

    let jsonObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        time,
        numGuests,
        restaurantId,
      }),
    };

    let postURL = `${endpointURL}reservations`;

    fetch(postURL, jsonObject)
      .then((response) => response.json())
      .then((data) => {
        if (method === "POST") {
          setFormValues(reservationObj);
          setDateTime(null);
          setNotify("Reservation created");
          handleToggle();

          getReservation();

          setTimeout(() => {
            handleClose();
          }, 2000);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="reservationForm">
        <TextField
          required
          id="outline-required"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={formValues.firstName}
          onChange={handleInputChange}
        />

        <TextField
          required
          id="outline-required"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={formValues.lastName}
          onChange={handleInputChange}
        />

        <TextField
          type="tel"
          required
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="phoneNumber"
          placeholder="Phone number"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
        />

        <TextField
          required
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
            required
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
          Book Now
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
