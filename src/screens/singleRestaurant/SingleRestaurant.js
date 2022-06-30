import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alertview from "../../components/alert/Alertview";
import Navbar from "../../components/navBar/NavBar";
import CurrentReservationList from "../../components/reservationList/CurrentReservationList";
import DialogDelete from "../../components/dialog/DialogDelete";
import DialogPopup from "../../components/dialog/DialogPopup";

import { endpointURL } from "../../util/EndpointURL";

import "./SingleRestaurant.scss";
import RestaurantImages from "../../components/restaurantDetail/restaurantImages/RestaurantImages";
import RestaurantInfo from "../../components/restaurantDetail/restaurantInfo/RestaurantInfo";
import EmptyList from "../../components/views/EmptyList";

function SingleRestaurant() {
  let params = useParams();
  const restaurantId = params.id;
  let navigate = useNavigate();

  let getURL = `${endpointURL}restaurants/${restaurantId}`;

  const [restaurantData, setRestaurantData] = useState({});
  const [reservationData, setReservationData] = useState([]);

  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState("");

  const alertClose = () => {
    setOpen(false);
  };

  const alertToggle = () => {
    setOpen(!open);
  };

  const deleteRestaurant = async () => {
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
        alertToggle();

        setTimeout(function () {
          alertClose();
          navigate("/");
        }, 2000);
      });
  };

  const getARestaurant = () => {
    fetch(getURL)
      .then((response) => response.json())
      .then((data) => {
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

      <div className="singleRestaurant_btn">
        <DialogPopup
          restaurant={restaurantData}
          setRestaurant={setRestaurantData}
          getARestaurant={getARestaurant}
          method="PATCH"
          prompt="Edit"
          dialogTitle="Edit Restaurant"
        />

        <DialogDelete deleteHandler={deleteRestaurant} />
      </div>

      {Object.keys(restaurantData).length > 0 && (
        <>
          <RestaurantInfo
            restaurant={restaurantData}
            restaurantId={restaurantId}
            getReservation={fetchReservations}
          />
        </>
      )}

      <div className="singleRestautant_alert">
        <Alertview
          notify={notify.length > 0 && notify}
          alertVariant="filled"
          alertType="success"
          handleClose={alertClose}
          open={open}
        />
      </div>

      <div className="singleRestaurant_resName">Current Reservations</div>

      {reservationData.length === 0 && <EmptyList searchTerm="No reservations yet" />}

      <CurrentReservationList
        aReservation={reservationData}
        fetchReservations={fetchReservations}
      />
    </div>
  );
}

export default SingleRestaurant;
