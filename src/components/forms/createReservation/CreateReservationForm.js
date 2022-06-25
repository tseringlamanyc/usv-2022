import React from "react";
import { useState } from "react";

import { TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import "./CreateReservationForm.scss";
import { endpointURL } from "../../../util/EndpointURL";
import { formatTime } from "../../../util/formatTime";
import { formatDate } from "../../../util/formatDate";

let guests = [...Array(10).keys()];

function CreateReservationForm({ id, method = "POST" }) {
  const reservationObj = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    time: "",
    numGuests: "",
    restaurantId: id,
  };

  const [formValues, setFormValues] = useState(reservationObj);
  const [dateTime, setDateTime] = useState(new Date("2022-01-01T21:11:54"));
  const [notify, setNotify] = useState("");

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
    let { firstName, lastName, phoneNumber, email, time, numGuests, restaurantId } = formValues;

    let jsonObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
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
          setNotify("Reservation created");
          console.log(data);
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
          label="firstName"
          placeholder="First Name"
          value={formValues.firstName}
          onChange={handleInputChange}
        />

        <TextField
          required
          id="outline-required"
          name="lastName"
          label="lastName"
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
            label="Time"
            value={dateTime}
            onChange={handleDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField name="email" label="email" placeholder="Email" value={formValues.email} />

        <Button variant="contained" type="submit" onClick={createNewReservation}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateReservationForm;
