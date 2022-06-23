import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SingleRestaurant() {
  let params = useParams();
  let restaurantId = params.id;

  let getURL = `https://tsering-takehome-api.herokuapp.com/api/restaurants/${restaurantId}`;

  const [restaurantData, setRestaurantData] = useState({});

  useEffect(() => {
    const getARestaurant = () => {
      fetch(getURL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRestaurantData(data);
        });
    };

    getARestaurant();
  }, []);

  return (
    <div>
      {Object.keys(restaurantData).length > 0 && (
        <>
          <div>{restaurantData.name}</div>
        </>
      )}
    </div>
  );
}

export default SingleRestaurant;
