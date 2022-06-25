import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import FormModal from "../../components/modal/FormModal";
import Alertview from "../../components/alert/Alertview";
import { Button } from "@mui/material";

function SingleRestaurant() {
  let params = useParams();
  let restaurantId = params.id;

  let getURL = `https://tsering-takehome-api.herokuapp.com/api/restaurants/${restaurantId}`;

  const [restaurantData, setRestaurantData] = useState({});
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const deleteRestaurant = () => {
    let deleteEndpoint = `https://tsering-takehome-api.herokuapp.com/api/restaurants/${restaurantId}`;

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
    console.log("refresh");
    getARestaurant();
  }, []);

  return (
    <div>
      {Object.keys(restaurantData).length > 0 && (
        <>
          <div>
            {/* <CreateRestaurantForm
              restaurant={restaurantData}
              setRestaurant={setRestaurantData}
              getARestaurant={getARestaurant}
              method="PATCH"
            /> */}
            <FormModal
              restaurant={restaurantData}
              setRestaurant={setRestaurantData}
              getARestaurant={getARestaurant}
              method="PATCH"
              prompt="Edit"
            />
          </div>
          <div>{restaurantData.name}</div>
          <div>{restaurantData.description}</div>
          <div>{restaurantData.location}</div>
          <div>{restaurantData.openingTime}</div>
        </>
      )}

      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={deleteRestaurant}>
        Delete
      </Button>

      <Alertview
        notify={notify.length > 0 && notify}
        alertVariant="filled"
        alertType="success"
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
}

export default SingleRestaurant;
