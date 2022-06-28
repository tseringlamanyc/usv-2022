import React, { useState } from "react";

import { TextField, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MenuItem from "@mui/material/MenuItem";

import { formatTime } from "../../../util/formatTime";
import { endpointURL } from "../../../util/EndpointURL";
import Alertview from "../../alert/Alertview";

import "./CreateRestaurantForm.scss";

const defaultValues = {
  name: "",
  description: "",
  phoneNumber: "",
  openingTime: "",
  closingTime: "",
  price: "",
  cuisine: "",
  location: "",
  diningRestriction: "",
};

const priceRanges = ["$", "$$", "$$$", "$$$$"];
const dinningOptions = ["Takeout Only", "Delivery Only"];

function CreateRestaurantForm({
  getAllRestaurants,
  restaurant,
  setRestaurant,
  getARestaurant,
  method = "POST",
  closeDialog,
}) {
  const [formValues, setFormValues] = useState(restaurant || defaultValues);
  const [notify, setNotify] = useState("");
  const [timeOpen, setTimeOpen] = useState(null);
  const [timeClose, setTimeClose] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  let isMandatory = true;

  if (method === "POST") {
    isMandatory = true;
  }

  if (method === "PATCH") {
    isMandatory = false;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleOpenTimeChange = (e) => {
    let timeStr = formatTime(e);
    setTimeOpen(e);
    setFormValues({
      ...formValues,
      ["openingTime"]: timeStr,
    });
  };

  const handleCloseTimeChange = (e) => {
    let timeStr = formatTime(e);
    setTimeClose(e);
    setFormValues({
      ...formValues,
      ["closingTime"]: timeStr,
    });
  };

  const createNewRestaurant = () => {
    let { name, description, price, cuisine, location, openingTime, closingTime } = formValues;

    let jsonObject = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        cuisine,
        location,
        openingTime,
        closingTime,
      }),
    };

    let postURL = `${endpointURL}restaurants`;

    if (method === "PATCH") {
      postURL += `/${restaurant.id}`;
      console.log(postURL);
    }

    fetch(postURL, jsonObject)
      .then((res) => res.json())
      .then((data) => {
        if (method === "POST") {
          // clear out form
          setFormValues(defaultValues);

          setNotify(`${name} was successfully created`);
          handleToggle();

          setTimeout(() => {
            handleClose();
            closeDialog();
          }, 2000);

          // refresh restaurants
          getAllRestaurants();
        } else {
          setNotify(`Successfully updated`);
          handleToggle();

          setTimeout(() => {
            handleClose();
            closeDialog();
          }, 2000);

          setRestaurant(data);
          getARestaurant();
        }
      })
      .catch((err) => {
        setNotify(`${err}`);

        setTimeout(() => {
          handleClose();
        }, 2000);
      });

    console.log(formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="restaurantForm">
        <TextField
          required={isMandatory}
          id="outlined-required"
          name="name"
          label="Name"
          placeholder="Restaurant name"
          value={formValues.name}
          onChange={handleInputChange}
        />

        <TextField
          required={isMandatory}
          id="outlined-multiline-flexible"
          name="description"
          label="Description"
          multiline
          maxRows={5}
          value={formValues.description}
          onChange={handleInputChange}
        />

        <TextField
          required={isMandatory}
          select
          label="Price"
          helperText="Price range"
          name="price"
          value={formValues.price}
          onChange={handleInputChange}>
          {priceRanges.map((price, index) => (
            <MenuItem key={index} value={price}>
              {price}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required={isMandatory}
          id="outlined-required"
          label="Cuisine"
          name="cuisine"
          placeholder="Restaurant cuisine"
          value={formValues.cuisine}
          onChange={handleInputChange}
        />
        <TextField
          required={isMandatory}
          id="outlined-required"
          label="Location"
          name="location"
          placeholder="Restaurant location"
          value={formValues.location}
          onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            required={isMandatory}
            label="Opening Time"
            value={timeOpen}
            onChange={handleOpenTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />

          <TimePicker
            required={isMandatory}
            label="Closing Time"
            value={timeClose}
            onChange={handleCloseTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* OPTIONALS */}
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
          name="phoneNumber"
          placeholder="Phone number"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
        />

        <TextField
          select
          label="Service"
          name="diningRestriction"
          helperText="Dining Type"
          value={formValues.diningRestriction}
          onChange={handleInputChange}>
          {dinningOptions.map((opt, index) => (
            <MenuItem key={index} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" type="submit" onClick={createNewRestaurant}>
          Submit
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

export default CreateRestaurantForm;
