import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRestaurantForm from "../../components/forms/createRestaurant/CreateRestaurantForm";
import FormModal from "../../components/modal/FormModal";

function SingleRestaurant() {
  let params = useParams();
  let restaurantId = params.id;

  let getURL = `https://tsering-takehome-api.herokuapp.com/api/restaurants/${restaurantId}`;

  const [restaurantData, setRestaurantData] = useState({});

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
        console.log(data.message);
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
            <CreateRestaurantForm
              restaurant={restaurantData}
              setRestaurant={setRestaurantData}
              getARestaurant={getARestaurant}
              method="PATCH"
            />
          </div>
          <div>{restaurantData.name}</div>
        </>
      )}

      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={deleteRestaurant}>
        Delete
      </Button>
    </div>
  );
}

export default SingleRestaurant;
