import React, { useState } from "react";

import { Button, Alert, Backdrop, TextField, Input } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MenuItem from "@mui/material/MenuItem";

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
const dinningOptions = [null, "Takeout Only", "Delivery Only"];

function CreateRestaurantForm({ getAllRestaurants, restaurant, setRestaurant, method = "POST" }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [notify, setNotify] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
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

    let postURL = "https://tsering-takehome-api.herokuapp.com/api/restaurants";

    if (method === "PATCH") {
      postURL += `${restaurant.id}`;
    }

    fetch(postURL, jsonObject)
      .then((res) => res.json())
      .then((data) => {
        if (method === "POST") {
          // clear out form
          setFormValues(defaultValues);

          console.log("New restaurant created");
          setNotify(`${name} was successfully created`);
          handleToggle();

          // update restaurants
          // getAllRestaurants();
        } else {
          setRestaurant(data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });

    console.log(formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="restaurantForm">
        <TextField
          required
          id="outlined-required"
          name="name"
          label="Required"
          placeholder="Restaurant name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-multiline-flexible"
          name="description"
          label="Required"
          multiline
          maxRows={5}
          value={formValues.description}
          onChange={handleInputChange}
        />
        <TextField
          required
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
          required
          id="outlined-required"
          label="Required"
          name="cuisine"
          placeholder="Restaurant cuisine"
          value={formValues.cuisine}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          name="location"
          placeholder="Restaurant location"
          value={formValues.location}
          onChange={handleInputChange}
        />
        <input
          required
          id="outlined-required"
          name="openingTime"
          type="time"
          step="2"
          value={formValues.openingTime}
          onChange={handleInputChange}
        />

        <input
          required
          type="time"
          name="closingTime"
          step="2"
          value={formValues.closingTime}
          onChange={handleInputChange}
        />

        {/* OPTIONALS */}
        <TextField
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
          Create
        </Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}>
          <Alert variant="filled" severity="success">
            {notify}
          </Alert>
        </Backdrop>
      </form>
    </div>
  );
}

export default CreateRestaurantForm;
