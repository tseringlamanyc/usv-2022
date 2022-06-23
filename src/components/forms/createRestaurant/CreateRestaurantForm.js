import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
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

const priceRanges = ["$", "$$", "$$$"];
const dinningOptions = ["Takeout-Only", "Delivery-Only"];

function CreateRestaurantForm() {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { key, value } = e.target;
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="restaurantForm">
      <TextField required id="outlined-required" label="Required" placeholder="Restaurant name" />
      <TextField required id="outlined-multiline-flexible" label="Required" multiline maxRows={5} />

      <TextField required select label="Price" helperText="Price range">
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
        placeholder="Restaurant cuisine"
      />

      <TextField
        required
        id="outlined-required"
        label="Required"
        placeholder="Restaurant location"
      />

      <TextField required id="outlined-required" type="time" />
      <TextField required type="time" />
      <TextField type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone number" />

      <TextField select label="Service" helperText="Dining Type">
        {dinningOptions.map((opt, index) => (
          <MenuItem key={index} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained">Submit</Button>
    </div>
  );
}

export default CreateRestaurantForm;
