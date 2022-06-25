import React, { useState } from "react";
import { Alert, Backdrop } from "@mui/material";

function Alertview({ notify, alertType, alertVariant, handleClose, open }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}>
        <Alert variant={alertVariant} severity={alertType}>
          {notify}
        </Alert>
      </Backdrop>
    </div>
  );
}

export default Alertview;
