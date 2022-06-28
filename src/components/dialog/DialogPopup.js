import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CreateRestaurantForm from "../forms/createRestaurant/CreateRestaurantForm";
import { DialogTitle } from "@mui/material";

function DialogPopup({
  prompt,
  getAllRestaurants,
  method,
  getARestaurant,
  restaurant,
  setRestaurant,
  actionPrompt,
  dialogTitle,
}) {
  //
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button varaint="outlined" onClick={handleClickOpen}>
        {prompt}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <CreateRestaurantForm
            getAllRestaurants={getAllRestaurants}
            restaurant={restaurant}
            method={method}
            getARestaurant={getARestaurant}
            setRestaurant={setRestaurant}
            closeDialog={handleClose}
          />
        </DialogContent>

        <DialogActions>
          <Button>{actionPrompt}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogPopup;
