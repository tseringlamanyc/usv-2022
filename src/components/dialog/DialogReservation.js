import React from "react";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CreateReservationForm from "../forms/createReservation/CreateReservationForm";
import { DialogTitle } from "@mui/material";

function DialogReservation({ method, setReservation, reservation, getReservation, id }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle>Edit Reservation</DialogTitle>

        <DialogContent>
          <CreateReservationForm
            method={method}
            getReservation={getReservation}
            reservation={reservation}
            setReservation={setReservation}
            id={id}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogReservation;
