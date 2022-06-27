import React from "react";

import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function DialogDelete({ deleteHandler }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button varaint="outlined" color="error" onClick={handleClickOpen}>
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={deleteHandler}>
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogDelete;
