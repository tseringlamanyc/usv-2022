import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import Alertview from "../../components/alert/Alertview";
import Navbar from "../../components/navBar/NavBar";
import CurrentReservationList from "../../components/reservationList/CurrentReservationList";
import DialogPopup from "../../components/dialog/DialogPopup";

import { endpointURL } from "../../util/EndpointURL";

import "./SingleRestaurant.scss";
import RestaurantImages from "../../components/restaurantDetail/restaurantImages/RestaurantImages";
import RestaurantInfo from "../../components/restaurantDetail/restaurantInfo/RestaurantInfo";

function SingleRestaurant() {
  let params = useParams();
  const restaurantId = params.id;
  let navigate = useNavigate();

  let getURL = `${endpointURL}restaurants/${restaurantId}`;

  const [restaurantData, setRestaurantData] = useState({});
  const [reservationData, setReservationData] = useState([]);

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

  const fetchReservations = async () => {
    try {
      let url = `${endpointURL}reservations`;
      const res = await fetch(url);

      if (!res.ok) {
        throw Error(`Could not fetch data from ${url}`);
      }

      const json = await res.json();

      const filteredReservation = json.reservations.filter((ele) => {
        return ele.restaurantId === restaurantId;
      });

      setReservationData(filteredReservation);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getARestaurant();
    fetchReservations();
  }, []);

  return (
    <div className="singleRestaurant">
      <Navbar />
      <RestaurantImages />
      {Object.keys(restaurantData).length > 0 && (
        <>
          <RestaurantInfo
            restaurant={restaurantData}
            restaurantId={restaurantId}
            getReservation={fetchReservations}
          />
          <div>
            <DialogPopup
              restaurant={restaurantData}
              setRestaurant={setRestaurantData}
              getARestaurant={getARestaurant}
              method="PATCH"
              prompt="Edit"
              dialogTitle="Edit Restaurant"
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

      <h3>Current Reservations</h3>
      <CurrentReservationList allReservation={reservationData} />
    </div>
  );
}

export default SingleRestaurant;
