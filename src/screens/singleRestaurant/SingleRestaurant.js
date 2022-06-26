import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import FormModal from "../../components/modal/FormModal";
import Alertview from "../../components/alert/Alertview";
import CreateReservationForm from "../../components/forms/createReservation/CreateReservationForm";
import { endpointURL } from "../../util/EndpointURL";

import "./SingleRestaurant.scss";
import Navbar from "../../components/navBar/NavBar";
import CurrentReservationList from "../../components/reservationList/CurrentReservationList";

function SingleRestaurant() {
  let params = useParams();
  const restaurantId = params.id;

  let getURL = `${endpointURL}restaurants/${restaurantId}`;

  const [restaurantData, setRestaurantData] = useState({});
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [notify, setNotify] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDialogueOpen = () => {
    setOpenDialogue(true);
  };

  const handleDialogueClose = () => {
    setOpenDialogue(false);
  };

  const deleteRestaurant = () => {
    let deleteEndpoint = `${endpointURL}restaurants/${restaurantId}`;

    let jsonObject = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(deleteEndpoint, jsonObject)
      .then((response) => response.json())
      .then((data) => {
        setNotify("Restaurant Deleted. Redirecting to home page ...");
        handleToggle();
        handleDialogueClose();
        setTimeout(function () {
          handleClose();
          navigate("/");
        }, 2000);
      });
  };

  const getARestaurant = () => {
    fetch(getURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(restaurantData);
        setRestaurantData(data);
      });
  };

  useEffect(() => {
    getARestaurant();
  }, []);

  return (
    <div className="singleRestaurant">
      <Navbar />
      {Object.keys(restaurantData).length > 0 && (
        <>
          <div>{restaurantData.name}</div>
          <div>{restaurantData.description}</div>
          <div>{restaurantData.id}</div>
          <div>{restaurantData.openingTime}</div>
          <div>
            <FormModal
              restaurant={restaurantData}
              setRestaurant={setRestaurantData}
              getARestaurant={getARestaurant}
              method="PATCH"
              prompt="Edit"
            />
          </div>
        </>
      )}

      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDialogueOpen}>
        Delete
      </Button>

      <Dialog open={openDialogue} onClose={handleDialogueClose}>
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>

        <DialogActions>
          <Button color="error" onClick={deleteRestaurant}>
            Delete
          </Button>
          <Button onClick={handleDialogueClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Alertview
        notify={notify.length > 0 && notify}
        alertVariant="filled"
        alertType="success"
        handleClose={handleClose}
        open={open}
      />

      <h3>Make Reservation</h3>
      <CreateReservationForm id={restaurantId} method="POST" />

      <h3>Current Reservations</h3>
      <CurrentReservationList />
    </div>
  );
}

export default SingleRestaurant;
