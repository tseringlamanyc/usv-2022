import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CreateRestaurantForm from "../forms/createRestaurant/CreateRestaurantForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function FormModal({
  getAllRestaurants,
  prompt,
  method,
  getARestaurant,
  restaurant,
  setRestaurant,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{prompt}</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateRestaurantForm
            getAllRestaurants={getAllRestaurants}
            restaurant={restaurant}
            method={method}
            getARestaurant={getARestaurant}
            setRestaurant={setRestaurant}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default FormModal;
